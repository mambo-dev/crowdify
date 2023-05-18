import { NextApiRequest, NextApiResponse } from "next";
import { CreatedUserAccount } from "../../../types/api";
import { z } from "zod";
import { withMethods } from "../../../lib/api-middlewares/with-methods";
import { db } from "../../../lib/prisma";
import { getGoogleOauthToken, getGoogleUser } from "../../../lib/google";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { User } from "@prisma/client";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CreatedUserAccount>
) => {
  try {
    const code = req.query.code as string;
    const pathUrl = (req.query.state as string) || "/";

    if (!code) {
      return res.status(401).json({
        error: "Authorization code not provided!",
        success: false,
      });
    }

    const { id_token, access_token } = await getGoogleOauthToken({ code });

    const { name, verified_email, email, picture } = await getGoogleUser({
      id_token,
      access_token,
    });

    if (!verified_email) {
      return res.status(403).json({
        success: false,
        error: "Google account not verified",
      });
    }

    const findUser = await db.user.findUnique({
      where: {
        user_email: email,
      },
      include: {
        user_account: true,
      },
    });

    let user: User;

    if (!findUser) {
      user = await db.user.create({
        data: {
          user_name: name,
          user_email: email,
          user_image: picture,
          user_password: "",
          user_email_verified: true,
          user_account: {
            create: {
              account_provider: "Google",
            },
          },
        },
      });
    } else {
      user = await db.user.update({
        where: { user_email: email },
        data: {
          user_name: name,
          user_email: email,
          user_image: picture,
        },
      });
    }

    const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN as unknown as number;
    const TOKEN_SECRET = process.env.JWT_SECRET as unknown as string;
    const token = jwt.sign(
      { id: user.user_id, email: user.user_email, image: user.user_image },
      TOKEN_SECRET,
      {
        expiresIn: `${TOKEN_EXPIRES_IN}m`,
      }
    );

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("access_token", token, {
        expires: new Date(Date.now() + TOKEN_EXPIRES_IN * 60 * 1000),
      })
    );

    return res.status(200).redirect(pathUrl).json({
      error: null,
      success: true,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: error.issues,
        success: false,
      });
    }

    return res.status(500).json({
      error: "something unexpected happened",
      success: false,
    });
  }
};

export default withMethods(["GET"], handler);

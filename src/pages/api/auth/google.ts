import { NextApiRequest, NextApiResponse } from "next";
import { CreatedUserAccount } from "../../../types/api";
import { nanoid } from "nanoid";
import { z } from "zod";
import { withMethods } from "../../../lib/api-middlewares/with-methods";
import { db } from "../../../lib/prisma";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import * as argon2 from "argon2";
import { getGoogleOauthToken, getGoogleUser } from "../../../lib/google";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CreatedUserAccount>
) => {
  try {
    const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN as unknown as string;
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
        email,
      },
      include: {
        accounts: true,
      },
    });

    if (!findUser) {
      await db.user.create({
        data: {
          createdAt: new Date(),
          name,
          email,
          image: picture,
          password: "",
          emailVerified: true,
          accounts: {
            create: {
              provider: "Google",
              providerAccountId: nanoid(),
              type: "Oauth",
            },
          },
        },
      });

      return res.status(200).json({
        error: null,
        success: true,
      });
    }

    const user = await db.user.upsert({
      where: { email },
      create: {
        createdAt: new Date(),
        name,
        email,
        image: picture,
        password: "",
        emailVerified: true,
        accounts: {
          create: {
            provider: "Google",
            providerAccountId: nanoid(),
            type: "Oauth",
          },
        },
      },
      update: {
        name,
        email,
        image: picture,
        accounts: {
          connect: {},
        },
      },
    });

    return res.status(200).json({
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

export default withMethods(["POST"], handler);

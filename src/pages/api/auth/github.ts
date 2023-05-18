import { NextApiRequest, NextApiResponse } from "next";
import { CreatedUserAccount } from "../../../types/api";
import { z } from "zod";
import { withMethods } from "../../../lib/api-middlewares/with-methods";
import { db } from "../../../lib/prisma";

import jwt from "jsonwebtoken";
import cookie from "cookie";
import { User } from "@prisma/client";
import { getGithubOathToken, getGithubUser } from "../../../lib/github";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CreatedUserAccount>
) => {
  const pathUrl = (req.query.state as string) || "/";
  try {
    const code = req.query.code as string;

    if (!code) {
      return res.status(401).json({
        error: "Authorization code not provided!",
        success: false,
      });
    }

    const { access_token } = await getGithubOathToken({ code });

    const { login, email, avatar_url } = await getGithubUser({ access_token });
    if (!email) {
      throw new Error("email not set try different provider");
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
          user_name: login,
          user_email: email,
          user_image: avatar_url,
          user_password: "",
          user_email_verified: true,
          user_account: {
            create: {
              account_provider: "github",
            },
          },
        },
      });
    } else {
      user = await db.user.update({
        where: { user_email: email },
        data: {
          user_name: login,
          user_email: email,
          user_image: avatar_url,
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

    return res
      .setHeader(
        "Set-Cookie",
        cookie.serialize("access_token", token, {
          expires: new Date(Date.now() + TOKEN_EXPIRES_IN * 60 * 1000),
          path: "/",
        })
      )
      .status(200)
      .redirect("/crowdify")
      .json({
        error: null,
        success: true,
      });
  } catch (error: any) {
    console.log(error.message);
    if (error.message === "email not set try different provider") {
      return res
        .status(500)
        .redirect(`${pathUrl}?error=email not set try different provider`)
        .json({
          error: "email not set try different provider",
          success: false,
        });
    }

    return res
      .status(500)
      .redirect(`${pathUrl}?error=something unexpected happened`)
      .json({
        error: "something unexpected happened",
        success: false,
      });
  }
};

export default withMethods(["GET"], handler);

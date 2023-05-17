import { NextApiRequest, NextApiResponse } from "next";
import { CreatedUserAccount } from "../../../types/api";
import { nanoid } from "nanoid";
import { z } from "zod";
import { withMethods } from "../../../lib/api-middlewares/with-methods";
import { db } from "../../../lib/prisma";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import * as argon2 from "argon2";

const reqSchema = z.object({
  email: z
    .string()
    .min(1, "this field is required")
    .email("please provide a valid email"),
  password: z.string().min(1, "this field is required"),
});

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CreatedUserAccount>
) => {
  try {
    const { email, password } = reqSchema.parse(req.body);

    const findUser = await db.user.findUnique({
      where: {
        email: email,
      },
      include: {
        Account: true,
      },
    });

    if (!findUser) {
      return res.status(403).json({
        error: "invalid email or password",
        success: false,
      });
    }

    if (findUser.Account.provider === "Google") {
      return res.status(401).json({
        error: `Use ${findUser.Account.provider} OAuth2 instead`,
        success: false,
      });
    }

    const isPasswordValid = await argon2.verify(findUser.password, password);

    if (!isPasswordValid) {
      return res.status(403).json({
        error: "invalid email or password",
        success: false,
      });
    }

    const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN as unknown as number;
    const TOKEN_SECRET = process.env.JWT_SECRET as unknown as string;
    const token = jwt.sign(
      { id: findUser.id, email: findUser.email, image: findUser.image },
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

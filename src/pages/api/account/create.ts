import { NextApiRequest, NextApiResponse } from "next";
import { CreatedUserAccount } from "../../../types/api";
import { nanoid } from "nanoid";
import { z } from "zod";
import { withMethods } from "../../../lib/api-middlewares/with-methods";
import { db } from "../../../lib/prisma";

import * as argon2 from "argon2";
import { sendEmail } from "../../../lib/send-email";
const reqSchema = z.object({
  email: z
    .string()
    .min(1, "this field is required")
    .email("please provide a valid email"),
  firstName: z.string().min(1, "this field is required"),
  secondName: z.string().min(1, "this field is required"),
  password: z.string().min(1, "this field is required"),
});

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CreatedUserAccount>
) => {
  try {
    const { email, firstName, secondName, password } = reqSchema.parse(
      req.body
    );

    const hashed = await argon2.hash(password, {
      hashLength: 10,
    });

    const findUser = await db.user.findUnique({
      where: {
        user_email: email,
      },
    });

    if (findUser) {
      return res.status(403).json({
        error: "try loggin in instead",
        success: false,
      });
    }

    const OTP = nanoid(7);
    const verifyEmailHtml = `<!DOCTYPE html>
    <html>
    <head>
      <title>Welcome - Verify Account</title>
    </head>
    <body>
      <h1 style="text-align: center; color: #333;">Welcome - Verify Account</h1>
      <p style="text-align: center; color: #777;">Your OTP is <strong>${OTP}</strong>.</p>
    </body>
    </html>
    `;

    await sendEmail({
      fromEmail: "mambo.michael.22@gmail.com",
      toEmail: email,
      html: verifyEmailHtml,
      subject: "Welcome - Verify Account",
    });

    await db.user.create({
      data: {
        user_email: email,
        user_name: `${firstName} ${secondName}`,
        user_password: hashed,
        user_verificationCode: OTP,
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

import { NextApiRequest, NextApiResponse } from "next";
import { Verification } from "../../../types/api";
import { z } from "zod";
import { withMethods } from "../../../lib/api-middlewares/with-methods";
import { db } from "../../../lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
const reqSchema = z.object({
  verificationCode: z.string().min(1, "this field is required"),
});

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Verification>
) => {
  try {
    const { verificationCode } = reqSchema.parse(req.body);
    const user = await getServerSession(req, res, authOptions).then(
      (res) => res?.user
    );

    if (!user) {
      return res.status(401).json({
        error: "unauthorized ",
        success: false,
      });
    }

    const findDbUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!findDbUser) {
      return res.status(404).json({
        error: "user not found",
        success: false,
      });
    }

    const matchCode = findDbUser.verificationCode === verificationCode;

    if (!matchCode) {
      return res.status(403).json({
        error: "verification code did not match",
        success: false,
      });
    }

    await db.user.update({
      where: {
        id: findDbUser.id,
      },
      data: {
        emailVerified: new Date(),
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
    console.log(error);
    return res.status(500).json({
      error: "something unexpected happened",
      success: false,
    });
  }
};

export default withMethods(["POST"], handler);

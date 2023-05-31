import { NextApiRequest, NextApiResponse } from "next";
import { ZodIssue, z } from "zod";
import { withMethods } from "../../../lib/api-middlewares/with-methods";
import { db } from "../../../lib/prisma";
import { withAuth } from "../../../lib/api-middlewares/with-auth";

const reqSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  deadline: z.coerce
    .date()
    .refine((date) => new Date(date).toString() !== "Invalid Date", {
      message: "a valid date is required",
    })
    .transform((date) => new Date(date)),
});

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    error: string | null;
    success: boolean;
    project_id: number | null;
  }>
) => {
  try {
    const session = await withAuth({ serverReq: req });

    if (!session || session.error || !session.user) {
      return res.status(401).json({
        error: "unauthorized",
        success: false,
        project_id: null,
      });
    }

    const findUser = await db.user.findUnique({
      where: {
        user_id: session.user.user_id,
      },
    });

    if (!findUser) {
      return res.status(403).json({
        error: "this account may have been deleted",
        success: false,
        project_id: null,
      });
    }

    const project = await db.project.create({
      data: {
        project_banner: "",
        project_description: "",
        project_title: "",
        project_video: "",
        project_deadline: new Date(),
        project_published: false,
        project_user: {
          connect: {
            user_id: findUser.user_id,
          },
        },
        Project_Analytics: {
          create: {},
        },
        Project_Fundraising: {
          create: {},
        },
      },
    });

    return res.status(200).json({
      error: null,
      success: true,
      project_id: project.project_id,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: "something unexpected happened",
      success: false,
      project_id: null,
    });
  }
};

export default withMethods(["GET"], handler);

import { NextApiRequest, NextApiResponse } from "next";
import { ZodIssue, z } from "zod";
import { withMethods } from "../../../lib/api-middlewares/with-methods";
import { db } from "../../../lib/prisma";
import { withAuth } from "../../../lib/api-middlewares/with-auth";

const reqSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  deadline: z.date(),
});

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    error: string | null | ZodIssue[];
    success: boolean;
    project_id: number | null;
  }>
) => {
  try {
    const { title, description, deadline } = reqSchema.parse(req.body);

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

    await db.project.create({
      data: {
        project_banner: "",
        project_description: description,
        project_title: title,
        project_video: "",
        project_deadline: deadline,
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
      project_id: null,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: error.issues,
        success: false,
        project_id: null,
      });
    }

    return res.status(500).json({
      error: "something unexpected happened",
      success: false,
      project_id: null,
    });
  }
};

export default withMethods(["POST"], handler);

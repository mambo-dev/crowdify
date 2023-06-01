import { NextApiRequest, NextApiResponse } from "next";
import { ZodIssue, z } from "zod";
import { withMethods } from "../../../lib/api-middlewares/with-methods";
import { db } from "../../../lib/prisma";
import { withAuth } from "../../../lib/api-middlewares/with-auth";
import { addDays } from "date-fns";
import { basicInformationSchema } from "../../../lib/schemas/schemas";
import { EditBasicInfoResponse } from "../../../types/api";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<EditBasicInfoResponse>
) => {
  try {
    const session = await withAuth({ serverReq: req });

    if (!session || session.error || !session.user) {
      return res.status(401).json({
        error: "unauthorized",
        success: false,
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
      });
    }

    const { project_id } = req.query;

    if (!project_id || isNaN(Number(project_id))) {
      throw new Error("invalid query params");
    }

    const findProject = await db.project.findUnique({
      where: {
        project_id: Number(project_id),
      },
    });

    if (!findProject || findProject.project_user_id !== findUser.user_id) {
      return res.status(403).json({
        error: !findProject
          ? "this project may have been deleted"
          : "cannot edit this project",
        success: false,
      });
    }

    const { deadline, description, title } = basicInformationSchema.parse(
      req.body
    );

    await db.project.update({
      where: {
        project_id: findProject.project_id,
      },
      data: {
        project_deadline: deadline,
        project_description: description,
        project_title: title,
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

export default withMethods(["PUT"], handler);

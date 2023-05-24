import { NextApiRequest, NextApiResponse } from "next";
import { ZodIssue, z } from "zod";
import { withMethods } from "../../../lib/api-middlewares/with-methods";
import { db } from "../../../lib/prisma";
import { withAuth } from "../../../lib/api-middlewares/with-auth";

const reqSchema = z.object({
  images: z.array(z.string().min(1, "provide valid images")),
});

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ error: string | null | ZodIssue[]; success: boolean }>
) => {
  try {
    const { images } = reqSchema.parse(req.body);
    const { project_id } = req.query;

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

    await db.project_images.createMany({
      data: images.map((image) => {
        return {
          image_project_id: Number(project_id),
          image_string: image,
          image_project: {
            connect: {
              project_id: Number(project_id),
            },
          },
        };
      }),
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

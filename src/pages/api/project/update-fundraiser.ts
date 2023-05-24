import { NextApiRequest, NextApiResponse } from "next";
import { ZodIssue, z } from "zod";
import { withMethods } from "../../../lib/api-middlewares/with-methods";
import { db } from "../../../lib/prisma";
import { withAuth } from "../../../lib/api-middlewares/with-auth";

const reqSchema = z.object({
  goal: z.number().min(1, "this field is required"),
  rewards: z.array(
    z.object({
      title: z.string().min(1, "this field is required"),
      descriprion: z.string().min(1, "this field is required"),
      type: z.enum(["merchandise", "early_access", "perks"]),
      stock: z.number().min(1, "this field is required"),
      amount_requirement: z.number().min(1, "this field is required"),
    })
  ),
});

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ error: string | null | ZodIssue[]; success: boolean }>
) => {
  try {
    const { goal, rewards } = reqSchema.parse(req.body);
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

    const fundraiser = await db.project_Fundraiser.update({
      where: {
        fundraiser_project_id: Number(project_id),
      },
      data: {
        fundraiser_goal: goal,
      },
    });

    if (rewards.length > 0) {
      await db.fundraiser_rewards.createMany({
        data: rewards.map((reward) => {
          return {
            rewards_title: reward.title,
            rewards_descriprion: reward.descriprion,
            reward_type: reward.type,
            rewards_in_stock: reward.stock,
            rewards_amount_requirement: reward.amount_requirement,
            fundraiser: {
              connect: {
                fundraiser_id: fundraiser.fundraiser_id,
              },
            },
            fundraiser_id: fundraiser.fundraiser_id,
          };
        }),
      });
    }

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

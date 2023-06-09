import { NextApiRequest, NextApiResponse } from "next";
import { ZodIssue, z } from "zod";
import { withMethods } from "../../../../lib/api-middlewares/with-methods";
import { rewardSchema } from "../../../../lib/schemas/schemas";
import { db } from "../../../../lib/prisma";
import { RewardsResponse } from "../../../../types/api";
import { withAuth } from "../../../../lib/api-middlewares/with-auth";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RewardsResponse>
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

    const { reward_id } = req.query;

    if (!reward_id || isNaN(Number(reward_id))) {
      throw new Error("invalid query params");
    }

    const findProject = await db.project.findFirst({
      where: {
        Project_Fundraising: {
          fundraiser_rewards: {
            some: {
              rewards_id: Number(reward_id),
            },
          },
        },
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

    const {
      rewardAmountRequirement,
      rewardDescription,
      rewardStock,
      rewardTitle,
      rewardType,
    } = rewardSchema.parse(req.body);

    await db.fundraiser_rewards.update({
      where: {
        rewards_id: Number(reward_id),
      },
      data: {
        reward_type: rewardType,
        rewards_amount_requirement: rewardAmountRequirement,
        rewards_descriprion: rewardDescription,
        rewards_title: rewardTitle,
        rewards_in_stock: rewardStock,
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

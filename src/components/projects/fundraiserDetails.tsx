"use client";

import React, { useState } from "react";
import { IProjectValues } from "./newProject";
import { Input } from "../ui/input";
import Heading from "../ui/heading";
import Paragraph from "../ui/paragraph";
import { Edit2, PlusCircle, Trash2 } from "lucide-react";
import AddRewardsModal from "./rewards/add";
import { Project_Fundraiser, Fundraiser_rewards } from "@prisma/client";
import EditRewardsModal from "./rewards/edit";
import DeleteRewardModal from "./rewards/delete";
import Button from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import editFundraiser from "../../app/helpers/projects/editFundraiser";

type Props = {
  fundraiser_details:
    | (Project_Fundraiser & {
        fundraiser_rewards: Fundraiser_rewards[];
      })
    | null;
  project_id: number;
};

const FundraiserDetails = ({ fundraiser_details, project_id }: Props) => {
  const [openRewardModal, setOpenRewardModal] = useState(false);
  const [openEditRewardModal, setOpenEditModal] = useState(false);
  const [goal, setGoal] = useState(fundraiser_details?.fundraiser_goal);
  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteRewardModal, setOpenDeleteRewardModal] = useState(false);
  const [selectedReward, setSelectedReward] =
    useState<Fundraiser_rewards | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    try {
      if (!goal) {
        toast({
          message: "a goal is required",
          title: "Invalid input",
          type: "error",
        });
        return;
      }

      await editFundraiser(goal, project_id);

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          message: error.message,
          title: "Error",
          type: "error",
        });
        return;
      }

      toast({
        message: "something went wrong. Please try again later",
        title: "Error",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-b border-gray-900/10 pb-12 w-full flex flex-col gap-3">
      <div className="flex flex-col items-start w-full">
        <Heading size="xs" className="text-left mr-auto">
          Fundraiser information
        </Heading>
        <Paragraph size="sm" className="text-left mr-auto">
          set your goals and offer rewards for your project if any
        </Paragraph>
      </div>
      <form
        onSubmit={(e) => onSubmit(e)}
        className="w-full flex flex-col items-center"
      >
        <div className="flex flex-col gap-2 w-full">
          <label className="font-medium text-slate-700">goal</label>
          <Input
            onChange={(e) => setGoal(Number(e.target.value))}
            value={goal}
            type="number"
            className="bg-white"
          />
        </div>
        <div className="mt-4 ml-auto">
          <Button isLoading={isLoading} variant="default" size="lg">
            save
          </Button>
        </div>
      </form>
      <div className="flex flex-col gap-2 w-full">
        {!fundraiser_details?.fundraiser_rewards ||
        fundraiser_details?.fundraiser_rewards?.length <= 0 ? (
          <button
            type="button"
            onClick={() => setOpenRewardModal(true)}
            className="border border-slate-400 border-dashed  w-full outline-none inline-flex items-center justify-center rounded-md p-4"
          >
            <PlusCircle className="w-8 h-8" />
          </button>
        ) : (
          <div className="w-full flex flex-col gap-y-1">
            <div className="w-fit ml-auto ">
              <button
                type="button"
                onClick={() => setOpenRewardModal(true)}
                className=" w-fit outline-none inline-flex items-center justify-center rounded-md p-4"
              >
                <PlusCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-col flex gap-2">
              {fundraiser_details.fundraiser_rewards.map((reward) => (
                <div
                  key={reward.rewards_id}
                  className="border border-slate-300 rounded-md py-2 px-2 w-full bg-white flex items-center justify-between"
                >
                  <div className="flex-1  flex items-start flex-col ">
                    <h1>{reward.rewards_title}</h1>
                    <Paragraph size="sm" className="truncate">
                      {reward.rewards_descriprion}
                    </Paragraph>
                  </div>

                  <div className="flex items-start justify-end gap-2 w-fit h-fit mb-auto ">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedReward(reward);
                        setOpenEditModal(true);
                      }}
                      className=" w-fit outline-none inline-flex items-center justify-center rounded-md "
                    >
                      <Edit2 className="w-4 h-4  text-purple-500" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedReward(reward);
                        setOpenDeleteRewardModal(true);
                      }}
                      className=" w-fit outline-none inline-flex items-center justify-center rounded-md "
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <AddRewardsModal
        isOpen={openRewardModal}
        setIsOpen={setOpenRewardModal}
        project_id={project_id}
      />

      {selectedReward && (
        <EditRewardsModal
          isOpen={openEditRewardModal}
          setIsOpen={setOpenEditModal}
          reward={selectedReward}
        />
      )}

      {selectedReward && (
        <DeleteRewardModal
          isOpen={openDeleteRewardModal}
          setIsOpen={setOpenDeleteRewardModal}
          reward_id={selectedReward.rewards_id}
        />
      )}
    </div>
  );
};

export default FundraiserDetails;

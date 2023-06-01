"use client";

import React, { useState } from "react";
import { IProjectValues } from "./newProject";
import { Input } from "../ui/input";
import Heading from "../ui/heading";
import Paragraph from "../ui/paragraph";
import { PlusCircle } from "lucide-react";
import AddRewardsModal from "./rewards/add";

type Props = {};

const FundraiserDetails = ({}: Props) => {
  const [rewards, setRewards] = useState<IProjectValues["rewards"]>([]);

  const [openRewardModal, setOpenRewardModal] = useState(false);

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
      <div className="flex flex-col gap-2 w-full">
        <label className="font-medium text-slate-700">goal</label>
        <Input name="goal" type="text" className="bg-white" />
      </div>
      <div className="flex flex-col gap-2 w-full">
        {!rewards || rewards?.length <= 0 ? (
          <button
            type="button"
            onClick={() => setOpenRewardModal(true)}
            className="border border-slate-400 border-dashed  w-full outline-none inline-flex items-center justify-center rounded-md p-4"
          >
            <PlusCircle className="w-8 h-8" />
          </button>
        ) : (
          rewards.map((reward) => (
            <div
              key={reward.rewardsId}
              className="border border-slate-300 rounded-md py-2 px-1 w-full bg-white"
            >
              one reward
            </div>
          ))
        )}
      </div>
      <AddRewardsModal
        isOpen={openRewardModal}
        setIsOpen={setOpenRewardModal}
        setRewards={setRewards}
        rewards={rewards}
        project_fundraising_id={1}
      />
    </div>
  );
};

export default FundraiserDetails;

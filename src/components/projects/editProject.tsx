"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IProjectValues } from "./newProject";
import { nextDay } from "date-fns";
import useForm from "../hooks/form";
import { toast } from "../ui/toast";
import editProject from "../../app/helpers/projects/editProject";
import BasicInformation from "./basicInformation";
import FundraiserDetails from "./fundraiserDetails";
import { z } from "zod";
import { ProjectWithImages } from "../../app/crowdify/projects/edit/[pid]/page";

type Props = {
  project: ProjectWithImages;
};

const projectSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  deadline: z.coerce
    .date()
    .refine((date) => new Date(date).toString() !== "Invalid Date", {
      message: "a valid date is required",
    })
    .transform((date) => new Date(date)),
});

const EditProject = ({ project }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [date, setDate] = useState<Date | null>(nextDay(new Date(), 1));

  const router = useRouter();
  const initialState: IProjectValues = {
    banner: project.project_banner,
    deadline: project.project_deadline,
    description: project.project_description,
    goal: String(project.Project_Fundraising?.fundraiser_goal),
    rewards: project.Project_Fundraising?.fundraiser_rewards.map((rewards) => {
      return {
        rewardAmountRequirement: String(rewards.rewards_amount_requirement),
        rewardDescription: rewards.rewards_descriprion,
        rewardStock: String(rewards.rewards_in_stock),
        rewardTitle: rewards.rewards_title,
        rewardType: rewards.reward_type,
        rewardsId: rewards.rewards_id,
      };
    }),
    title: project.project_title,
    video: project.project_video,
  };

  const { handleChange, handleSubmit, values } = useForm(initialState);

  const onSubmit = async (data: IProjectValues) => {
    setIsLoading(true);
    try {
      await editProject(data, project.project_id);

      router.push("/crowdify/user-dashboard/projects");
    } catch (error) {
      if (error instanceof Error) {
        toast({
          message: error.message,
          title: "Error",
          type: "error",
        });
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit(values));
      }}
      className="max-w-2xl mx-auto flex flex-col items-center justify-center gap-4"
    >
      {/* basic information */}

      <BasicInformation
        handleChange={handleChange}
        values={values}
        setDate={setDate}
      />

      {/* fundraiser information */}

      <FundraiserDetails handleChange={handleChange} values={values} />

      {/* upload images */}
    </form>
  );
};

export default EditProject;

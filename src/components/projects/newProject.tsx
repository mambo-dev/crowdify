"use client";

import { Plus } from "lucide-react";
import React, { useState } from "react";
import Button from "../ui/button";
import { useRouter } from "next/navigation";
import createProject from "../../app/helpers/projects/createProject";
import { toast } from "../ui/toast";

type Props = {};

export interface IProjectValues {
  title: string;
  description: string;
  deadline: Date | null;
  goal: string;
  rewards:
    | {
        rewardTitle: string;
        rewardDescription: string;
        rewardAmountRequirement: string;
        rewardStock: string;
        rewardType: "merchandise" | "early_access" | "perks";
        rewardsId: number;
      }[]
    | undefined;
  banner: string;
  video: string;
}

const NewProject = ({}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const createNewProject = async () => {
    setIsLoading(true);
    try {
      const projectId = await createProject();

      toast({
        title: "Project Success",
        message: "successfully created project. Redirecting...",
        type: "success",
      });

      setTimeout(() => {
        router.push(`/crowdify/projects/edit/${projectId}`);
      }, 1000);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast({
          message: error.message,
          title: "Error",
          type: "error",
        });
        return;
      }

      toast({
        message: "something went wrong, please try again ",
        title: "error",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      variant="default"
      size="default"
      className="inline-flex items-center justify-center gap-3"
      onClick={createNewProject}
      isLoading={isLoading}
    >
      {isLoading ? null : <Plus className="w-4 h-4" />}
      New Project
    </Button>
  );
};

export default NewProject;

"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IProjectValues } from "./newProject";
import { nextDay } from "date-fns";
import useForm from "../hooks/form";
import { toast } from "../ui/toast";
import editProject from "../../app/helpers/projects/editProject";

type Props = {
  project_id: number;
};

const EditProject = ({ project_id }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const initialState: IProjectValues = {
    banner: null,
    deadline: nextDay(new Date(), 1),
    description: "",
    goal: "",
    rewardAmountRequirement: "",
    rewardDescription: "",
    rewardStock: "",
    rewardTitle: "",
    rewardType: "perks",
    title: "",
    video: null,
  };

  const { handleChange, handleSubmit, values } = useForm(initialState);

  const onSubmit = async (data: IProjectValues) => {
    setIsLoading(true);
    try {
      await editProject(data, project_id);

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
    >
      EditProject
    </form>
  );
};

export default EditProject;

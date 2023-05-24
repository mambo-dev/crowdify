"use client";

import React, { useState } from "react";
import { toast } from "../ui/toast";
import Button from "../ui/button";

type Props = {
  steps: { step: number; text: string; complete: boolean }[];
  setCurrentStep: React.Dispatch<
    React.SetStateAction<{
      step: number;
      text: string;
      complete: boolean;
    }>
  >;
  setSteps: React.Dispatch<
    React.SetStateAction<
      {
        step: number;
        text: string;
        complete: boolean;
      }[]
    >
  >;
};

const CreateProject = ({ steps, setCurrentStep, setSteps }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSaveProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const filterSteps = steps.filter((step) => step.step !== 1);

      setSteps([
        {
          step: 1,
          text: "Create project",
          complete: true,
        },
        ...filterSteps,
      ]);

      setCurrentStep({
        step: 2,
        text: "Add goal",
        complete: false,
      });
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
    <form
      action=""
      onSubmit={handleSaveProject}
      className="flex flex-col py-2 border border-slate-300 rounded-md px-2"
    >
      <div></div>
      <Button variant="default" size="lg" className="ml-auto">
        save project
      </Button>
    </form>
  );
};

export default CreateProject;

"use client";

import React from "react";

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
  return (
    <div className="">
      <button
        onClick={() => {
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
        }}
      >
        save
      </button>
    </div>
  );
};

export default CreateProject;

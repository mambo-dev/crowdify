"use client";
import React, { useState } from "react";
import ProjectStepper from "../../../../../components/projects/project-stepper";
import CreateFundraiser from "../../../../../components/projects/create-fundraiser";
import AddImages from "../../../../../components/projects/add-images";
import CreateProject from "../../../../../components/projects/create-project";

type Props = {};

const CreateProjectPage = (props: Props) => {
  const [currentStep, setCurrentStep] = useState({
    step: 1,
    text: "Create project",
    complete: false,
  });
  const [steps, setSteps] = useState<
    { step: number; text: string; complete: boolean }[]
  >([
    {
      step: 1,
      text: "Create project",
      complete: false,
    },
    {
      step: 2,
      text: "Add goal",
      complete: false,
    },
    {
      step: 3,
      text: "Upload images",
      complete: false,
    },
  ]);

  //project
  //fundraiser
  //images

  return (
    <div className="w-full flex flex-col gap-3">
      <ProjectStepper steps={steps} currentStep={currentStep} />
      {currentStep.step === 1 ? (
        <CreateProject
          setCurrentStep={setCurrentStep}
          setSteps={setSteps}
          steps={steps}
        />
      ) : currentStep.step === 2 ? (
        <CreateFundraiser />
      ) : (
        <AddImages />
      )}
    </div>
  );
};

export default CreateProjectPage;

"use client";
import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";
import ProjectStepper from "./project-stepper";
import CreateProject from "./create-project";
import CreateFundraiser from "./create-fundraiser";
import AddImages from "./add-images";

type Props = {
  hasProject: boolean;
  hasFundraiser: boolean;
  hasImages: boolean;
};

const CreateProjectClient = ({
  hasProject,
  hasFundraiser,
  hasImages,
}: Props) => {
  useEffect(() => {
    //save steps in the cookie when we load the page
    // then access the steps in our cookies and set that as our current step

    if (Cookies.get("steps")) {
      return;
    }

    if (!Cookies.get("currentStep")) {
      Cookies.set(
        "currentStep",
        JSON.stringify({
          step: 1,
          text: "Create project",
          complete: hasProject,
        })
      );
      return;
    }
  });

  const [currentStep, setCurrentStep] = useState<{
    step: number;
    text: string;
    complete: boolean;
  }>(
    Cookies.get("currentStep")
      ? JSON.parse(`${Cookies.get("currentStep")}`)
      : {
          step: 1,
          text: "Create project",
          complete: hasProject,
        }
  );

  const [steps, setSteps] = useState<
    { step: number; text: string; complete: boolean }[]
  >([
    {
      step: 1,
      text: "Create project",
      complete: hasProject,
    },
    {
      step: 2,
      text: "Add goal",
      complete: hasFundraiser,
    },
    {
      step: 3,
      text: "Upload images",
      complete: hasImages,
    },
  ]);

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

export default CreateProjectClient;

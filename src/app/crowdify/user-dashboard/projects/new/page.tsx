"use client";
import React, { useEffect, useState } from "react";
import ProjectStepper from "../../../../../components/projects/project-stepper";
import CreateFundraiser from "../../../../../components/projects/create-fundraiser";
import AddImages from "../../../../../components/projects/add-images";
import CreateProject from "../../../../../components/projects/create-project";
import Cookies from "js-cookie";
type Props = {};

const CreateProjectPage = (props: Props) => {
  useEffect(() => {
    //save steps in the cookie when we load the page
    // then access the steps in our cookies and set that as our current step

    if (!Cookies.get("steps")) {
      return;
    }
    Cookies.set(
      "steps",
      JSON.stringify([
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
      ]),
      { expires: 60 }
    );

    if (!Cookies.get("currentStep")) {
      Cookies.set(
        "currentStep",
        JSON.stringify({
          step: 1,
          text: "Create project",
          complete: false,
        })
      );
      return;
    }
  }, []);

  const [currentStep, setCurrentStep] = useState<{
    step: number;
    text: string;
    complete: boolean;
  }>(JSON.parse(`${Cookies.get("currentStep")}`));

  const [steps, setSteps] = useState<
    { step: number; text: string; complete: boolean }[]
  >(JSON.parse(`${Cookies.get("steps")}`));

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

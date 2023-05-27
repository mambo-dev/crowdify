"use client";

import { Check } from "lucide-react";
import React from "react";

type Props = {
  steps: { step: number; text: string; complete: boolean }[];
  currentStep: {
    step: number;
    text: string;
    complete: boolean;
  };
};

const ProjectStepper = ({ steps, currentStep }: Props) => {
  return (
    <ul className="w-full border rounded-md bg-white/30 border-slate-300 flex flex-col md:flex-row md:justify-between md:px-4  divide divide-y md:divide-x  divide-slate-300 md:divide-y-0">
      {steps.map((step) => (
        <li
          className={`py-2 w-full md:w-1/4 px-2 flex items-center gap-3 opacity-80 hover:opacity-100 cursor-pointer ${
            currentStep.step === step.step && "text-purple-500"
          }`}
          key={step.step}
        >
          <li
            className={`h-10 w-10 p-2 border ${
              currentStep.step === step.step
                ? "border-purple-500"
                : "border-slate-300"
            } ${
              step.complete && "bg-purple-500"
            } rounded-full flex items-center justify-center`}
          >
            {step.complete ? <Check className="text-white" /> : step.step}
          </li>
          {step.text}
        </li>
      ))}
    </ul>
  );
};

const svgDivider = (
  <svg
    className="pc ti axj"
    viewBox="0 0 22 80"
    fill="none"
    preserveAspectRatio="none"
  >
    <path
      d="M0 -2L20 40L0 82"
      vector-effect="non-scaling-stroke"
      stroke="currentcolor"
      stroke-linejoin="round"
    ></path>
  </svg>
);

export default ProjectStepper;

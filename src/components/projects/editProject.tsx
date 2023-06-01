"use client";

import React from "react";

import BasicInformation from "./basicInformation";
import FundraiserDetails from "./fundraiserDetails";
import { z } from "zod";
import { ProjectWithImages } from "../../app/crowdify/projects/edit/[pid]/page";

type Props = {
  project: ProjectWithImages;
};

const EditProject = ({ project }: Props) => {
  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center justify-center gap-4 px-4 md:px-0">
      {/* basic information */}

      <BasicInformation
        project_deadline={project.project_deadline}
        project_description={project.project_description}
        project_title={project.project_title}
        project_id={project.project_id}
      />

      {/* fundraiser information */}

      <FundraiserDetails
        fundraiser_details={project.Project_Fundraising}
        project_id={project.project_id}
      />

      {/* upload images */}
    </div>
  );
};

export default EditProject;

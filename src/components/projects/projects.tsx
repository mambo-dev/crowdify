"use client";
import React from "react";
import { Project } from "@prisma/client";
type Props = {
  projects: Project[];
};

const Projects = ({ projects }: Props) => {
  return <div>projects</div>;
};

export default Projects;

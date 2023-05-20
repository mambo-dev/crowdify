import React from "react";
import Button from "../../../../components/ui/button";
import { FolderPlus } from "lucide-react";
import Paragraph from "../../../../components/ui/paragraph";
import Heading from "../../../../components/ui/heading";

type Props = {};

const ProjectBanner = () => {
  return (
    <div className="w-full flex flex-col items-center pb-5 sm:pb-0 sm:items-start pt-10 sm:pt-0 px-4  ">
      <Heading size="sm">Create Project</Heading>
      <Paragraph size="sm">Create and manage projects</Paragraph>
    </div>
  );
};

const ProjectsPage = (props: Props) => {
  //allow user to create project
  //allow user to view all his created projects
  return <div>projects page</div>;
};

export default ProjectsPage;

import React from "react";
import Button from "../../../../components/ui/button";
import { FolderClosed, FolderPlus, Plus } from "lucide-react";
import Paragraph from "../../../../components/ui/paragraph";
import Heading from "../../../../components/ui/heading";
import { withAuth } from "../../../../lib/api-middlewares/with-auth";
import { headers } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";
import { getUserProjects } from "../../../helpers/projects/getProjects";
import Projects from "../../../../components/projects/projects";
import { db } from "../../../../lib/prisma";

const ProjectsPage = async () => {
  const req = {
    headers: {
      cookie: headers().get("cookie"),
      authorization: headers().get("authorization"),
    },
  };

  const session = await withAuth({ req });

  if (!session || session.error || !session.user) {
    redirect("/signin");
  }

  const projects = await db.project.findMany({});

  return (
    <div className="flex flex-col">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-center ">
          <Heading size="xs" className="text-left mr-auto">
            Projects
          </Heading>
          <Paragraph size="sm" className="text-left ml-auto">
            Create and manage projects
          </Paragraph>
        </div>
        <Button
          variant="default"
          size="default"
          className="inline-flex items-center justify-center gap-3"
        >
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>
      {projects.length > 0 ? (
        <div className="border border-slate-200 border-dashed  rounded-md flex flex-col gap-4 items-center justify-center">
          <div className="rounded-full w-20 h-20 bg-slate-400 items-center justify-center flex ">
            <FolderClosed className="w-10 h-10" />
          </div>
        </div>
      ) : (
        <Projects projects={projects} />
      )}
    </div>
  );
};

export default ProjectsPage;

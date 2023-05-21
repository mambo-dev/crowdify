import React from "react";
import Button from "../../../../components/ui/button";
import { FolderClosed, Plus } from "lucide-react";
import Paragraph from "../../../../components/ui/paragraph";
import Heading from "../../../../components/ui/heading";
import { withAuth } from "../../../../lib/api-middlewares/with-auth";
import { headers } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
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

  const projects = await db.project.findMany({
    where: {
      project_user: {
        user_id: session.user.user_id,
      },
    },
  });

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
        <Link href="/crowdify/user-dashboard/projects/new">
          {" "}
          <Button
            variant="default"
            size="default"
            className="inline-flex items-center justify-center gap-3"
          >
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </Link>
      </div>
      {projects.length <= 0 ? (
        <div className="border py-10 px-2  border-slate-400 border-dashed  rounded-md flex flex-col gap-4 items-center justify-center">
          <div className="rounded-full w-20 h-20 bg-slate-200/50 items-center justify-center flex text-slate-800 font-medium">
            <FolderClosed className="w-10 h-10" />
          </div>
          <div className="flex flex-col items-center justify-center ">
            <h1 className="text-slate-800 font-semibold text-lg ">
              No Projects posted
            </h1>
            <Paragraph size="sm" className="text-left ml-auto text-xs">
              You don&apos;t have any projects yet. Start creating Projects.
            </Paragraph>
          </div>
          <Link href="/crowdify/user-dashboard/projects/new">
            <Button
              variant="default"
              size="default"
              className="inline-flex items-center justify-center gap-3"
            >
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </Link>
        </div>
      ) : (
        <Projects projects={projects} />
      )}
    </div>
  );
};

export default ProjectsPage;

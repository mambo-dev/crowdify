import { headers } from "next/dist/client/components/headers";
import { withAuth } from "../../../../../lib/api-middlewares/with-auth";
import { redirect } from "next/navigation";
import { db } from "../../../../../lib/prisma";
import EditProject from "../../../../../components/projects/editProject";
import {Project,Project_Fundraiser, Project_images } from "@prisma/client"

export type ProjectWithImages  = (Project & {
  Project_Fundraising: Project_Fundraiser | null;
  project_images: Project_images[];
}) | null

const EditCreatedProject = async (params: any) => {
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

  const { pid } = params.params;

  if (!pid || isNaN(Number(pid))) {
    redirect("/crowdify/user-dashboard/projects");
  }

  const project = await db.project.findUnique({
    where: {
      project_id: Number(pid),
    },
    include: {
      Project_Fundraising: true,
      project_images: true,
    },
  });



  return <EditProject project_id={Number(pid)} />;
};

export default EditCreatedProject;

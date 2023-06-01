import { headers } from "next/dist/client/components/headers";
import { withAuth } from "../../../../../lib/api-middlewares/with-auth";
import { redirect } from "next/navigation";
import { db } from "../../../../../lib/prisma";
import EditProject from "../../../../../components/projects/editProject";
import {
  Project,
  Project_Fundraiser,
  Project_images,
  Fundraiser_rewards,
} from "@prisma/client";

export type ProjectWithImages = Project & {
  project_images: Project_images[];
  Project_Fundraising:
    | (Project_Fundraiser & {
        fundraiser_rewards: Fundraiser_rewards[];
      })
    | null;
};

const EditProjectPage = async (params: any) => {
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
      Project_Fundraising: {
        include: {
          fundraiser_rewards: true,
        },
      },
      project_images: true,
    },
  });

  if (!project) {
    redirect("/crowdify/user-dashboard/projects");
  }

  return <EditProject project={project} />;
};

export default EditProjectPage;

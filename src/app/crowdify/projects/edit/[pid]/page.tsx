import { headers } from "next/dist/client/components/headers";
import CreateProjectClient from "../../../../../components/projects/create-project-client";
import { withAuth } from "../../../../../lib/api-middlewares/with-auth";
import { redirect } from "next/navigation";
import { db } from "../../../../../lib/prisma";

const NewProjectPage = async (params: any) => {
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

  console.log(params);
  const projects = await db.project.findMany({
    where: {
      project_user: {
        user_id: session.user.user_id,
      },
    },
    include: {
      Project_Fundraising: true,
      project_images: true,
    },
  });

  return <div>new project</div>;
};

export default NewProjectPage;
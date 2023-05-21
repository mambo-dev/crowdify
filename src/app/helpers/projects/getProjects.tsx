import { GetProjectResponse } from "../../../types/api";
import { Project } from "@prisma/client";

interface IUser {
  id: number;
}

export async function getUserProjects(userId: IUser): Promise<Project[]> {
  const res = await fetch(
    `http://localhost:3000/api/projects/getUserProjects?user_id=${userId.id}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  );

  const data = (await res.json()) as GetProjectResponse;

  if (data.error || !data.projects) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(""));
    }

    throw new Error(data.error ?? "something unexpected happened");
  }

  return data.projects;
}

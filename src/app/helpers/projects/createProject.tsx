import { CreateProjectResponse } from "../../../types/api";

interface IProjectInput {
  title: string;
  description: string;
  video: string | undefined;
  banner: string | null | undefined;
  deadline: Date | null;
}

export default async function createProject(projectDetails: IProjectInput) {
  const res = await fetch(`/api/project/create`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(projectDetails),
  });

  const data = (await res.json()) as CreateProjectResponse;

  if (data.error || !data.success) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(""));
    }

    throw new Error(data.error ?? "something unexpected happened");
  }

  return data.success;
}

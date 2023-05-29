import { CreateProjectResponse } from "../../../types/api";

// interface IProjectInput {
//   title: string;
//   description: string;
//   deadline: Date;
// }

export default async function createProject() {
  const res = await fetch(`/api/project/create`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  const data = (await res.json()) as CreateProjectResponse;

  if (data.error || !data.success) {
    throw new Error(data.error ?? "something unexpected happened");
  }

  return data.project_id;
}

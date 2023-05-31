import { IProjectValues } from "../../../components/projects/newProject";
import { EditProjectResponse } from "../../../types/api";

export default async function editProject(
  editInput: IProjectValues,
  project_id: number
) {
  const res = await fetch(`/api/project/edit/${project_id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(editInput),
  });

  const data = (await res.json()) as EditProjectResponse;

  if (data.error || !data.success) {
    throw new Error(data.error ?? "something unexpected happened");
  }

  return data.success;
}

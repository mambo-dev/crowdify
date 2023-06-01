import { IProjectValues } from "../../../components/projects/newProject";
import { EditBasicInfoResponse, IBasicInformation } from "../../../types/api";

export async function editBasicInformation(
  basicInformation: IBasicInformation,
  project_id: number
) {
  const res = await fetch(`/api/project/basicInfo?project_id=${project_id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(basicInformation),
  });

  const data = (await res.json()) as EditBasicInfoResponse;

  if (data.error || !data.success) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(""));
    }
    throw new Error(data.error ?? "something unexpected happened");
  }

  return data.success;
}

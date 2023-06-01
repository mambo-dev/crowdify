import { RewardsResponse } from "../../../types/api";

export default async function editFundraiser(goal: number, project_id: number) {
  const res = await fetch(
    `/api/project/editFundraiser?project_id=${project_id}`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ goal }),
    }
  );

  const data = (await res.json()) as RewardsResponse;

  if (data.error || !data.success) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(""));
    }
    throw new Error(data.error ?? "something unexpected happened");
  }

  return data.success;
}

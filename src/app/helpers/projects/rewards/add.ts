import { AddRewardsResponse, IRewardsInput } from "../../../../types/api";

// interface IProjectInput {
//   title: string;
//   description: string;
//   deadline: Date;
// }

export default async function addReward(
  rewardsInput: IRewardsInput,
  project_id: number
) {
  const res = await fetch(`/api/project/reward/add?project_id=${project_id}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(rewardsInput),
  });

  const data = (await res.json()) as AddRewardsResponse;

  if (data.error || !data.success) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(""));
    }
    throw new Error(data.error ?? "something unexpected happened");
  }

  return data.success;
}

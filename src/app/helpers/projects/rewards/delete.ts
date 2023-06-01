import { RewardsResponse, IRewardsInput } from "../../../../types/api";

export default async function deleteReward(reward_id: number) {
  const res = await fetch(`/api/project/reward/delete?reward_id=${reward_id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });

  const data = (await res.json()) as RewardsResponse;

  if (data.error || !data.success) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(""));
    }
    throw new Error(data.error ?? "something unexpected happened");
  }

  return data.success;
}

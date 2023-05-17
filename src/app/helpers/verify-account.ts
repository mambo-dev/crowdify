import { Verification } from "../../types/api";

interface IVerify {
  verificationCode: string;
}

export default async function verifyAccount(verification: IVerify) {
  console.log(verification);
  const res = await fetch(`/api/account/verify`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(verification),
  });

  const data = (await res.json()) as Verification;

  if (data.error || !data.success) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(""));
    }

    throw new Error(data.error ?? "something unexpected happened");
  }

  return data.success;
}

import { CreatedUserAccount } from "../../types/api";

interface IAccount {
  email: string;
  password: string;
  firstName: string;
  secondName: string;
}

export default async function createAccount(accountDetails: IAccount) {
  const res = await fetch(`/api/account/create`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(accountDetails),
  });

  const data = (await res.json()) as CreatedUserAccount;

  if (data.error || !data.success) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(""));
    }

    throw new Error(data.error ?? "something unexpected happened");
  }

  return data.success;
}

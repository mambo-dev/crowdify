import { LoggedInUser } from "../../types/api";

interface ILogin {
  email: string;
  password: string;
}

export default async function loginIntoAccount(loginDetails: ILogin) {
  const res = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(loginDetails),
  });

  const data = (await res.json()) as LoggedInUser;

  if (data.error || !data.success) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(""));
    }

    throw new Error(data.error ?? "something unexpected happened");
  }

  return data.success;
}

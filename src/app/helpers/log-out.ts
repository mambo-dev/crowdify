import { CreatedUserAccount, LogOut } from "../../types/api";

export default async function logout() {
  const res = await fetch(`/api/auth/login`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  const data = (await res.json()) as LogOut;

  return data.success;
}

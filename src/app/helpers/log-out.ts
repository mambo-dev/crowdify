import { LogOut } from "../../types/api";

export default async function signOut() {
  const res = await fetch(`/api/auth/logout`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  const data = (await res.json()) as LogOut;

  return data.success;
}

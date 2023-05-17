import { LoggedInUser } from "../../types/api";

export default async function signInOrSignUp(credential: "github" | "google") {
  if (credential === "google") {
    const res = await fetch(`/api/auth/google`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
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

  if (credential === "github") {
    const res = await fetch(`/api/auth/github`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
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
}

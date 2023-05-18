import { LoggedInUser } from "../../types/api";
import { getGitHubUrl } from "./getgithuburl";
import { getGoogleUrl } from "./getgoogleurl";

export default async function signInOrSignUpWithProvider(
  credential: "github" | "google",
  from: string
) {
  if (credential === "google") {
    return getGoogleUrl(from);
  }

  if (credential === "github") {
    //return github config screen
    return getGitHubUrl(from);
  }

  throw new Error("invalid provider");
}

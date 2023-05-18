import { LoggedInUser } from "../../types/api";
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
    return "";
  }

  throw new Error("invalid provider");
}

"use client";
import React, { useEffect, useState } from "react";
import Button from "../ui/button";
import { signIn } from "next-auth/react";
import { toast } from "../ui/toast";
import { Github, Loader2 } from "lucide-react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import signInOrSignUpWithProvider from "../../app/helpers/oauthproviders";

type Props = {};

const SignUpWithGithub = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const from = pathname || "/signup";

  useEffect(() => {
    const error = params ? params.get("error") : null;

    if (params && error) {
      toast({
        title: "Error signing in",
        message: error,
        type: "error",
      });
    }
  });
  const signInWithGithub = async () => {
    setIsLoading(true);
    try {
      router.push(await signInOrSignUpWithProvider("github", from));

      setIsLoading(false);

      toast({
        title: "welcome",
        message: "yeeei!!! welcome",
        type: "success",
      });
    } catch (error) {
      setIsLoading(true);
      toast({
        title: "Error signing in",
        message: "Please try again later",
        type: "error",
      });
    }
  };

  return (
    <button
      type="button"
      onClick={signInWithGithub}
      className="py-2 px-10 h-11 w-full text-slate-100 bg-slate-800 hover:bg-slate-900 hover:text-slate-200  inline-flex items-center justify-center rounded-md gap-4 font-semibold"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Github className="w-4 h-4" />
      )}
      github
    </button>
  );
};

export default SignUpWithGithub;

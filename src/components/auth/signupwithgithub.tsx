"use client";
import React, { useState } from "react";
import Button from "../ui/button";
import { signIn } from "next-auth/react";
import { toast } from "../ui/toast";
import { Github, Loader2 } from "lucide-react";

type Props = {};

const SignUpWithGithub = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>();

  const signInWithGithub = async () => {
    setIsLoading(true);
    try {
      const signedIn = await signIn("github", {
        callbackUrl: "/crowdify",
      });
      setIsLoading(false);
      signedIn?.ok &&
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

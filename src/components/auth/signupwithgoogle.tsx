"use client";
import React, { useState } from "react";
import Button from "../ui/button";
import { signIn } from "next-auth/react";
import { toast } from "../ui/toast";
import { Chrome, Loader2 } from "lucide-react";

type Props = {};

const SignUpWithGoogle = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>();

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const signedIn = await signIn("google");
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
      className="py-2 px-10 h-11 w-full text-red-800 bg-red-100 hover:bg-red-200 hover:text-red-900 inline-flex items-center justify-center rounded-md gap-4 font-semibold"
      onClick={signInWithGoogle}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Chrome className=" w-5 h-5" />
      )}
      Google
    </button>
  );
};

export default SignUpWithGoogle;

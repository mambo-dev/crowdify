"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/button";
import { toast } from "../ui/toast";
import signOut from "../../app/helpers/log-out";
import { Loader2, LogOut } from "lucide-react";

type Props = {};

const SignOutButton = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const router = useRouter();
  const signOutNextAuth = async () => {
    setIsLoading(true);
    try {
      await signOut();
      setIsLoading(false);
      router.push("/");
    } catch (error) {
      setIsLoading(true);
      toast({
        title: "Error signing out",
        message: "Please try again later",
        type: "error",
      });
    }
  };

  return (
    <button
      type="button"
      onClick={signOutNextAuth}
      className="py-2 px-10  w-full text-slate-100 bg-slate-800 hover:bg-slate-900 hover:text-slate-200  inline-flex items-center justify-center rounded-md gap-4 "
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="w-4 h-4" />
      )}
      logout
    </button>
  );
};

export default SignOutButton;

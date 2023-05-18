"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/button";
import { toast } from "../ui/toast";
import signOut from "../../app/helpers/log-out";

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
    <Button
      variant="default"
      size="default"
      onClick={signOutNextAuth}
      isLoading={isLoading}
    >
      sign out
    </Button>
  );
};

export default SignOutButton;

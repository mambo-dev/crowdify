"use client";
import React, { useState } from "react";

import { signIn, signOut } from "next-auth/react";
import Button from "../ui/button";
import { toast } from "../ui/toast";

type Props = {};

const SignOutButton = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>();

  const signOutNextAuth = async () => {
    setIsLoading(true);
    try {
      await signOut();
      setIsLoading(false);
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

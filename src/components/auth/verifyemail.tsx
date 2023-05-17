"use client";
import React, { useState } from "react";
import Button from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";
import verifyAccount from "../../app/helpers/verify-account";

type Props = {};

const VerifyEmail = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const router = useRouter();
  async function handleVerification(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await verifyAccount({ verificationCode });

      router.push("/crowdify");
    } catch (error: any) {
      if (error instanceof Error) {
        toast({
          message: error.message,
          title: "Error",
          type: "error",
        });
        return;
      }

      toast({
        message: "something went wrong, please try again ",
        title: "error",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <form
      onSubmit={handleVerification}
      className="w-full flex flex-col gap-6 mx-auto "
    >
      <div className="flex flex-col gap-2">
        <label className="font-medium text-slate-700">enter code</label>
        <Input
          name="verificationCode"
          type="password"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
      </div>
      <Button
        isLoading={isLoading}
        variant="default"
        className="w-full"
        size="lg"
      >
        verify email
      </Button>
    </form>
  );
};

export default VerifyEmail;

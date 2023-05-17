"use client";
import React, { useState } from "react";
import SignUpWithGoogle from "./signupwithgoogle";
import SignUpWithGithub from "./signupwithgithub";
import { Input } from "../ui/input";
import Button from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import createAccount from "../../app/helpers/create-account";

type Props = {};

const SignUpForm = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  async function handleCredentialsSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createAccount({
        email,
        firstName,
        secondName,
        password,
      });

      router.push("/email-verification");
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
      className="  max-w-full sm:w-fit  sm:max-w-6xl flex flex-col gap-6 mb-4 "
      onSubmit={handleCredentialsSubmit}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3">
        <SignUpWithGoogle />
        <SignUpWithGithub />
      </div>
      <div className="w-full items-center flex justify-center py-2 text-slate-600">
        Or
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3">
        <div className="flex flex-col gap-2">
          <label className="font-medium text-slate-700">first name</label>
          <Input
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            name="firstName"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-slate-700">second name</label>
          <Input
            onChange={(e) => setSecondName(e.target.value)}
            value={secondName}
            name="secondName"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium text-slate-700">email</label>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          type="email"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium text-slate-700">password</label>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          type="password"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium text-slate-700">confirm password</label>
        <Input
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          name="confirmPassword"
          type="password"
        />
      </div>
      <Button
        isLoading={isLoading}
        variant="default"
        className="w-full"
        size="lg"
      >
        sign up
      </Button>
    </form>
  );
};

export default SignUpForm;

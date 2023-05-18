"use client";
import React, { useState } from "react";
import SignUpWithGoogle from "./signupwithgoogle";
import SignUpWithGithub from "./signupwithgithub";
import { Input } from "../ui/input";
import Button from "../ui/button";
import { SignInResponse, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import createAccount from "../../app/helpers/create-account";
import loginIntoAccount from "../../app/helpers/log-in";

type Props = {};

const SignInForm = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  async function handleCredentialsSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await loginIntoAccount({
        email,
        password,
      });

      toast({
        title: "welcome",
        message: "yeeei!!! welcome",
        type: "success",
      });
      setIsLoading(false);
      setTimeout(() => {
        router.push("/crowdify");
      }, 500);
    } catch (error: any) {
      console.log(error);
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
      className="  max-w-full sm:w-fit  sm:max-w-6xl flex flex-col gap-4 mb-4 "
      onSubmit={handleCredentialsSubmit}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3">
        <SignUpWithGoogle />
        <SignUpWithGithub />
      </div>
      <div className="w-full items-center flex justify-center py-2 text-slate-600">
        Or
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

      <Button
        isLoading={isLoading}
        variant="default"
        className="w-full"
        size="lg"
      >
        sign in
      </Button>
    </form>
  );
};

export default SignInForm;

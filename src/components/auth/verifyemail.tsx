import React, { useState } from "react";
import Button from "../ui/button";
import { Input } from "../ui/input";
import { db } from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

type Props = {};

const VerifyEmail = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  async function handleVerification() {
    setIsLoading(true);
    ("use server");
    try {
    } catch (error) {}
  }
  return (
    <form action={handleVerification}>
      <div className="flex flex-col gap-2">
        <label className="font-medium text-slate-700">confirm password</label>
        <Input name="confirmPassword" type="password" />
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

export default VerifyEmail;

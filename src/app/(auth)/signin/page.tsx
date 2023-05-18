import React from "react";
import Heading from "../../../components/ui/heading";
import Paragraph from "../../../components/ui/paragraph";

import Image from "next/image";
import SignInForm from "../../../components/auth/signinform";

const SingInPage = async () => {
  return (
    <section className="flex items-center justify-between">
      <div className="w-full md:w-1/2 flex flex-col items-center pt-10 px-4  md:px-10">
        <Heading size="sm">Welcome CrowdiFier</Heading>
        <Paragraph size="sm">Log into your account to continue</Paragraph>
        <SignInForm />
      </div>
      <div className="hidden md:flex md:w-1/2">
        <Image
          className="w-full h-screen"
          src="/images/signup.svg"
          alt="signup"
          width={1000}
          height={1200}
        />
      </div>
    </section>
  );
};

export default SingInPage;

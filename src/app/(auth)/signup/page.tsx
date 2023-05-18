import React from "react";
import Heading from "../../../components/ui/heading";
import Paragraph from "../../../components/ui/paragraph";
import SignUpForm from "../../../components/auth/signupform";
import Image from "next/image";

const SignUp = async () => {
  return (
    <section className="flex items-center justify-between">
      <div className="w-full md:w-1/2 flex flex-col items-center pt-10 px-4  md:px-10">
        <Heading size="sm">Welcome new CrowdiFier</Heading>
        <Paragraph size="sm">
          Create your account to get started today
        </Paragraph>
        <SignUpForm />
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

export default SignUp;

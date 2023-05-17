import React from "react";
import Heading from "../../../components/ui/heading";
import Paragraph from "../../../components/ui/paragraph";
import VerifyEmail from "../../../components/auth/verifyemail";

type Props = {};

const VerificationPage = (props: Props) => {
  return (
    <section className="flex  items-center justify-center">
      <div className="w-full md:w-1/2 mx-auto  flex flex-col items-center pt-20 px-4  md:px-10">
        <Heading size="sm">Verify Email</Heading>
        <Paragraph size="sm">
          We have sent an email kindly use the code to sign in
        </Paragraph>
        <VerifyEmail />
      </div>
    </section>
  );
};

export default VerificationPage;

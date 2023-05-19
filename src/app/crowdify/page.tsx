import React from "react";
import { headers } from "next/dist/client/components/headers";
import { withAuth } from "../../lib/api-middlewares/with-auth";
import { redirect } from "next/navigation";

import Paragraph from "../../components/ui/paragraph";
import Heading from "../../components/ui/heading";

type Props = {};

const CrowdifyPage = async (props: Props) => {
  const req = {
    headers: {
      cookie: headers().get("cookie"),
      authorization: headers().get("authorization"),
    },
  };

  const session = await withAuth({
    req,
  });

  if (!session || session.error) {
    redirect("/");
  }
  return (
    <section className="flex items-center justify-between">
      <div className="w-full  flex flex-col items-center pt-10 px-4  md:px-10">
        <Heading size="sm">Browse Active Projects</Heading>
        <Paragraph size="sm">find a project you want to support</Paragraph>
      </div>
    </section>
  );
};

export default CrowdifyPage;

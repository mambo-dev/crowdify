import React from "react";
import { headers } from "next/dist/client/components/headers";
import { withAuth } from "../../lib/api-middlewares/with-auth";
import { redirect } from "next/navigation";

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
  return <div>CrowdifyPage</div>;
};

export default CrowdifyPage;

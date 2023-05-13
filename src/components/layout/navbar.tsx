import React from "react";
import { getServerSession } from "next-auth";

type Props = {};

const NavBar = (props: Props) => {
  const user = getServerSession();
  return <div>NavBar</div>;
};

export default NavBar;

import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";

type Props = {};

const NavBar = async (props: Props) => {
  const user = await getServerSession(authOptions);

  return (
    <nav className="fixed top-0 right-0 left-0 bg-white text-slate-700 shadow h-14 dark:bg-slate-900 dark:text-slate-100 "></nav>
  );
};

export default NavBar;

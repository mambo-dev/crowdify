"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { paragraphVariants } from "../ui/paragraph";
import { buttonVariants } from "../ui/button";

type Props = {};

const HomePageNav = (props: Props) => {
  const pathname = usePathname();

  if (pathname === "/crowdify") {
    return <div className="hidden"></div>;
  }

  return (
    <div className="h-11  py-2 w-fit ml-auto flex items-center  justify-center">
      <Link
        href="/how-it-works"
        className={buttonVariants({
          size: "lg",
          className: "hover:underline hover:bg-none ",
          variant: "ghost",
        })}
      >
        How it works ?
      </Link>
    </div>
  );
};

export default HomePageNav;

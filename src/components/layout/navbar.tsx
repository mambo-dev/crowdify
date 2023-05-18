import React from "react";
import Image from "next/image";
import HomePageNav from "./home-page-nav";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import SignOutButton from "../auth/signoutbutton";
import UserDropDownMenu from "../userdropdown";
import { withAuth } from "../../lib/api-middlewares/with-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { headers } from "next/dist/client/components/headers";

const NavBar = async () => {
  const req = {
    headers: {
      cookie: headers().get("cookie"),
      authorization: headers().get("authorization"),
    },
  };

  const session = await withAuth({
    req,
  });

  return (
    <nav className="fixed top-0 px-4 py-5 flex items-center justify-between right-0 left-0 bg-white text-slate-700 shadow h-20 dark:bg-slate-900 dark:text-slate-100 ">
      <div className="relative w-20 h-full">
        <Link href="/">
          <Image
            src="/images/logo.png"
            className="w-full h-full"
            alt="loaing-logo"
            width={400}
            height={400}
          />
        </Link>
      </div>

      <div className="flex gap-6 items-center justify-center w-fit">
        <HomePageNav />
        {session && session.error && (
          <>
            <Link
              href="/signin"
              className={buttonVariants({
                variant: "link",
                size: "lg",
              })}
            >
              sign in
            </Link>

            <Link
              href="/signup"
              className={buttonVariants({
                variant: "default",
                size: "xl",
              })}
            >
              sign up
            </Link>
          </>
        )}

        {session && session.user && <UserDropDownMenu user={session.user} />}
      </div>
    </nav>
  );
};

export default NavBar;

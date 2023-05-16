import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import Image from "next/image";
import HomePageNav from "./home-page-nav";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import SignOutButton from "../auth/signoutbutton";
import UserDropDownMenu from "../userdropdown";

type Props = {};

const NavBar = async (props: Props) => {
  const user = await getServerSession(authOptions);

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
        <Link
          href="/auth/signin"
          className={buttonVariants({
            variant: "link",
            size: "lg",
          })}
        >
          sign in
        </Link>

        <Link
          href="/auth/signup"
          className={buttonVariants({
            variant: "default",
            size: "xl",
          })}
        >
          sign up
        </Link>

        {user && user.user && <UserDropDownMenu user={user.user} />}
      </div>
    </nav>
  );
};

export default NavBar;

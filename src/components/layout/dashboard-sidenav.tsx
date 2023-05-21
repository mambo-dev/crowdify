"use client";
import { Banknote, FolderClosed, User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

interface IsideNav {
  name: string;
  link: string;
  icon: React.JSX.Element;
}

const DashboardSideNav = (props: Props) => {
  const sideNav: IsideNav[] = [
    {
      name: "Projects",
      link: "/crowdify/user-dashboard/projects",
      icon: <FolderClosed className="w-4 h-4" />,
    },
    {
      name: "Donations",
      link: "/crowdify/user-dashboard/donations",
      icon: <Banknote className="w-4 h-4" />,
    },
    {
      name: "Account",
      link: "/crowdify/user-dashboard/account",
      icon: <User2 className="w-4 h-4" />,
    },
  ];

  const pathname = usePathname();

  return (
    <div className="hidden sm:flex h-screen w-48">
      <ul className="flex flex-col gap-2 w-full">
        {sideNav.map((nav, index) => (
          <Link key={index} href={nav.link}>
            <li
              className={`py-2 px-4 w-full flex items-center justify-start gap-2 rounded-md hover:bg-slate-100 text-sm font-medium  ${
                pathname?.startsWith(nav.link) && "bg-slate-200  "
              } `}
              key={index}
            >
              {nav.icon}
              {nav.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default DashboardSideNav;

"use client";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

interface IsideNav {
  name: string;
  link: string;
}

const DashboardSideNav = (props: Props) => {
  const sideNav: IsideNav[] = [
    { name: "Projects", link: "/crowdify/user-dashboard/projects" },
    { name: "Donations", link: "/crowdify/user-dashboard/Donations" },
    { name: "Account", link: "/crowdify/user-dashboard/Account" },
  ];

  const pathname = usePathname();

  return (
    <div>
      <ul className="flex flex-col ">
        {sideNav.map((nav, index) => (
          <li
            className={`py-2 flex items-center justify-start rounded-md ${
              pathname?.startsWith(nav.link) && "bg-slate-200"
            } `}
            key={index}
          >
            {nav.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardSideNav;

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./utils/dropdownmenu";
import { buttonVariants } from "./ui/button";
import SignOutButton from "./auth/signoutbutton";
import { User } from "@prisma/client";
import AvatarDemo from "./ui/avatar";
import Paragraph from "./ui/paragraph";
import { Banknote, FolderClosed, FolderSearch } from "lucide-react";
import Link from "next/link";

type Props = {
  user: User;
};

const UserDropDownMenu = ({ user }: Props) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-purple-50 group focus:outline-none rounded-full w-10 h-10 py-2 px-4 flex items-center justify-center gap-3">
          <AvatarDemo
            fallback={`${user.user_name?.charAt(0)}`}
            //@ts-ignore
            image={user.user_image}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          forceMount
          className="flex flex-col gap-4 mt-4 py-2 "
        >
          <div className="w-full border-b border-slate-100 py-2">
            <Paragraph size="sm"> {user.user_email}</Paragraph>
          </div>
          <div className="w-full border-b border-slate-100">
            <Link href="/crowdify">
              <DropdownMenuItem className="flex items-center justify-start gap-4">
                <FolderSearch className="w-5 h-5" />
                browse
              </DropdownMenuItem>
            </Link>
            <Link href="/crowdify/user-dashboard/donations">
              <DropdownMenuItem className="flex items-center justify-start gap-4">
                <Banknote className="w-5 h-5" />
                donations
              </DropdownMenuItem>
            </Link>
            <Link href="/crowdify/user-dashboard/projects">
              <DropdownMenuItem className="flex items-center justify-start gap-4">
                <FolderClosed className="w-5 h-5" />
                projects
              </DropdownMenuItem>
            </Link>
          </div>
          <DropdownMenuItem className="hover:bg-none">
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDropDownMenu;

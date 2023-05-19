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

type Props = {
  user: User;
};

const UserDropDownMenu = ({ user }: Props) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="hover:bg-purple-50 group focus:outline-none rounded-md py-2 px-4 flex items-center justify-center gap-3">
          <div className="w-[45px] h-[45px] flex items-center justify-center p-4  rounded-full bg-slate-200 group-hover:bg-white py-2">
            <AvatarDemo
              fallback={`${user.user_name?.charAt(0)}`}
              //@ts-ignore
              image={user.user_image}
            />
          </div>
          {user.user_name}
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
            <DropdownMenuItem>donations</DropdownMenuItem>
            <DropdownMenuItem>projects</DropdownMenuItem>
          </div>
          <DropdownMenuItem>
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDropDownMenu;

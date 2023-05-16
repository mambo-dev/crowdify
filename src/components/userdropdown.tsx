import { User } from "next-auth";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./utils/dropdownmenu";
import { buttonVariants } from "./ui/button";
import SignOutButton from "./auth/signoutbutton";

type Props = {
  user: User & {
    id: string;
  };
};

const UserDropDownMenu = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={buttonVariants({ variant: "ghost", size: "sm" })}
      >
        {user.name}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <div className="w-full divide-y-2 divide-slate-100">{user.email}</div>
        <DropdownMenuItem>donations</DropdownMenuItem>
        <DropdownMenuItem>projects</DropdownMenuItem>
        <DropdownMenuItem>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDownMenu;

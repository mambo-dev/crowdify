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

type Props = {
  user: User;
};

const UserDropDownMenu = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={buttonVariants({ variant: "ghost", size: "sm" })}
      >
        {user.user_name}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <div className="w-full divide-y-2 divide-slate-100">
          {user.user_email}
        </div>
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

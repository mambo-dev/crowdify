"use client";
import React from "react";
import * as Avatar from "@radix-ui/react-avatar";

type props = {
  fallback: string;
  image: string | undefined;
};

const AvatarDemo = ({ fallback, image }: props) => (
  <Avatar.Root className="w-full h-full rounded-full inline-flex items-center justify-center align-middle">
    <Avatar.Image className="w-full h-full" src={image} alt="Colm Tuite" />
    <Avatar.Fallback
      className="w-full h-full rounded-full flex items-center justify-center text-purple-600 uppercase text-medium"
      delayMs={600}
    >
      {fallback}
    </Avatar.Fallback>
  </Avatar.Root>
);

export default AvatarDemo;

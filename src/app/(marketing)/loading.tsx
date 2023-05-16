import Image from "next/image";
import React from "react";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="w-full min-h-screen py-32 flex items-center justify-center">
      <div className="w-40 h-40 relative">
        <Image
          src="/images/logo.png"
          className="animate-pulse"
          alt="loading-logo"
          fill
        />
      </div>
    </div>
  );
};

export default Loading;

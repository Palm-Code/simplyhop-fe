"use client";
import * as React from "react";
import clsx from "clsx";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import SVGIcon from "@/core/icons";

export interface HeaderHelpCenterProps {
  title?: string;
}

export const HeaderHelpCenter = ({ title = "" }: HeaderHelpCenterProps) => {
  // const router = useRouter();
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]",
        "w-full"
      )}
    >
      {/* <Link href="" onClick={() => router.back()}>
        <SVGIcon
          name="ArrowLeft"
          className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#5B5B5B]")}
        />
      </Link> */}
      <h1 className={clsx("text-[1.5rem] text-[#292929] font-bold")}>
        {title}
      </h1>
    </div>
  );
};

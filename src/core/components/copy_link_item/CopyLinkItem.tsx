"use client";
import * as React from "react";
import clsx from "clsx";
import SVGIcon from "@/core/icons";

export interface CopyLinkItemProps {
  link?: {
    displayLink: string;
    fullLink: string;
  };
  cta?: {
    copy: {
      children: React.ReactNode;
    };
  };
}

export const CopyLinkItem = ({
  link = {
    displayLink: "",
    fullLink: "",
  },
  cta = {
    copy: {
      children: "",
    },
  },
}: CopyLinkItemProps) => {
  const [isCopy, setIsCopy] = React.useState<boolean>(false);
  const handleClickCopy = () => {
    navigator.clipboard.writeText(link.fullLink);
    setIsCopy(true);
  };
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-between justify-items-start gap-[1rem]",
        "w-full",
        "px-[1rem] py-[0.75rem]",
        "border border-[#E9E6E6] dark:border-[#464646]",
        "rounded-[0.375rem]",
        "h-[52px]"
      )}
    >
      <span
        className={clsx(
          "text-[#232323] dark:text-white text-[0.875rem] font-medium text-ellipsis truncate",
          "w-full"
        )}
      >
        {link.displayLink}
      </span>
      {isCopy ? (
        <div
          className={clsx(
            "flex items-center justify-center",
            "w-[1rem] h-[1rem]",
            "rounded-[50%]",
            "bg-[#249124] dark:bg-[#33CC33]"
          )}
        >
          <SVGIcon
            name="Check"
            className={clsx("w-[0.75rem] h-[0.75rem]", "text-[white] dark:text-[#232323]")}
          />
        </div>
      ) : (
        <button
          aria-label={String(cta.copy.children ?? "")}
          name={String(cta.copy.children ?? "")}
          className={clsx(
            "flex items-center justify-center",
            "px-[0rem] lg:px-[1rem] py-[10.5px]",
            "text-[#249124] dark:text-[#33CC33] text-[0.75rem] font-medium",
            "cursor-pointer"
          )}
          onClick={handleClickCopy}
        >
          {cta.copy.children}
        </button>
      )}
    </div>
  );
};

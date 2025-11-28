import * as React from "react";
import clsx from "clsx";
import Link from "next/link";

export interface LegalItemHelpCenterSupportProps {
  id?: string;
  name?: string;
  description?: string;
  cta?: {
    children: string;
    href: string;
  };
}

export const LegalItemHelpCenterSupport = ({
  id = "",
  name = "",
  description = "",
  cta = {
    children: "",
    href: "",
  },
}: LegalItemHelpCenterSupportProps) => {
  return (
    <div
      id={id}
      className={clsx(
        "grid grid-cols-1 lg:grid-flow-col items-center content-center justify-between justify-items-start gap-[0.5rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[0.25rem]",
          "w-full"
        )}
      >
        <p className={clsx("text-[#232323] dark:text-white text-[1rem] font-medium")}>
          {name}
        </p>
        <p className={clsx("text-[#606060] dark:text-[#C3C3C3] text-[0.875rem] font-normal")}>
          {description}
        </p>
      </div>

      <Link
        href={cta.href}
        className={clsx(
          "px-[0rem] py-[1rem] lg:px-[46.5px] lg:py-[1rem]",
          "text-[#33CC33] text-[0.875rem] font-medium"
        )}
      >
        {cta.children}
      </Link>
    </div>
  );
};

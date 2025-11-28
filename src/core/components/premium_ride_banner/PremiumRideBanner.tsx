import * as React from "react";
import clsx from "clsx";
import Link from "next/link";

export interface PremiumRideBannerProps {
  message?: string;
  description?: string;
  cta?: {
    href: string;
    children: React.ReactNode;
  };
}

export const PremiumRideBanner = ({
  message = "",
  description = "",
  cta = {
    href: "",
    children: "",
  },
}: PremiumRideBannerProps) => {
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-between justify-items-start gap-[0.5rem]",
        "w-full",
        "rounded-[0.625rem]",
        "px-[1rem] py-[1rem]",
        "border border-[#33CC33] dark:border-[#464646]",
        "bg-[#EFF9EC]"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-center content-center justify-start justify-items-start gap-[0.5rem]",
          "w-full"
        )}
      >
        <p
          className={clsx(
            "text-[0.875rem] text-[#232323] dark:text-white font-bold"
          )}
        >
          {message}
        </p>
        <p
          className={clsx(
            "text-[0.75rem] text-[#5B5B5B] dark:text-[#C3C3C3] font-normal"
          )}
        >
          {description}
        </p>
      </div>

      <Link
        href={cta.href}
        className={clsx(
          "text-[13px] text-[#232323] dark:text-white font-medium underline"
        )}
      >
        {cta.children}
      </Link>
    </div>
  );
};

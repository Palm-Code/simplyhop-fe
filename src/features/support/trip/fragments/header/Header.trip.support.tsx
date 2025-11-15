import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import SVGIcon, { SVGIconProps } from "@/core/icons";
import Link from "next/link";

export const HeaderTripSupport = () => {
  const dictionaries = getDictionaries();
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-between justify-items-start gap-[0.5rem]",
        "w-full"
      )}
    >
      <h1 className={clsx("text-[#292929] text-[1.5rem] font-bold")}>
        {dictionaries.header.title}
      </h1>

      <Link
        href={dictionaries.header.archive.href}
        className={clsx("flex items-center justify-end gap-[0.5rem]")}
      >
        <SVGIcon
          {...(dictionaries.header.archive.icon as {
            name: SVGIconProps["name"];
          })}
          className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#33CC33]")}
        />
        <p className={clsx("text-[#33CC33] text-[1rem] font-medium")}>
          {dictionaries.header.archive.label}
        </p>
      </Link>
    </div>
  );
};

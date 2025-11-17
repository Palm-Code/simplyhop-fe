import * as React from "react";
import clsx from "clsx";
import SVGIcon, { SVGIconProps } from "@/core/icons";
import { getDictionaries } from "../../i18n";

export const BadgeFindTrip = () => {
  const dictionaries = getDictionaries();

  return (
    <div
      className={clsx(
        "grid grid-flow-col place-items-center place-content-center gap-4",
        "bg-green-500",
        "rounded-[0.5rem] lg:rounded-[1.25rem]",
        "px-[0.5rem] py-[0.5rem] lg:px-4 lg:py-4",
        "text-[1rem] lg:text-xl text-[#232323] font-bold",
        "w-fit"
      )}
    >
      <SVGIcon
        {...(dictionaries.top_badge.icon as { name: SVGIconProps["name"] })}
        className={clsx("w-[1rem] h-[1rem] lg:w-6 lg:h-6", "text-[#232323]")}
      />
      {dictionaries.top_badge.label}
    </div>
  );
};

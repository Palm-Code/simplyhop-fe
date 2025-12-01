import * as React from "react";
import clsx from "clsx";
import SVGIcon from "@/core/icons";
import { getDictionaries } from "../../i18n";

export const HeaderListUserBlock = () => {
  const dictionaries = getDictionaries();
  return (
    <div
      className={clsx(
        "flex items-center justify-start gap-[0.625rem]",
        "w-full",
        "px-4 py-3",
        "border-b-[0.5px] border-b-[#E9E9E9] dark:border-b-[#E9E9E9]"
      )}
    >
      <button>
        <SVGIcon
          name="ArrowRight"
          className={clsx("w-6 h-6", "text-[#767676] dark:text-[#767676]")}
        />
      </button>
      <h1
        className={clsx(
          "text-[#232323] dark:text-[white] text-base font-semibold"
        )}
      >
        {dictionaries.title}
      </h1>
    </div>
  );
};

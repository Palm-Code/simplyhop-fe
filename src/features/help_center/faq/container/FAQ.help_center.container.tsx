"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../i18n";
import { HeaderHelpCenter } from "@/core/components/header_help_center";
import { TabFAQHelpCenter } from "../fragments/tab";

export const FAQHelpCenterContainer = () => {
  const dictionaries = getDictionaries();
  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-center content-center justify-start justify-items-start gap-[1.5rem]",
        "w-full",
        'px-[1rem]'
      )}
    >
      <HeaderHelpCenter title={dictionaries.title} />
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
          "w-full"
        )}
      >
        {dictionaries.pre.map((preItem, preIndex) => (
          <p
            key={preIndex}
            className={clsx("text-[#5B5B5B] dark:text-[#C3C3C3] text-[0.875rem] font-normal")}
          >
            {preItem}
          </p>
        ))}
      </div>
      <TabFAQHelpCenter />
    </div>
  );
};

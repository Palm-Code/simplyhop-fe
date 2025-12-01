"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { LegalItemHelpCenterSupport } from "../../components/legal_item";

export const LegalHelpCenterSupport = () => {
  const dictionaries = getDictionaries();

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full",
        "px-[1.5rem] py-[1.5rem]",
        "border border-[#D3E7CE] dark:border-[#464646]",
        "rounded-[1.25rem]",
        'bg-white dark:bg-[#232323]'
      )}
    >
      <h2 className={clsx("text-[#232323] dark:text-white text-[1.5rem] font-bold")}>
        {dictionaries.user_block.title}
      </h2>
      {dictionaries.user_block.items.map((item, itemIndex) => {
        const { cta, ...otherItem } = item;
        return (
          <LegalItemHelpCenterSupport
            {...otherItem}
            key={itemIndex}
            cta={{
              children: cta.children,
              href: cta.href,
            }}
          />
        );
      })}
    </div>
  );
};

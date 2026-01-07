import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import Link from "next/link";

export const ContactApp = () => {
  const dictionaries = getDictionaries();
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full",
        "px-[1.5rem] py-[1.5rem]",
        "rounded-[1.25rem]",
        "border border-[#D3E7CE] dark:border-[#464646]"
      )}
    >
      <h2 className={clsx("text-[#292929] dark:text-white text-[1rem] font-medium")}>
        {dictionaries.contact.message}
      </h2>
      <p className={clsx("text-[#606060] dark:text-[#C3C3C3] text-[0.875rem] font-normal")}>
        {dictionaries.contact.description}
      </p>
      <Link
        href={dictionaries.contact.cta.contact.href}
        target="_blank"
        className={clsx(
          "flex items-center justify-center",
          "px-[1.5rem] py-[1rem]",
          "rounded-[0.375rem]",
          "border border-[#249124] dark:border-[#33CC33]",
          "text-[#249124] dark:text-[#33CC33] text-[0.875rem] font-medium"
        )}
      >
        {dictionaries.contact.cta.contact.children}
      </Link>
    </div>
  );
};

"use client";
import * as React from "react";
import clsx from "clsx";
import { Breadcrumb } from "@/core/components/breadcrumb";
import { getDictionaries } from "../../i18n";
import { usePathname } from "next/navigation";

export const NavigationDetailDriver = () => {
  const dictionaries = getDictionaries();
  const pathname = usePathname();
  const isDefaultMode = !pathname.includes("organization");
  const items = isDefaultMode
    ? dictionaries.breadcrumb.default.items
    : dictionaries.breadcrumb.organization.items;
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-0",
        "w-full"
      )}
    >
      <Breadcrumb items={items} />
    </div>
  );
};

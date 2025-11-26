"use client";
import * as React from "react";
import clsx from "clsx";
import { Breadcrumb } from "@/core/components/breadcrumb";
import { getDictionaries } from "../../i18n";

export const NavigationRideTrip = () => {
  const dictionaries = getDictionaries();

  const items = dictionaries.breadcrumb.items;

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

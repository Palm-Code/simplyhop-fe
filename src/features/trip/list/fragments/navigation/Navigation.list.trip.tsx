"use client";
import * as React from "react";
import clsx from "clsx";
import { Breadcrumb } from "@/core/components/breadcrumb";
import { getDictionaries } from "../../i18n";
import { useParams } from "next/navigation";

export const NavigationListTrip = () => {
  const dictionaries = getDictionaries();
  const { driver_id } = useParams();
  const isOrganizationTrip = !!driver_id;
  const items = isOrganizationTrip
    ? dictionaries.breadcrumb.organization.items
    : dictionaries.breadcrumb.default.items;
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

"use client";
import * as React from "react";
import clsx from "clsx";
import { Breadcrumb } from "@/core/components/breadcrumb";
import { getDictionaries } from "../../i18n";
import { OrganizationDriverContext } from "../../context";

export const NavigationOrganizationDriver = () => {
  const dictionaries = getDictionaries();
  const { state } = React.useContext(OrganizationDriverContext);
  const items = dictionaries.breadcrumb.items.map((item) => {
    return {
      ...item,
      label: item.label.replaceAll(
        "{{organization_name}}",
        state.profile.data?.organization.name ?? ""
      ),
    };
  });
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

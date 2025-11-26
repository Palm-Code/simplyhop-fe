"use client";
import * as React from "react";
import clsx from "clsx";
import { Breadcrumb } from "@/core/components/breadcrumb";
import { getDictionaries } from "../../i18n";
import { OrganizationTripContext } from "../../context";
import { formatDisplayName } from "@/core/utils/name/functions";
import { useParams } from "next/navigation";

export const NavigationOrganizationTrip = () => {
  const dictionaries = getDictionaries();
  const { organization_id } = useParams();
  const { state } = React.useContext(OrganizationTripContext);

  const items = dictionaries.breadcrumb.items.map((item) => {
    return {
      ...item,
      label: item.label.replaceAll(
        "{{organization_name}}",
        formatDisplayName({
          first_name: state.profile.data?.organization.name,
          email: state.profile.data?.organization.email,
        })
      ),
      href: item.href.replaceAll(
        "{{organization_id}}",
        String(organization_id ?? "")
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

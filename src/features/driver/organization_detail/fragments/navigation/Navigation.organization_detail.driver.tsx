"use client";
import * as React from "react";
import clsx from "clsx";
import { Breadcrumb } from "@/core/components/breadcrumb";
import { getDictionaries } from "../../i18n";
import { OrganizationDetailDriverContext } from "../../context";
import { DetailDriverContext } from "@/features/driver/detail/context";
import { formatDisplayName } from "@/core/utils/name/functions";
import { useParams } from "next/navigation";

export const NavigationOrganizationDetailDriver = () => {
  const dictionaries = getDictionaries();
  const { state } = React.useContext(OrganizationDetailDriverContext);
  const { state: driverDetailState } = React.useContext(DetailDriverContext);
  const { organization_id, driver_id } = useParams();
  const items = dictionaries.breadcrumb.items.map((item) => {
    return {
      ...item,
      href: item.href
        .replaceAll("{{organization_id}}", String(organization_id ?? "0"))
        .replaceAll("{{driver_id}}", String(driver_id ?? "0")),
      label: item.label
        .replaceAll(
          "{{organization_name}}",
          state.profile.data?.organization.name ?? ""
        )
        .replaceAll(
          "{{driver_name}}",
          formatDisplayName({
            first_name: !driverDetailState.user.data?.last_name
              ? driverDetailState.user.data?.first_name
              : `${driverDetailState.user.data.first_name} ${driverDetailState.user.data.last_name}`,
            email: driverDetailState.user.data?.email,
          })
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

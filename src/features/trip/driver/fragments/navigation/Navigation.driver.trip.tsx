"use client";
import * as React from "react";
import clsx from "clsx";
import { Breadcrumb } from "@/core/components/breadcrumb";
import { getDictionaries } from "../../i18n";
import { useParams } from "next/navigation";
import { DriverTripContext } from "../../context";
import { formatDisplayName } from "@/core/utils/name/functions";

export const NavigationDriverTrip = () => {
  const dictionaries = getDictionaries();
  const { driver_id } = useParams();
  const { state } = React.useContext(DriverTripContext);
  const items = dictionaries.breadcrumb.items.map((item) => {
    return {
      ...item,
      label: item.label.replaceAll(
        "{{driver_name}}",
        formatDisplayName({
          first_name: !state.user.data?.last_name
            ? state.user.data?.first_name
            : `${state.user.data.first_name} ${state.user.data.last_name}`,
          email: state.user.data?.email,
        })
      ),
      href: item.href.replaceAll("{{driver_id}}", String(driver_id ?? "")),
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

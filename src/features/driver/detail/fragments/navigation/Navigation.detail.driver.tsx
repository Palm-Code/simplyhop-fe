"use client";
import * as React from "react";
import clsx from "clsx";
import { Breadcrumb } from "@/core/components/breadcrumb";
import { getDictionaries } from "../../i18n";
import { formatDisplayName } from "@/core/utils/name/functions";
import { DetailDriverContext } from "../../context";

export const NavigationDetailDriver = () => {
  const dictionaries = getDictionaries();
  const { state } = React.useContext(DetailDriverContext);
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

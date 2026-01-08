import * as React from "react";
import clsx from "clsx";
import { Breadcrumb } from "@/core/components/breadcrumb";
import { getDictionaries } from "../../i18n";
import { DriverVehicleContext } from "../../context";
import { DetailDriverContext } from "@/features/driver/detail/context";
import { formatDisplayName } from "@/core/utils/name/functions";

export const NavigationDriverVehicle = () => {
  const dictionaries = getDictionaries();
  const { state } = React.useContext(DriverVehicleContext);
  const { state: driverDetailState } = React.useContext(DetailDriverContext);
  const items = dictionaries.breadcrumb.items.map((item) => {
    return {
      ...item,
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

import * as React from "react";
import { RidesCardDashboard } from "../../components/rides_card";
import { getDictionaries } from "../../i18n";
import { SVGIconProps } from "@/core/icons";
import clsx from "clsx";
import { VehiclesCardDashboard } from "../../components/vehicles_card";

export const PersonalSectionsDashboard = () => {
  const dictionaries = getDictionaries();
  return (
    <div
      className={clsx(
        "grid grid-cols-1 lg:grid-cols-2 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <RidesCardDashboard
        title={dictionaries.personal.upcoming_rides.title}
        icon={dictionaries.personal.upcoming_rides.icon as SVGIconProps["name"]}
        cta={dictionaries.personal.upcoming_rides.cta}
      />
      <VehiclesCardDashboard
        title={dictionaries.personal.vehicles.title}
        icon={dictionaries.personal.vehicles.icon as SVGIconProps["name"]}
        cta={dictionaries.personal.vehicles.cta}
      />
    </div>
  );
};

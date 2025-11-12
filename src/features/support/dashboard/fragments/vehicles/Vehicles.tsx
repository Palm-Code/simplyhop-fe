import * as React from "react";
import { getDictionaries } from "../../i18n";
import { SVGIconProps } from "@/core/icons";
import { VehiclesCardDashboard } from "../../components/vehicles_card/VehiclesCard.dashboard";

export const VehiclesDashboard = () => {
  const dictionaries = getDictionaries();
  return (
    <VehiclesCardDashboard
      title={dictionaries.vehicle.title}
      icon={dictionaries.vehicle.icon as SVGIconProps["name"]}
      cta={dictionaries.vehicle.cta}
    />
  );
};

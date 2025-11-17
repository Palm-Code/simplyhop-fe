import { DashboardCard } from "@/core/components/dashboard_card";
import * as React from "react";
import { getDictionaries } from "../../i18n";
import { DetailDriverContext } from "../../context";
import { SVGIconProps } from "@/core/icons";
import { DashboardVehicleCard } from "@/core/components/dashboard_vehicle_card";

export const VehiclesDetailDriver = () => {
  const dictionaries = getDictionaries();
  const { state } = React.useContext(DetailDriverContext);
  return (
    <DashboardCard
      title={dictionaries.vehicles.title}
      icon={dictionaries.vehicles.icon as SVGIconProps["name"]}
      cta={dictionaries.vehicles.cta}
    >
      {state.vehicle?.data?.map((item, index) => {
        return <DashboardVehicleCard {...item} key={index} />;
      })}
    </DashboardCard>
  );
};

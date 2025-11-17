import { SVGIconProps } from "@/core/icons";
import * as React from "react";
import {
  DashboardVehicleCard,
  DashboardVehicleCardProps,
} from "@/core/components/dashboard_vehicle_card";
import { DashboardCard } from "@/core/components/dashboard_card";

export interface VehiclesCardDashboardProps {
  title?: string;
  icon?: SVGIconProps["name"];
  cta?: {
    primary: {
      children: React.ReactNode;
    };
  };
  vehicles?: DashboardVehicleCardProps[];
}

export const VehiclesCardDashboard = ({
  title = "",
  icon,
  cta,
  vehicles,
}: VehiclesCardDashboardProps) => {
  return (
    <DashboardCard title={title} icon={icon} cta={cta}>
      {vehicles?.map((item, index) => {
        return <DashboardVehicleCard {...item} key={index} />;
      })}
    </DashboardCard>
  );
};

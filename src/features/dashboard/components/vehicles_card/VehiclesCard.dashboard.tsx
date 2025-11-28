import { SVGIconProps } from "@/core/icons";
import * as React from "react";
import {
  DashboardVehicleCard,
  DashboardVehicleCardProps,
} from "@/core/components/dashboard_vehicle_card";
import { DashboardCard } from "@/core/components/dashboard_card";
import { LoadingState } from "@/core/components/loading_state";
import {
  VehicleEmptyState,
  VehicleEmptyStateProps,
} from "@/core/components/vehicle_empty_state";

export interface VehiclesCardDashboardProps {
  title?: string;
  icon?: SVGIconProps["name"];
  cta?: {
    primary: {
      children: React.ReactNode;
      href: string;
    };
  };
  vehicles?: DashboardVehicleCardProps[];
  isLoading?: boolean;
  isEmpty?: boolean;
  empty?: VehicleEmptyStateProps;
}

export const VehiclesCardDashboard = ({
  title = "",
  icon,
  cta,
  vehicles,
  isLoading,
  isEmpty,
  empty,
}: VehiclesCardDashboardProps) => {
  if (isLoading) {
    return (
      <DashboardCard title={title} icon={icon} cta={cta} variant="white">
        <LoadingState />
      </DashboardCard>
    );
  }
  if (isEmpty) {
    return (
      <DashboardCard title={title} icon={icon} cta={cta} variant="white">
        <VehicleEmptyState {...empty} />
      </DashboardCard>
    );
  }
  return (
    <DashboardCard title={title} icon={icon} cta={cta}>
      {vehicles?.map((item, index) => {
        return <DashboardVehicleCard {...item} key={index} />;
      })}
    </DashboardCard>
  );
};

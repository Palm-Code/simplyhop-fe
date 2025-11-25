import { SVGIconProps } from "@/core/icons";
import * as React from "react";
import {
  DashboardDriverCard,
  DashboardDriverCardProps,
} from "../../../../core/components/dashboard_driver_card/DashboardDriverCard";
import { DashboardCard } from "@/core/components/dashboard_card";

export interface DriversCardDashboardProps {
  title?: string;
  icon?: SVGIconProps["name"];
  cta?: {
    primary: {
      children: React.ReactNode;
      href: string;
    };
  };
  driver?: DashboardDriverCardProps;
}

export const DriversCardDashboard = ({
  title = "",
  icon,
  cta,
  driver = {
    table: null,
  },
}: DriversCardDashboardProps) => {
  return (
    <DashboardCard title={title} icon={icon} cta={cta}>
      <DashboardDriverCard table={driver.table} />
    </DashboardCard>
  );
};

import { SVGIconProps } from "@/core/icons";
import * as React from "react";
import {
  DashboardDriverCard,
  DashboardDriverCardProps,
} from "../../../../core/components/dashboard_driver_card/DashboardDriverCard";
import { DashboardCard } from "@/core/components/dashboard_card";
import { EmptyState, EmptyStateProps } from "@/core/components/empty_state";

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
  isEmpty?: boolean;
  empty?: EmptyStateProps;
}

export const DriversCardDashboard = ({
  title = "",
  icon,
  cta,
  driver = {
    table: null,
  },
  isEmpty,
  empty,
}: DriversCardDashboardProps) => {
  if (isEmpty) {
    return (
      <DashboardCard title={title} icon={icon} cta={cta} variant={"white"}>
        <EmptyState {...empty} />
      </DashboardCard>
    );
  }
  return (
    <DashboardCard title={title} icon={icon} cta={cta}>
      <DashboardDriverCard table={driver.table} />
    </DashboardCard>
  );
};

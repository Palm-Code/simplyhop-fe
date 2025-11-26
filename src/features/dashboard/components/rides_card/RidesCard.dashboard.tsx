import { SVGIconProps } from "@/core/icons";
import * as React from "react";

import {
  DashboardRideCard,
  DashboardRideCardProps,
} from "@/core/components/dashboard_ride_card";
import { DashboardCard } from "@/core/components/dashboard_card";
import { EmptyState, EmptyStateProps } from "@/core/components/empty_state";

export interface RidesCardDashboardProps {
  title?: string;
  icon?: SVGIconProps["name"];
  cta?: {
    primary: {
      children: React.ReactNode;
      href: string;
    };
  };
  rides?: DashboardRideCardProps[];
  isEmpty?: boolean;
  empty?: EmptyStateProps;
}

export const RidesCardDashboard = ({
  title = "",
  icon,
  cta,
  rides,
  isEmpty,
  empty,
}: RidesCardDashboardProps) => {
  if (isEmpty) {
    return (
      <DashboardCard title={title} icon={icon} cta={cta} variant="white">
        <EmptyState {...empty} />
      </DashboardCard>
    );
  }
  return (
    <DashboardCard title={title} icon={icon} cta={cta}>
      {rides?.map((item, index) => {
        return <DashboardRideCard {...item} key={index} />;
      })}
    </DashboardCard>
  );
};

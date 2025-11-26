import { SVGIconProps } from "@/core/icons";
import * as React from "react";

import {
  DashboardRideCard,
  DashboardRideCardProps,
} from "@/core/components/dashboard_ride_card";
import { DashboardCard } from "@/core/components/dashboard_card";
import { EmptyState, EmptyStateProps } from "@/core/components/empty_state";
import { LoadingState } from "@/core/components/loading_state";

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
  isLoading?: boolean;
  isEmpty?: boolean;
  empty?: EmptyStateProps;
}

export const RidesCardDashboard = ({
  title = "",
  icon,
  cta,
  rides,
  isLoading,
  isEmpty,
  empty,
}: RidesCardDashboardProps) => {
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

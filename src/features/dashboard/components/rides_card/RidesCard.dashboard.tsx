import { SVGIconProps } from "@/core/icons";
import * as React from "react";

import {
  DashboardRideCard,
  DashboardRideCardProps,
} from "@/core/components/dashboard_ride_card";
import { DashboardCard } from "@/core/components/dashboard_card";

export interface RidesCardDashboardProps {
  title?: string;
  icon?: SVGIconProps["name"];
  cta?: {
    primary: {
      children: React.ReactNode;
    };
  };
  rides?: DashboardRideCardProps[];
}

export const RidesCardDashboard = ({
  title = "",
  icon,
  cta,
  rides,
}: RidesCardDashboardProps) => {
  return (
    <DashboardCard title={title} icon={icon} cta={cta}>
      {rides?.map((item, index) => {
        return <DashboardRideCard {...item} key={index} />;
      })}
    </DashboardCard>
  );
};

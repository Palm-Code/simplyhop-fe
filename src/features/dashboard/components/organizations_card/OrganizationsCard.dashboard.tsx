import { SVGIconProps } from "@/core/icons";
import * as React from "react";
import {
  OrganizationCardDashboard,
  OrganizationCardDashboardProps,
} from "../organization_card";
import { DashboardCard } from "@/core/components/dashboard_card";

export interface OrganizationsCardDashboardProps {
  title?: string;
  icon?: SVGIconProps["name"];
  cta?: {
    primary: {
      children: React.ReactNode;
    };
  };
  organization?: OrganizationCardDashboardProps;
}

export const OrganizationsCardDashboard = ({
  title = "",
  icon,
  cta,
  organization = {
    table: null,
  },
}: OrganizationsCardDashboardProps) => {
  return (
    <DashboardCard title={title} icon={icon} cta={cta}>
      <OrganizationCardDashboard table={organization.table} />
    </DashboardCard>
  );
};

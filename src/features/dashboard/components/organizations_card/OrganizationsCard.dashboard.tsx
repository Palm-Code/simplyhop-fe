import { SVGIconProps } from "@/core/icons";
import * as React from "react";
import {
  OrganizationCardDashboard,
  OrganizationCardDashboardProps,
} from "../organization_card";
import { DashboardCard } from "@/core/components/dashboard_card";
import { EmptyState, EmptyStateProps } from "@/core/components/empty_state";

export interface OrganizationsCardDashboardProps {
  title?: string;
  icon?: SVGIconProps["name"];
  cta?: {
    primary: {
      children: React.ReactNode;
      href: string;
    };
  };
  organization?: OrganizationCardDashboardProps;
  isEmpty?: boolean;
  empty?: EmptyStateProps;
}

export const OrganizationsCardDashboard = ({
  title = "",
  icon,
  cta,
  organization = {
    table: null,
  },
  isEmpty,
  empty,
}: OrganizationsCardDashboardProps) => {
  if (isEmpty) {
    return (
      <DashboardCard title={title} icon={icon} cta={cta} variant="white">
        <EmptyState {...empty} />
      </DashboardCard>
    );
  }
  return (
    <DashboardCard title={title} icon={icon} cta={cta}>
      <OrganizationCardDashboard table={organization.table} />
    </DashboardCard>
  );
};

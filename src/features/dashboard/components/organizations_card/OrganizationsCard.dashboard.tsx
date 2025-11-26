import { SVGIconProps } from "@/core/icons";
import * as React from "react";
import {
  OrganizationCardDashboard,
  OrganizationCardDashboardProps,
} from "../organization_card";
import { DashboardCard } from "@/core/components/dashboard_card";
import { EmptyState, EmptyStateProps } from "@/core/components/empty_state";
import { LoadingState } from "@/core/components/loading_state";

export interface OrganizationsCardDashboardProps {
  title?: string;
  icon?: SVGIconProps["name"];
  cta?: {
    primary: {
      children: React.ReactNode;
      href: string;
    };
  };
  isLoading?: boolean;
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
  isLoading,
  isEmpty,
  empty,
}: OrganizationsCardDashboardProps) => {
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
      <OrganizationCardDashboard table={organization.table} />
    </DashboardCard>
  );
};

"use client";
import * as React from "react";
import clsx from "clsx";
import { SummaryDashboard } from "../fragments/summary/Summary.dashboard";
import { UserContext } from "@/core/modules/app/context";
import { PersonalSectionsDashboard } from "../fragments/personal_sections";
import { OrganizationalAdminSectionsDashboard } from "../fragments/organizational_admin_sections";
import {
  useGetDashboardMy,
  useGetDashboardOrganizationSummary,
  useGetDashboardSuperAdminSummary,
  useGetRidesSearch,
  useGetVehicleMy,
  useGetDashboardOrganization,
  useGetDashboardSuperAdmin,
  useGetDashboardSuperAdminPerOrganization,
} from "../react_query/hooks";
import { SuperAdminSectionsDashboard } from "../fragments/super_admin_sections";

export const DashboardSupportContainer = () => {
  const { state } = React.useContext(UserContext);
  useGetDashboardMy();
  useGetDashboardOrganizationSummary();
  useGetDashboardSuperAdminSummary();
  useGetRidesSearch();
  useGetVehicleMy();
  useGetDashboardOrganization();
  useGetDashboardSuperAdmin();
  useGetDashboardSuperAdminPerOrganization();

  if (state.profile?.is_super_admin) {
    return (
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        <SummaryDashboard />
        <SuperAdminSectionsDashboard />
      </div>
    );
  }
  if (state.profile?.role === "admin") {
    return (
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        <SummaryDashboard />
        <OrganizationalAdminSectionsDashboard />
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <SummaryDashboard />
      <PersonalSectionsDashboard />
    </div>
  );
};

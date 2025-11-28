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
  useGetBookingList,
} from "../react_query/hooks";
import { SuperAdminSectionsDashboard } from "../fragments/super_admin_sections";
import { NavigationDashboard } from "../fragments/navigation";
import { HeaderDashboard } from "../fragments/header";

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
  useGetBookingList();

  if (state.profile?.is_super_admin) {
    return (
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        <HeaderDashboard />
        <NavigationDashboard />
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
        <HeaderDashboard />
        <NavigationDashboard />
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
      <HeaderDashboard />
      <NavigationDashboard />
      <SummaryDashboard />
      <PersonalSectionsDashboard />
    </div>
  );
};

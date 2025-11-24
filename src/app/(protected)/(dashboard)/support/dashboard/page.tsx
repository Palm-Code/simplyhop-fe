"use client";
import { UserContext } from "@/core/modules/app/context";
import { AlertApp } from "@/core/modules/app/fragments/alert";
import DashboardLayout from "@/core/modules/app/layout/dashboard/Dashboard.layout";
import EmployeeSettingsLayout from "@/core/modules/app/layout/employee_settings/EmployeeSettings.layout";
import { DashboardSupportContainer } from "@/features/dashboard/container/Dashboard.container";
import { DashboardSupportProvider } from "@/features/dashboard/context";
import { useContext } from "react";

export default function DashboardPage() {
  const { state: userState } = useContext(UserContext);
  if (userState.profile?.role === "employee") {
    return (
      <EmployeeSettingsLayout>
        <DashboardSupportProvider>
          <DashboardSupportContainer />
          <AlertApp />
        </DashboardSupportProvider>
      </EmployeeSettingsLayout>
    );
  }
  if (userState.profile?.role === "admin") {
    return (
      <DashboardLayout>
        <DashboardSupportProvider>
          <DashboardSupportContainer />
          <AlertApp />
        </DashboardSupportProvider>
      </DashboardLayout>
    );
  }
  return null;
}

"use client";
import { LoadingPage } from "@/core/components/loading_page";
import { UserContext } from "@/core/modules/app/context";
import { AlertApp } from "@/core/modules/app/fragments/alert";
import DashboardLayout from "@/core/modules/app/layout/dashboard/Dashboard.layout";
import { DetailDriverContainer } from "@/features/driver/detail/container/Detail.driver.container";
import { DetailDriverProvider } from "@/features/driver/detail/context";
import { notFound } from "next/navigation";
import { useContext } from "react";

export default function DriverPage() {
  const { state: userState } = useContext(UserContext);
  const isOrganizationAdmin =
    userState.profile?.role === "admin" && !userState.profile.is_super_admin;
  const isEmployee = userState.profile?.role === "employee";

  // Show loading screen while profile is loading
  if (!userState.profile || isEmployee) {
    return <LoadingPage />;
  }

  if (isOrganizationAdmin) {
    notFound();
  }
  return (
    <DashboardLayout>
      <DetailDriverProvider>
        <DetailDriverContainer />
        <AlertApp />
      </DetailDriverProvider>
    </DashboardLayout>
  );
}

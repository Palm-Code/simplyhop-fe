"use client";
import { UserContext } from "@/core/modules/app/context";
import { AlertApp } from "@/core/modules/app/fragments/alert";
import DashboardLayout from "@/core/modules/app/layout/dashboard/Dashboard.layout";
import { ListDriverContainer } from "@/features/driver/list/container/List.driver.container";
import { ListDriverProvider } from "@/features/driver/list/context";
import { LoadingPage } from "@/core/components/loading_page";
import { notFound } from "next/navigation";
import { useContext } from "react";

export default function DriverPage() {
  const { state: userState } = useContext(UserContext);
  const isOrganizationAdmin =
    userState.profile?.role === "admin" && !userState.profile.is_super_admin;
  const isEmployee = userState.profile?.role === "employee";

  // Show loading screen while profile is loading
  if (!userState.profile) {
    return <LoadingPage />;
  }

  if (isOrganizationAdmin || isEmployee) {
    notFound();
  }

  return (
    <DashboardLayout>
      <ListDriverProvider>
        <ListDriverContainer />
        <AlertApp />
      </ListDriverProvider>
    </DashboardLayout>
  );
}

"use client";
import { LoadingPage } from "@/core/components/loading_page";
import { UserContext } from "@/core/modules/app/context";
import { AlertApp } from "@/core/modules/app/fragments/alert";
import DashboardLayout from "@/core/modules/app/layout/dashboard/Dashboard.layout";
import { DetailOrganizationContainer } from "@/features/organization/detail/container/Detail.organization.container";
import { DetailOrganizationProvider } from "@/features/organization/detail/context";
import { notFound } from "next/navigation";
import { useContext } from "react";

export default function OrganizationPage() {
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
      <DetailOrganizationProvider>
        <DetailOrganizationContainer />
        <AlertApp />
      </DetailOrganizationProvider>
    </DashboardLayout>
  );
}

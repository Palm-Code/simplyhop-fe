"use client";
import { LoadingPage } from "@/core/components/loading_page";
import { UserContext } from "@/core/modules/app/context";
import DashboardLayout from "@/core/modules/app/layout/dashboard/Dashboard.layout";
import { OrganizationTripContainer } from "@/features/trip/organization/container";
import { OrganizationTripProvider } from "@/features/trip/organization/context";
import { notFound } from "next/navigation";
import { useContext } from "react";

export default function TripPage() {
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
      <OrganizationTripProvider>
        <OrganizationTripContainer />
      </OrganizationTripProvider>
    </DashboardLayout>
  );
}

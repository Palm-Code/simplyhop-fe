"use client";
import { LoadingPage } from "@/core/components/loading_page";
import { UserContext } from "@/core/modules/app/context";
import DashboardLayout from "@/core/modules/app/layout/dashboard/Dashboard.layout";
import { RideTripContainer } from "@/features/trip/ride/container";
import { notFound } from "next/navigation";
import { useContext } from "react";

export default function TripPage() {
  const { state: userState } = useContext(UserContext);
  const isOrganizationAdmin =
    userState.profile?.role === "admin" && !userState.profile.is_super_admin;

  // Show loading screen while profile is loading
  if (!userState.profile) {
    return <LoadingPage />;
  }

  if (isOrganizationAdmin) {
    notFound();
  }
  return (
    <DashboardLayout>
      <RideTripContainer />
    </DashboardLayout>
  );
}

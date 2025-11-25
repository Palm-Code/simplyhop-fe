"use client";
import { DashboardHeader } from "@/core/components/dashboard_header";
import { UserContext } from "@/core/modules/app/context";
import { AlertApp } from "@/core/modules/app/fragments/alert";
import DashboardLayout from "@/core/modules/app/layout/dashboard/Dashboard.layout";
import { formatDisplayName } from "@/core/utils/name/functions";
import { ListTripContainer } from "@/features/trip/list/container";
import { ListTripProvider } from "@/features/trip/list/context";
import { useContext } from "react";
import clsx from "clsx";

export default function TripPage() {
  const { state: userState } = useContext(UserContext);
  return (
    <DashboardLayout>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        <DashboardHeader
          title={"Fahrten"}
          avatar={{
            src: userState.profile?.avatar,
          }}
          name={formatDisplayName({
            first_name: userState.profile?.first_name,
            email: userState.profile?.email,
          })}
          role={
            userState.profile?.role === "admin" &&
            userState.profile.is_super_admin
              ? "Super Admin"
              : userState.profile?.role === "admin"
              ? "Admin"
              : "Employee"
          }
        />
        <ListTripProvider>
          <ListTripContainer />
          <AlertApp />
        </ListTripProvider>
      </div>
    </DashboardLayout>
  );
}

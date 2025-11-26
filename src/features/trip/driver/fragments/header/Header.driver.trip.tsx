"use client";
import * as React from "react";
import { getDictionaries } from "../../i18n";
import { DashboardHeader } from "@/core/components/dashboard_header";
import { formatDisplayName } from "@/core/utils/name/functions";
import { UserContext } from "@/core/modules/app/context";
import { DriverTripContext } from "../../context";

export const HeaderDriverTrip = () => {
  const dictionaries = getDictionaries();
  const { state: userState } = React.useContext(UserContext);
  const { state } = React.useContext(DriverTripContext);

  return (
    <DashboardHeader
      title={dictionaries.title.replaceAll(
        "{{driver_name}}",
        formatDisplayName({
          first_name: !state.user.data?.last_name
            ? state.user.data?.first_name
            : `${state.user.data.first_name} ${state.user.data.last_name}`,
          email: state.user.data?.email,
        })
      )}
      avatar={{
        src: userState.profile?.avatar,
      }}
      name={formatDisplayName({
        first_name: userState.profile?.first_name,
        email: userState.profile?.email,
      })}
      role={
        userState.profile?.role === "admin" && userState.profile.is_super_admin
          ? "Super Admin"
          : userState.profile?.role === "admin"
          ? "Admin"
          : "Employee"
      }
    />
  );
};

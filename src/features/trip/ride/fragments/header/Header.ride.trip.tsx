"use client";
import * as React from "react";
import { getDictionaries } from "../../i18n";
import { DashboardHeader } from "@/core/components/dashboard_header";
import { formatDisplayName } from "@/core/utils/name/functions";
import { UserContext } from "@/core/modules/app/context";

export const HeaderRideTrip = () => {
  const dictionaries = getDictionaries();
  const { state: userState } = React.useContext(UserContext);
  return (
    <DashboardHeader
      title={dictionaries.title}
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

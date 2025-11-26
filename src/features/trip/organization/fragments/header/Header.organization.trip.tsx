"use client";
import * as React from "react";
import { getDictionaries } from "../../i18n";
import { DashboardHeader } from "@/core/components/dashboard_header";
import { formatDisplayName } from "@/core/utils/name/functions";
import { UserContext } from "@/core/modules/app/context";
import { OrganizationTripContext } from "../../context";

export const HeaderOrganizationTrip = () => {
  const dictionaries = getDictionaries();
  const { state: userState } = React.useContext(UserContext);
  const { state } = React.useContext(OrganizationTripContext);
  return (
    <DashboardHeader
      title={dictionaries.title.replaceAll(
        "{{organization_name}}",
        formatDisplayName({
          first_name: state.profile.data?.organization.name,
          email: state.profile.data?.organization.email,
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

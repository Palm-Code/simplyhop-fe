import { DashboardHeader } from "@/core/components/dashboard_header";
import * as React from "react";
import { UserContext } from "@/core/modules/app/context";
import { formatDisplayName } from "@/core/utils/name/functions";
import { DetailDriverContext } from "../../context";

export const HeaderDetailDriver = () => {
  const { state } = React.useContext(DetailDriverContext);
  const { state: userState } = React.useContext(UserContext);
  return (
    <DashboardHeader
      title={formatDisplayName({
        first_name: !state.user.data?.last_name
          ? state.user.data?.first_name
          : `${state.user.data.first_name} ${state.user.data.last_name}`,
        email: state.user.data?.email,
      })}
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

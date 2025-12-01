import { DashboardHeader } from "@/core/components/dashboard_header";
import * as React from "react";
import { getDictionaries } from "../../i18n";
import { UserContext } from "@/core/modules/app/context";
import { formatDisplayName } from "@/core/utils/name/functions";
import SettingHeader from "@/core/components/setting_header/SettingHeader";

export const HeaderDashboard = () => {
  const dictionaries = getDictionaries();
  const { state: userState } = React.useContext(UserContext);
  if (userState.profile?.role === "employee") {
    return <SettingHeader title={dictionaries.title} />;
  }
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

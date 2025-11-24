import { DashboardHeader } from "@/core/components/dashboard_header";
import * as React from "react";
import { getDictionaries } from "../../i18n";
import { UserContext } from "@/core/modules/app/context";

export const HeaderDashboard = () => {
  const dictionaries = getDictionaries();
  const { state: userState } = React.useContext(UserContext);
  return (
    <DashboardHeader
      title={dictionaries.title}
      avatar={{
        src: userState.profile?.avatar,
      }}
    />
  );
};

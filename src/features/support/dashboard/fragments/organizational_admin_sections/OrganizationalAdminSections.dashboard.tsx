import * as React from "react";
import { RidesCardDashboard } from "../../components/rides_card";
import { getDictionaries } from "../../i18n";
import { SVGIconProps } from "@/core/icons";
import clsx from "clsx";
import { DashboardSupportContext } from "../../context";
import { DriversCardDashboard } from "../../components/drivers_card";
import { useDriverTableDashboard } from "../../react_table/hooks";

export const OrganizationalAdminSectionsDashboard = () => {
  const dictionaries = getDictionaries();
  const { state } = React.useContext(DashboardSupportContext);
  const driverTable = useDriverTableDashboard();
  return (
    <div
      className={clsx(
        "grid grid-cols-1 lg:grid-cols-2 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <RidesCardDashboard
        title={dictionaries.organizational_admin.upcoming_rides.title}
        icon={
          dictionaries.organizational_admin.upcoming_rides
            .icon as SVGIconProps["name"]
        }
        cta={dictionaries.organizational_admin.upcoming_rides.cta}
        rides={state.sections.organization_admin.ride?.data ?? undefined}
      />
      <DriversCardDashboard
        title={dictionaries.organizational_admin.drivers.title}
        icon={
          dictionaries.organizational_admin.drivers.icon as SVGIconProps["name"]
        }
        cta={dictionaries.organizational_admin.drivers.cta}
        driver={{
          table: driverTable,
        }}
      />
    </div>
  );
};

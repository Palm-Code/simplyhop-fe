import { DashboardCard } from "@/core/components/dashboard_card";
import * as React from "react";
import { getDictionaries } from "../../i18n";
import { SVGIconProps } from "@/core/icons";
import { DashboardDriverCard } from "@/core/components/dashboard_driver_card";
import { useDriverTableOrganization } from "../../react_table/hooks";

export const DriversDetailOrganization = () => {
  const dictionaries = getDictionaries();
  const table = useDriverTableOrganization();
  return (
    <DashboardCard
      title={dictionaries.drivers.title}
      icon={dictionaries.drivers.icon as SVGIconProps["name"]}
      cta={dictionaries.drivers.cta}
    >
      <DashboardDriverCard table={table} />
    </DashboardCard>
  );
};

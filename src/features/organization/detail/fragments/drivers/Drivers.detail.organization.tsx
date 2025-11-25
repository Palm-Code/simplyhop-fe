import { DashboardCard } from "@/core/components/dashboard_card";
import * as React from "react";
import { getDictionaries } from "../../i18n";
import { SVGIconProps } from "@/core/icons";
import { DashboardDriverCard } from "@/core/components/dashboard_driver_card";
import { useDriverTableOrganization } from "../../react_table/hooks";
import { useParams } from "next/navigation";

export const DriversDetailOrganization = () => {
  const { organization_id } = useParams();
  const dictionaries = getDictionaries();
  const table = useDriverTableOrganization();
  return (
    <DashboardCard
      title={dictionaries.drivers.title}
      icon={dictionaries.drivers.icon as SVGIconProps["name"]}
      cta={{
        ...dictionaries.drivers.cta,
        primary: {
          ...dictionaries.drivers.cta.primary,
          href: dictionaries.drivers.cta.primary.href.replaceAll(
            "{{organization_id}}",
            String(organization_id)
          ),
        },
      }}
    >
      <DashboardDriverCard table={table} />
    </DashboardCard>
  );
};

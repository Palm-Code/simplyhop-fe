import * as React from "react";
import { getDictionaries } from "../../i18n";
import { SVGIconProps } from "@/core/icons";
import clsx from "clsx";
import { OrganizationsCardDashboard } from "../../components/organizations_card";
import { DriversCardDashboard } from "../../components/drivers_card";
import {
  useDriverTableDashboard,
  useOrganizationTableDashboard,
} from "../../react_table/hooks";

export const SuperAdminSectionsDashboard = () => {
  const dictionaries = getDictionaries();
  const driverTable = useDriverTableDashboard();
  const organizationTable = useOrganizationTableDashboard();
  return (
    <div
      className={clsx(
        "grid grid-cols-1 lg:grid-cols-2 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <OrganizationsCardDashboard
        title={dictionaries.super_admin.organizations.title}
        icon={
          dictionaries.super_admin.organizations.icon as SVGIconProps["name"]
        }
        cta={dictionaries.super_admin.organizations.cta}
        organization={{
          table: organizationTable,
        }}
      />
      <DriversCardDashboard
        title={dictionaries.super_admin.drivers.title}
        icon={dictionaries.super_admin.drivers.icon as SVGIconProps["name"]}
        cta={dictionaries.super_admin.drivers.cta}
        driver={{
          table: driverTable,
        }}
      />
    </div>
  );
};

import { DashboardCard } from "@/core/components/dashboard_card";
import * as React from "react";
import { getDictionaries } from "../../i18n";
import { DetailDriverContext } from "../../context";
import { SVGIconProps } from "@/core/icons";
import { DashboardVehicleCard } from "@/core/components/dashboard_vehicle_card";
import { useParams } from "next/navigation";

export const VehiclesDetailDriver = () => {
  const dictionaries = getDictionaries();
  const { state } = React.useContext(DetailDriverContext);
  const { organization_id, driver_id } = useParams();
  return (
    <DashboardCard
      title={dictionaries.vehicles.title}
      icon={dictionaries.vehicles.icon as SVGIconProps["name"]}
      cta={{
        ...dictionaries.vehicles.cta,
        primary: {
          ...dictionaries.vehicles.cta.primary,
          href: dictionaries.vehicles.cta.primary.href
            .replaceAll("{{organization_id}}", String(organization_id))
            .replaceAll("{{driver_id}}", String(driver_id)),
        },
      }}
    >
      {state.vehicle?.data?.map((item, index) => {
        return (
          <DashboardVehicleCard
            {...item}
            cta={{
              ...dictionaries.vehicles.cta.primary,
              href: dictionaries.vehicles.cta.primary.href
                .replaceAll("{{organization_id}}", String(organization_id))
                .replaceAll("{{driver_id}}", String(driver_id)),
            }}
            key={index}
          />
        );
      })}
    </DashboardCard>
  );
};

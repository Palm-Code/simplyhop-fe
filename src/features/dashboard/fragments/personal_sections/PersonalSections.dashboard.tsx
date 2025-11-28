import * as React from "react";
import { RidesCardDashboard } from "../../components/rides_card";
import { getDictionaries } from "../../i18n";
import { SVGIconProps } from "@/core/icons";
import clsx from "clsx";
import { VehiclesCardDashboard } from "../../components/vehicles_card";
import { DashboardSupportContext } from "../../context";
import { useRouter } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants";

export const PersonalSectionsDashboard = () => {
  const dictionaries = getDictionaries();
  const { state } = React.useContext(DashboardSupportContext);
  const router = useRouter();

  const handleClickCreateVehicle = () => {
    router.push(AppCollectionURL.private.support_vehicles());
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-1 lg:grid-cols-2 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <RidesCardDashboard
        title={dictionaries.personal.upcoming_rides.title}
        icon={dictionaries.personal.upcoming_rides.icon as SVGIconProps["name"]}
        cta={dictionaries.personal.upcoming_rides.cta}
        rides={state.sections.personal.ride?.data ?? undefined}
        isLoading={state.sections.personal.ride.loading.is_fetching}
        isEmpty={!state.sections.personal.ride.data?.length}
        empty={dictionaries.personal.upcoming_rides.empty}
      />
      <VehiclesCardDashboard
        title={dictionaries.personal.vehicles.title}
        icon={dictionaries.personal.vehicles.icon as SVGIconProps["name"]}
        cta={dictionaries.personal.vehicles.cta}
        vehicles={state.sections.personal.vehicle?.data ?? []}
        isLoading={state.sections.personal.vehicle.loading.is_fetching}
        isEmpty={!state.sections.personal.vehicle.data?.length}
        empty={{
          ...dictionaries.personal.vehicles.empty,
          cta: {
            ...dictionaries.personal.vehicles.empty.cta,
            onClick: handleClickCreateVehicle,
          },
        }}
      />
    </div>
  );
};

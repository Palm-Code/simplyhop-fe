import * as React from "react";
import { getDictionaries } from "../../i18n";
import { DashboardCard } from "@/core/components/dashboard_card";
import { ListTripProvider } from "@/features/trip/list/context";
import { ListTripContainer } from "@/features/trip/list/container";
import { AlertApp } from "@/core/modules/app/fragments/alert";
import { SVGIconProps } from "@/core/icons";

export const TripDetailDriver = () => {
  const dictionaries = getDictionaries();
  return (
    <DashboardCard
      title={dictionaries.trip.title}
      icon={dictionaries.trip.icon as SVGIconProps["name"]}
      cta={dictionaries.trip.cta}
      variant="white"
    >
      <ListTripProvider>
        <ListTripContainer />
        <AlertApp />
      </ListTripProvider>
    </DashboardCard>
  );
};

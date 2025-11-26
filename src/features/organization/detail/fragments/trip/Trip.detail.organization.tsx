"use client";
import { DashboardCard } from "@/core/components/dashboard_card";
import * as React from "react";
import { getDictionaries } from "../../i18n";
import { SVGIconProps } from "@/core/icons";
import { ListTripProvider } from "@/features/trip/list/context";
import { AlertApp } from "@/core/modules/app/fragments/alert";
import { RideFilterListTrip } from "@/features/trip/list/fragments/ride_filter";
import { RideSectionListTrip } from "@/features/trip/list/fragments/ride_section";
import { useParams } from "next/navigation";

export const TripDetailOrganization = () => {
  const dictionaries = getDictionaries();
  const { organization_id } = useParams();
  return (
    <DashboardCard
      title={dictionaries.trip.title}
      icon={dictionaries.trip.icon as SVGIconProps["name"]}
      cta={{
        ...dictionaries.trip.cta,
        primary: {
          ...dictionaries.trip.cta.primary,
          href: dictionaries.trip.cta.primary.href.replaceAll(
            "{{organization_id}}",
            String(organization_id ?? "")
          ),
        },
      }}
      variant="white"
    >
      <ListTripProvider>
        <RideFilterListTrip />
        <RideSectionListTrip />
        <AlertApp />
      </ListTripProvider>
    </DashboardCard>
  );
};

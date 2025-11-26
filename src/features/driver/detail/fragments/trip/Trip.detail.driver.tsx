"use client";
import * as React from "react";
import { getDictionaries } from "../../i18n";
import { DashboardCard } from "@/core/components/dashboard_card";
import { ListTripProvider } from "@/features/trip/list/context";
import { AlertApp } from "@/core/modules/app/fragments/alert";
import { SVGIconProps } from "@/core/icons";
import { TabListTrip } from "@/features/trip/list/fragments/tab";
import { RideFilterListTrip } from "@/features/trip/list/fragments/ride_filter";
import { SectionListTrip } from "@/features/trip/list/fragments/section";
import { useParams } from "next/navigation";

export const TripDetailDriver = () => {
  const dictionaries = getDictionaries();
  const { driver_id } = useParams();

  return (
    <DashboardCard
      title={dictionaries.trip.title}
      icon={dictionaries.trip.icon as SVGIconProps["name"]}
      cta={{
        ...dictionaries.trip.cta,
        primary: {
          ...dictionaries.trip.cta.primary,
          href: dictionaries.trip.cta.primary.href.replaceAll(
            "{{driver_id}}",
            String(driver_id ?? "")
          ),
        },
      }}
      variant="white"
    >
      <ListTripProvider>
        <TabListTrip />
        <RideFilterListTrip />
        <SectionListTrip />
        <AlertApp />
      </ListTripProvider>
    </DashboardCard>
  );
};

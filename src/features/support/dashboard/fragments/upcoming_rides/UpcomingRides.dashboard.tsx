import * as React from "react";
import { RidesCardDashboard } from "../../components/rides_card";
import { getDictionaries } from "../../i18n";
import { SVGIconProps } from "@/core/icons";

export const UpcomingRidesDashboard = () => {
  const dictionaries = getDictionaries();
  return (
    <RidesCardDashboard
      title={dictionaries.upcoming_journey.title}
      icon={dictionaries.upcoming_journey.icon as SVGIconProps["name"]}
      cta={dictionaries.upcoming_journey.cta}
    />
  );
};

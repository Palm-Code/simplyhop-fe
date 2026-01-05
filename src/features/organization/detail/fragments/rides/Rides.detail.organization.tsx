import { DashboardCard } from "@/core/components/dashboard_card";
import * as React from "react";
import { getDictionaries } from "../../i18n";
import { DetailOrganizationContext } from "../../context";
import { SVGIconProps } from "@/core/icons";
import { DashboardRideCard } from "@/core/components/dashboard_ride_card";
import { useParams } from "next/navigation";

export const RidesDetailOrganization = () => {
  const { organization_id } = useParams();
  const dictionaries = getDictionaries();
  const { state } = React.useContext(DetailOrganizationContext);
  return (
    <DashboardCard
      title={dictionaries.upcoming_rides.title}
      icon={dictionaries.upcoming_rides.icon as SVGIconProps["name"]}
      cta={{
        ...dictionaries.upcoming_rides.cta,
        primary: {
          ...dictionaries.upcoming_rides.cta.primary,
          href: dictionaries.upcoming_rides.cta.primary.href.replaceAll(
            "{{organization_id}}",
            String(organization_id)
          ),
        },
      }}
    >
      {state.ride?.data?.map((item, index) => {
        return <DashboardRideCard {...item} key={index} />;
      })}
    </DashboardCard>
  );
};

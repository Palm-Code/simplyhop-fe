import { DashboardCard } from "@/core/components/dashboard_card";
import * as React from "react";
import { getDictionaries } from "../../i18n";
import {
  DetailOrganizationActionEnum,
  DetailOrganizationContext,
} from "../../context";
import { SVGIconProps } from "@/core/icons";
import { DashboardRideCard } from "@/core/components/dashboard_ride_card";
import { useParams } from "next/navigation";

export const RidesDetailOrganization = () => {
  const { organization_id } = useParams();
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(DetailOrganizationContext);
  const handleClickShare = (data: { link: string; message: string }) => {
    dispatch({
      type: DetailOrganizationActionEnum.SetShareRideNotificationData,
      payload: {
        ...state.share_ride_notification,
        is_open: true,
        share: {
          ...state.share_ride_notification.share,
          link: data.link,
          message: data.message,
        },
      },
    });
  };
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
        return (
          <DashboardRideCard
            {...item}
            key={index}
            cta={{
              ...item.cta,
              share: {
                ...item.cta?.share,
                message: item.cta?.share.message ?? "",
                href: item.cta?.share.href ?? "",
                onClick: () =>
                  handleClickShare({
                    link: item.cta?.share?.href ?? "",
                    message: item.cta?.share?.message ?? "",
                  }),
              },
            }}
          />
        );
      })}
    </DashboardCard>
  );
};

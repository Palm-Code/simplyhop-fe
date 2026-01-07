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
import { LoadingState } from "@/core/components/loading_state";
import { EmptyState } from "@/core/components/empty_state";

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
  const isLoading = state.ride.loading.is_fetching;
  const isEmpty = !state.ride.data?.length;
  const empty = dictionaries.upcoming_rides.empty;
  if (isLoading) {
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
        <LoadingState />
      </DashboardCard>
    );
  }
  if (isEmpty) {
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
        <EmptyState {...empty} />
      </DashboardCard>
    );
  }
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

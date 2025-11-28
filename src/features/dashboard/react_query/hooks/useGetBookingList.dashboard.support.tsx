import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardSupportReactQueryKey } from "../keys";

import {
  DashboardSupportActionEnum,
  DashboardSupportContext,
} from "../../context";

import { fetchGetBookingList } from "@/core/services/rest/simplyhop/booking";
import {
  GetBookingListErrorResponseInterface,
  GetBookingListPayloadRequestInterface,
  GetBookingListSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/booking";
import { useSearchParams } from "next/navigation";
import { setArrivalTime, setDurationTime } from "@/core/utils/time/functions";
import dayjs from "dayjs";
import { UserContext } from "@/core/modules/app/context";
import { formatDisplayName } from "@/core/utils/name/functions";
import { ThemeContext } from "@/core/modules/app/context/theme/Theme.context";
import { getDictionaries } from "../../i18n";
import { ENVIRONMENTS } from "@/core/environments";

export const useGetBookingList = () => {
  const dictionaries = getDictionaries();
  const { state: userState } = React.useContext(UserContext);
  const searchParams = useSearchParams();
  const rideStatus = searchParams.get("ride-status");
  const { state, dispatch } = React.useContext(DashboardSupportContext);
  const { isDarkMode } = React.useContext(ThemeContext);

  const isPassengerEmployee =
    userState.profile?.is_driver === false &&
    userState.profile.role === "employee";

  const payload: GetBookingListPayloadRequestInterface = {
    params: {
      include: "ride.vehicle.brand,user,ride.user",
      ride_status: rideStatus ?? "in_progress",
      "filter[status]": "accepted",
      "filter[user_id]": !userState.profile?.id
        ? undefined
        : String(userState.profile.id),
      "page[number]": 1,
      "page[size]": 1,
    },
  };
  const query = useQuery<
    GetBookingListSuccessResponseInterface,
    GetBookingListErrorResponseInterface
  >({
    queryKey: DashboardSupportReactQueryKey.GetBookingList(payload),
    queryFn: () => {
      return fetchGetBookingList(payload);
    },
    enabled: isPassengerEmployee,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      const newPayload = data.data.map((item) => {
        const urlSearchParams = new URLSearchParams(searchParams.toString());
        urlSearchParams.append("ride_id", String(item.id));
        const shareMessage =
          dictionaries.personal.upcoming_rides.share_ride_notification.share.share_message
            .replaceAll(
              "{{origin}}",
              !item.ride?.start_name ? "-" : item.ride?.start_name
            )
            .replaceAll(
              "{{destination}}",
              !item.ride?.destination_name ? "-" : item.ride?.destination_name
            )
            .replaceAll(
              "{{departure_time}}",
              !item.ride?.departure_time
                ? "-"
                : `${dayjs
                    .utc(item.ride?.departure_time)
                    .format("DD.MM.YYYY HH.mm [Uhr]")}`
            )
            .replaceAll(
              "{{share_link}}",
              !item.ride?.url ? ENVIRONMENTS.SITE_URL : item.ride?.url
            );
        return {
          id: String(item.id),
          driver: {
            profile: {
              avatar: !item.ride?.user?.avatar
                ? undefined
                : {
                    src: item.ride?.user.avatar,
                    alt: "photo_profile",
                  },
              name: formatDisplayName({
                first_name: item.ride?.user?.first_name,
                email: item.ride?.user?.email,
              }),
            },
          },
          car: {
            image: {
              src: !item.ride?.vehicle?.image.length
                ? "/images/general/car.png"
                : item.ride?.vehicle?.image[0] ?? "/images/general/car.png",
              alt: "car",
              width: 145,
              height: 46,
            },
            identity: {
              name: !item.ride?.vehicle?.brand?.title
                ? item.ride?.vehicle?.model ?? ""
                : !item.ride?.vehicle?.model
                ? item.ride?.vehicle.brand?.title ?? ""
                : `${item.ride?.vehicle.brand?.title} ${item.ride?.vehicle.model}`,
              number: item.ride?.vehicle?.plate_license,
            },
          },

          routes: {
            date: {
              label: "Datum",
              date: !item.ride?.departure_time
                ? "-"
                : dayjs.utc(item.ride?.departure_time).format("DD.MM.YY"),
            },
            startTime: {
              label: "Startzeit",
              time: !item.ride?.departure_time
                ? "-"
                : dayjs.utc(item.ride?.departure_time).format("HH.mm [Uhr]"),
            },
            departure: {
              place: !item.ride?.start_name ? "-" : item.ride?.start_name,
              time: !item.ride?.departure_time
                ? "-"
                : dayjs.utc(item.ride?.departure_time).format("HH.mm [Uhr]"),
            },
            travelTime: {
              time: !item.ride?.eta ? "-" : setDurationTime(item.ride?.eta),
            },
            arrival: {
              place: !item.ride?.destination_name
                ? "-"
                : item.ride?.destination_name,
              time: !item.ride?.eta
                ? "-"
                : `${setArrivalTime(
                    dayjs.utc(item.ride?.departure_time).format("HH:mm"),
                    item.ride?.eta
                  )} Uhr`,
            },
            passenger: {
              label: "Passengiere",
              adult: item.seats.toLocaleString("de-DE"),
              child: item.child_seats.toLocaleString("de-DE"),
            },
          },

          cta: {
            share: {
              onClick: () => {},
              href: !item.ride?.url ? ENVIRONMENTS.SITE_URL : item.ride?.url,
              message: shareMessage,
            },
          },
        };
      });
      if (isPassengerEmployee) {
        dispatch({
          type: DashboardSupportActionEnum.SetSectionsPersonalRideData,
          payload: newPayload,
        });
      }
    }
  }, [query.data, query.isFetching, isDarkMode]);

  React.useEffect(() => {
    if (isPassengerEmployee) {
      dispatch({
        type: DashboardSupportActionEnum.SetSectionsPersonalRideLoadingData,
        payload: {
          ...state.sections.personal.ride.loading,
          is_fetching: query.isFetching,
        },
      });
    }
  }, [query.isFetching]);
  return query;
};

import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  DetailOrganizationContext,
  DetailOrganizationActionEnum,
} from "../../context";

import { fetchGetRidesSearch } from "@/core/services/rest/simplyhop/rides";
import {
  GetRidesSearchErrorResponseInterface,
  GetRidesSearchPayloadRequestInterface,
  GetRidesSearchSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/rides";
import { useParams, useSearchParams } from "next/navigation";
import { setArrivalTime, setDurationTime } from "@/core/utils/time/functions";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { formatDisplayName } from "@/core/utils/name/functions";
import { ENVIRONMENTS } from "@/core/environments";
import { getDictionaries } from "../../i18n";
import { DetailOrganizationReactQueryKey } from "../keys";

dayjs.extend(utc);

export const useGetRidesSearch = () => {
  const searchParams = useSearchParams();
  const dictionaries = getDictionaries();
  const { organization_id } = useParams();
  const { state, dispatch } = React.useContext(DetailOrganizationContext);

  const payload: GetRidesSearchPayloadRequestInterface = {
    params: {
      "filter[organization_id]": String(organization_id ?? "0"),
      include: "vehicle.brand,user,bookings,bookings.user",
      status: "upcoming",
      departure_time__gte: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"), // "2025-03-31 09:30:00";
      "page[number]": 1,
      "page[size]": 3,
    },
  };
  const query = useQuery<
    GetRidesSearchSuccessResponseInterface,
    GetRidesSearchErrorResponseInterface
  >({
    queryKey: DetailOrganizationReactQueryKey.GetRidesSearch(payload),
    queryFn: () => {
      return fetchGetRidesSearch(payload);
    },
    enabled: !!organization_id,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      const newPayload = data.data.map((item) => {
        const urlSearchParams = new URLSearchParams(searchParams.toString());
        urlSearchParams.append("ride_id", String(item.id));
        const shareMessage =
          dictionaries.upcoming_rides.share_ride_notification.share.share_message
            .replaceAll("{{origin}}", !item.start_name ? "-" : item.start_name)
            .replaceAll(
              "{{destination}}",
              !item.destination_name ? "-" : item.destination_name
            )
            .replaceAll(
              "{{departure_time}}",
              !item.departure_time
                ? "-"
                : `${dayjs
                    .utc(item.departure_time)
                    .format("DD.MM.YYYY HH.mm [Uhr]")}`
            )
            .replaceAll(
              "{{share_link}}",
              !item.url ? ENVIRONMENTS.SITE_URL : item.url
            );
        return {
          id: String(item.id),
          driver: {
            profile: {
              avatar: !item.user.avatar
                ? undefined
                : {
                    src: item.user.avatar,
                    alt: "photo_profile",
                  },
              name: formatDisplayName({
                first_name: item.user.first_name,
                email: item.user.email,
              }),
            },
          },
          car: {
            image: {
              src: !item.vehicle.image.length
                ? "/images/general/car.png"
                : item.vehicle.image[0] ?? "/images/general/car.png",
              alt: "car",
              width: 145,
              height: 46,
            },
            identity: {
              name: !item.vehicle.brand?.title
                ? item.vehicle.model ?? ""
                : !item.vehicle.model
                ? item.vehicle.brand?.title ?? ""
                : `${item.vehicle.brand?.title} ${item.vehicle.model}`,
              number: item.vehicle.plate_license,
            },
          },

          routes: {
            date: {
              label: "Datum",
              date: !item.departure_time
                ? "-"
                : dayjs.utc(item.departure_time).format("DD.MM.YY"),
            },
            startTime: {
              label: "Startzeit",
              time: !item.departure_time
                ? "-"
                : dayjs.utc(item.departure_time).format("HH.mm [Uhr]"),
            },
            departure: {
              place: !item.start_name ? "-" : item.start_name,
              time: !item.departure_time
                ? "-"
                : dayjs.utc(item.departure_time).format("HH.mm [Uhr]"),
            },
            travelTime: {
              time: !item.eta ? "-" : setDurationTime(item.eta),
            },
            arrival: {
              place: !item.destination_name ? "-" : item.destination_name,
              time: !item.eta
                ? "-"
                : `${setArrivalTime(
                    dayjs.utc(item.departure_time).format("HH:mm"),
                    item.eta
                  )} Uhr`,
            },
            passenger: {
              label: "Passengiere",
              adult: item.bookings
                .filter((bookingItem) => bookingItem.status === "accepted")
                .reduce((acc, bookingItem) => {
                  return acc + bookingItem.seats;
                }, 0)
                .toLocaleString("de-DE"),
              child: item.bookings
                .filter((bookingItem) => bookingItem.status === "accepted")
                .reduce((acc, bookingItem) => {
                  return acc + bookingItem.child_seats;
                }, 0)
                .toLocaleString("de-DE"),
            },
          },

          cta: {
            share: {
              onClick: () => {},
              href: !item.url ? ENVIRONMENTS.SITE_URL : item.url,
              message: shareMessage,
            },
          },
        };
      });
      dispatch({
        type: DetailOrganizationActionEnum.SetRideDataData,
        payload: newPayload,
      });
    }
  }, [query.data, query.isFetching]);

  React.useEffect(() => {
    dispatch({
      type: DetailOrganizationActionEnum.SetRideLoadingData,
      payload: {
        ...state.ride.loading,
        is_fetching: query.isFetching,
      },
    });
  }, [query.isFetching]);
  return query;
};

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ListTripReactQueryKey } from "../keys";

import { ListTripActionEnum, ListTripContext } from "../../context";

import { fetchGetRidesSearch } from "@/core/services/rest/simplyhop/rides";
import {
  GetRidesSearchErrorResponseInterface,
  GetRidesSearchPayloadRequestInterface,
  GetRidesSearchSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/rides";
import { useSearchParams } from "next/navigation";
import { setArrivalTime, setDurationTime } from "@/core/utils/time/functions";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { AppCollectionURL } from "@/core/utils/router/constants";
import { UserContext } from "@/core/modules/app/context";
import { PAGINATION } from "@/core/utils/pagination/contants";
import { formatEuro } from "@/core/utils/currency/functions";
import { formatDisplayName } from "@/core/utils/name/functions";
import { ENVIRONMENTS } from "@/core/environments";
import { getDictionaries } from "../../i18n";

dayjs.extend(utc);

export const useGetRidesSearch = () => {
  const searchParams = useSearchParams();
  const dictionaries = getDictionaries();
  const type = searchParams.get("type");
  const rideStatus = searchParams.get("ride-status");
  const { state, dispatch } = React.useContext(ListTripContext);
  const { state: userState } = React.useContext(UserContext);

  const payload: GetRidesSearchPayloadRequestInterface = {
    params: {
      "filter[user_id]": !userState.profile?.id
        ? undefined
        : String(userState.profile.id),
      include: "vehicle.brand,user,bookings,bookings.user",
      status: rideStatus ?? "in_progress",
      sort: "departure_time",
      "page[number]": state.ride.pagination.current,
      "page[size]": PAGINATION.SIZE,
    },
  };
  const query = useQuery<
    GetRidesSearchSuccessResponseInterface,
    GetRidesSearchErrorResponseInterface
  >({
    queryKey: ListTripReactQueryKey.GetRidesSearch(payload),
    queryFn: () => {
      return fetchGetRidesSearch(payload);
    },
    enabled: !type && !!userState.profile?.id && userState.profile.is_driver,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      const newPayload = data.data.map((item) => {
        const urlSearchParams = new URLSearchParams(searchParams.toString());
        urlSearchParams.append("ride_id", String(item.id));
        const shareMessage =
          dictionaries.share_ride_notification.share.share_message
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
          },

          price: {
            initial: {
              label: "Preis",
              price: formatEuro(item.base_price),
            },
          },
          cta: {
            detail: {
              children: "Siehe Details",
              href: AppCollectionURL.private.myList(urlSearchParams.toString()),
            },
            share: {
              onClick: () => {},
              href: !item.url ? ENVIRONMENTS.SITE_URL : item.url,
              message: shareMessage,
            },
          },
        };
      });
      dispatch({
        type: ListTripActionEnum.SetRideDataData,
        payload:
          state.ride.pagination.current === 1
            ? [...newPayload]
            : !newPayload.length
            ? state.ride.data
            : [...state.ride.data, ...newPayload],
      });
      dispatch({
        type: ListTripActionEnum.SetRideDataPaginationLast,
        payload: data.meta.last_page,
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};

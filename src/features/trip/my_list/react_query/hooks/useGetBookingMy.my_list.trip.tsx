import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { MyListTripReactQueryKey } from "../keys";

import { MyListTripActionEnum, MyListTripContext } from "../../context";

import { fetchGetBookingMy } from "@/core/services/rest/simplyhop/booking";
import {
  GetBookingMyErrorResponseInterface,
  GetBookingMyPayloadRequestInterface,
  GetBookingMySuccessResponseInterface,
} from "@/core/models/rest/simplyhop/booking";
import { useSearchParams } from "next/navigation";
import { setArrivalTime, setDurationTime } from "@/core/utils/time/functions";
import dayjs from "dayjs";
import { AppCollectionURL } from "@/core/utils/router/constants";
import { UserContext } from "@/core/modules/app/context";
import { PAGINATION } from "@/core/utils/pagination/contants";
import { formatEuro } from "@/core/utils/currency/functions";
import { formatDisplayName } from "@/core/utils/name/functions";

export const useGetBookingMy = () => {
  const { state: userState } = React.useContext(UserContext);
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const { state, dispatch } = React.useContext(MyListTripContext);

  const payload: GetBookingMyPayloadRequestInterface = {
    params: {
      include: "ride.vehicle.brand,user,ride.user",
      "filter[ride.departure_time__gte]": dayjs()
        .startOf("day")
        .format("YYYY-MM-DDTHH:mm:ss"),
      "filter[status]": "accepted",
      "page[number]": state.book.pagination.current,
      "page[size]": PAGINATION.SIZE,
    },
  };
  const query = useQuery<
    GetBookingMySuccessResponseInterface,
    GetBookingMyErrorResponseInterface
  >({
    queryKey: MyListTripReactQueryKey.GetBookingMy(payload),
    queryFn: () => {
      return fetchGetBookingMy(payload);
    },
    enabled:
      type === "book" || (userState.profile?.is_driver === false && !type),
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      const newPayload = data.data.map((item) => {
        const urlSearchParams = new URLSearchParams(searchParams.toString());
        urlSearchParams.append("booking_id", String(item.id));
        return {
          id: String(item.id),
          driver: {
            profile: {
              avatar: !item.user?.avatar
                ? undefined
                : {
                    src: item.ride?.user?.avatar,
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
                : item.ride.vehicle.image[0] ?? "/images/general/car.png",
              alt: "car",
              width: 145,
              height: 46,
            },
            identity: {
              name: !item.ride?.vehicle?.brand?.title
                ? item.ride?.vehicle?.model ?? ""
                : !item.ride?.vehicle.model
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
                : dayjs(item.ride?.departure_time).format("DD.MM.YY"),
            },
            startTime: {
              label: "Startzeit",
              time: !item.ride?.departure_time
                ? "-"
                : dayjs(item.ride?.departure_time).format("HH.mm [Uhr]"),
            },
            departure: {
              place: !item.ride?.start_name ? "-" : item.ride?.start_name,
              time: !item.ride?.departure_time
                ? "-"
                : dayjs(item.ride?.departure_time).format("HH.mm [Uhr]"),
            },
            travelTime: {
              time: !item.ride?.eta ? "-" : setDurationTime(item.ride.eta),
            },
            arrival: {
              place: !item.ride?.destination_name
                ? "-"
                : item.ride.destination_name,
              time:
                !item.ride?.eta || !item.ride.departure_time
                  ? "-"
                  : `${setArrivalTime(
                      dayjs(item.ride?.departure_time).format("HH:mm"),
                      item.ride.eta
                    )} Uhr`,
            },
          },

          price: {
            initial: {
              label: "Preis",
              price: formatEuro(item.ride?.base_price),
            },
          },
          cta: {
            detail: {
              children: "Details ansehen",
              href: AppCollectionURL.private.myList(urlSearchParams.toString()),
            },
          },
        };
      });
      dispatch({
        type: MyListTripActionEnum.SetBookDataData,
        payload:
          state.book.pagination.current === 1
            ? [...newPayload]
            : !newPayload.length
            ? state.book.data
            : [...state.book.data, ...newPayload],
      });
      dispatch({
        type: MyListTripActionEnum.SetBookDataPaginationLast,
        payload: data.meta.last_page,
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};

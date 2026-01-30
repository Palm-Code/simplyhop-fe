import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ArchiveTripReactQueryKey } from "../keys";

import { ArchiveTripActionEnum, ArchiveTripContext } from "../../context";

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

dayjs.extend(utc);

export const useGetRidesSearch = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const { state, dispatch } = React.useContext(ArchiveTripContext);
  const { state: userState } = React.useContext(UserContext);

  const payload: GetRidesSearchPayloadRequestInterface = {
    params: {
      "filter[user_id]": !userState.profile?.id
        ? undefined
        : String(userState.profile.id),
      include: "vehicle.brand,user,bookings,bookings.user",
      departure_time__lte: dayjs()
        .add(1, "day")
        .startOf("day")
        .format("YYYY-MM-DDTHH:mm:ss"),
      sort: "-departure_time",
      "page[number]": state.ride.pagination.current,
      "page[size]": PAGINATION.SIZE,
    },
  };
  const query = useQuery<
    GetRidesSearchSuccessResponseInterface,
    GetRidesSearchErrorResponseInterface
  >({
    queryKey: ArchiveTripReactQueryKey.GetRidesSearch(payload),
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
              children: "Details ansehen",
              href: AppCollectionURL.private.myListArchive(
                urlSearchParams.toString()
              ),
            },
          },
        };
      });

      dispatch({
        type: ArchiveTripActionEnum.SetRideDataData,
        payload:
          state.ride.pagination.current === 1
            ? [...newPayload]
            : !newPayload.length
            ? state.ride.data
            : [...state.ride.data, ...newPayload],
      });
      dispatch({
        type: ArchiveTripActionEnum.SetRideDataPaginationLast,
        payload: data.meta.last_page,
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};

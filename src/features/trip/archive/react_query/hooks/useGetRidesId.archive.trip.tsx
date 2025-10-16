import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ArchiveTripReactQueryKey } from "../keys";

import { ArchiveTripContext, ArchiveTripActionEnum } from "../../context";

import { fetchGetRidesId } from "@/core/services/rest/simplyhop/rides";
import {
  GetRidesIdErrorResponseInterface,
  GetRidesIdPayloadRequestInterface,
  GetRidesIdSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/rides";
import { useSearchParams } from "next/navigation";
import { setArrivalTime, setDurationTime } from "@/core/utils/time/functions";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { AppCollectionURL } from "@/core/utils/router/constants";
import { formatEuro } from "@/core/utils/currency/functions";
import { formatDisplayName } from "@/core/utils/name/functions";

dayjs.extend(utc);

export const useGetRidesId = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const { state, dispatch } = React.useContext(ArchiveTripContext);
  const id = searchParams.get("ride_id");

  const payload: GetRidesIdPayloadRequestInterface = {
    path: {
      id: !id ? 0 : Number(String(id)),
    },
    params: {
      include: "vehicle.brand,user,bookings,bookings.user",
      booking_status: "accepted",
    },
  };
  const query = useQuery<
    GetRidesIdSuccessResponseInterface,
    GetRidesIdErrorResponseInterface
  >({
    queryKey: ArchiveTripReactQueryKey.GetRidesId(payload),
    queryFn: () => {
      return fetchGetRidesId(payload);
    },
    enabled: !type && !!id,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      const item = data.data;
      const urlSearchParams = new URLSearchParams(searchParams.toString());
      urlSearchParams.append("ride_id", String(item.id));
      dispatch({
        type: ArchiveTripActionEnum.SetRideDetailData,
        payload: {
          ...state.ride_detail,
          data: {
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
                href: AppCollectionURL.private.myList(
                  urlSearchParams.toString()
                ),
              },
            },

            booking: item.bookings.map((bookingItem, index) => {
              return {
                booking: {
                  id: bookingItem.id,
                  number: String(index + 1),
                  name: formatDisplayName({
                    first_name: bookingItem.user?.first_name,
                    email: bookingItem.user?.email,
                  }),
                },
                route: {
                  origin: !item.start_name ? "-" : item.start_name,
                  destination: !item.destination_name
                    ? "-"
                    : item.destination_name,
                },
                passenger: {
                  adult: (
                    bookingItem.seats - bookingItem.child_seats
                  ).toLocaleString("de-DE"),
                  children: bookingItem.child_seats.toLocaleString("de-DE"),
                },
                price: {
                  value: formatEuro(bookingItem.total_amount),
                },
              };
            }),
          },
        },
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};

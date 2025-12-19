import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ListTripReactQueryKey } from "../keys";

import { ListTripActionEnum, ListTripContext } from "../../context";

import { fetchGetBookingList } from "@/core/services/rest/simplyhop/booking";
import {
  GetBookingListErrorResponseInterface,
  GetBookingListPayloadRequestInterface,
  GetBookingListSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/booking";
import { useSearchParams } from "next/navigation";
import { setArrivalTime, setDurationTime } from "@/core/utils/time/functions";
import dayjs from "dayjs";
import { AppCollectionURL } from "@/core/utils/router/constants";
import { UserContext } from "@/core/modules/app/context";
import { PAGINATION } from "@/core/utils/pagination/contants";
import { formatEuro } from "@/core/utils/currency/functions";
import { formatDisplayName } from "@/core/utils/name/functions";
import { ThemeContext } from "@/core/modules/app/context/theme/Theme.context";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { SVGIconProps } from "@/core/icons";
import { formatDriverLabel } from "@/core/utils/driver/functions";
import { getDictionaries } from "../../i18n";
import { ENVIRONMENTS } from "@/core/environments";

export const useGetBookingList = () => {
  const globalDictionaries = getGlobalDictionaries();
  const dictionaries = getDictionaries();
  const { state: userState } = React.useContext(UserContext);
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const rideStatus = searchParams.get("ride-status");
  const { state, dispatch } = React.useContext(ListTripContext);
  const { isDarkMode } = React.useContext(ThemeContext);

  const payload: GetBookingListPayloadRequestInterface = {
    params: {
      include: "ride.vehicle.brand,user,ride.user",
      ride_status: rideStatus ?? "in_progress",
      "filter[status]": "accepted",
      "filter[user_id]": !userState.profile?.id
        ? undefined
        : String(userState.profile.id),
      "page[number]": state.book.pagination.current,
      "page[size]": PAGINATION.SIZE,
    },
  };
  const query = useQuery<
    GetBookingListSuccessResponseInterface,
    GetBookingListErrorResponseInterface
  >({
    queryKey: ListTripReactQueryKey.GetBookingList(payload),
    queryFn: () => {
      return fetchGetBookingList(payload);
    },
    enabled:
      (type === "book" || (userState.profile?.is_driver === false && !type)) &&
      !!userState.profile?.id,
  });

  // Reset pagination when rideStatus or type changes
  React.useEffect(() => {
    dispatch({
      type: ListTripActionEnum.SetBookDataPaginationCurrent,
      payload: PAGINATION.NUMBER,
    });
    dispatch({
      type: ListTripActionEnum.SetBookDataData,
      payload: [],
    });
  }, [rideStatus, type]);

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      const newPayload = data.data.map((item) => {
        const urlSearchParams = new URLSearchParams(searchParams.toString());
        urlSearchParams.append("booking_id", String(item.id));
        const shareMessage =
          dictionaries.share_ride_notification.share.share_message
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
            facility: {
              top: [
                ...(!!item.ride?.available_seats
                  ? [
                      {
                        ...globalDictionaries.vehicle.seat.available,
                        icon: {
                          ...globalDictionaries.vehicle.seat.available.icon,
                          name: globalDictionaries.vehicle.seat.available.icon
                            .name as SVGIconProps["name"],
                          color: isDarkMode
                            ? globalDictionaries.vehicle.seat.available.icon
                                .darkColor
                            : globalDictionaries.vehicle.seat.available.icon
                                .color,
                        },
                        name: {
                          ...globalDictionaries.vehicle.seat.available.name,
                          label: !item.ride?.maxtwo_backseat
                            ? globalDictionaries.vehicle.seat.available.name.label
                                .replaceAll(
                                  "{{number}}",
                                  item.ride?.available_seats.toLocaleString(
                                    "de-DE"
                                  )
                                )
                                .replaceAll("(Max. 2 auf der Rückbank)", "")
                            : globalDictionaries.vehicle.seat.available.name.label.replaceAll(
                                "{{number}}",
                                item.ride?.available_seats.toLocaleString(
                                  "de-DE"
                                )
                              ),
                          color: isDarkMode
                            ? globalDictionaries.vehicle.seat.available.name
                                .darkColor
                            : globalDictionaries.vehicle.seat.available.name
                                .color,
                        },
                      },
                    ]
                  : [
                      {
                        ...globalDictionaries.vehicle.seat.empty,
                        icon: {
                          ...globalDictionaries.vehicle.seat.empty.icon,
                          name: globalDictionaries.vehicle.seat.empty.icon
                            .name as SVGIconProps["name"],
                        },
                      },
                    ]),
                ...(!!item.ride?.vehicle?.numb_of_luggages
                  ? [
                      {
                        ...globalDictionaries.vehicle.luggage.available,
                        icon: {
                          ...globalDictionaries.vehicle.luggage.available.icon,
                          name: globalDictionaries.vehicle.luggage.available
                            .icon.name as SVGIconProps["name"],
                          color: isDarkMode
                            ? globalDictionaries.vehicle.luggage.available.icon
                                .darkColor
                            : globalDictionaries.vehicle.luggage.available.icon
                                .color,
                        },
                        name: {
                          ...globalDictionaries.vehicle.luggage.available.name,
                          label:
                            globalDictionaries.vehicle.luggage.available.name
                              .label,
                          color: isDarkMode
                            ? globalDictionaries.vehicle.luggage.available.name
                                .darkColor
                            : globalDictionaries.vehicle.luggage.available.name
                                .color,
                        },
                      },
                    ]
                  : [
                      {
                        ...globalDictionaries.vehicle.luggage.empty,
                        icon: {
                          ...globalDictionaries.vehicle.luggage.empty.icon,
                          name: globalDictionaries.vehicle.luggage.empty.icon
                            .name as SVGIconProps["name"],
                        },
                      },
                    ]),
              ],
              bottom: [
                // Smoking
                ...(!!item.ride?.vehicle?.smoke_allowed
                  ? [
                      {
                        ...globalDictionaries.vehicle.smoking.allowed,
                        icon: {
                          ...globalDictionaries.vehicle.smoking.allowed.icon,
                          name: globalDictionaries.vehicle.smoking.allowed.icon
                            .name as SVGIconProps["name"],
                          color: isDarkMode
                            ? globalDictionaries.vehicle.smoking.allowed.icon
                                .darkColor
                            : globalDictionaries.vehicle.smoking.allowed.icon
                                .color,
                        },
                        name: {
                          ...globalDictionaries.vehicle.smoking.allowed.name,
                          color: isDarkMode
                            ? globalDictionaries.vehicle.smoking.allowed.name
                                .darkColor
                            : globalDictionaries.vehicle.smoking.allowed.name
                                .color,
                        },
                      },
                    ]
                  : [
                      {
                        ...globalDictionaries.vehicle.smoking.prohibited,
                        icon: {
                          ...globalDictionaries.vehicle.smoking.prohibited.icon,
                          name: globalDictionaries.vehicle.smoking.prohibited
                            .icon.name as SVGIconProps["name"],
                        },
                      },
                    ]),

                // Music
                ...(!!item.ride?.vehicle?.music_availability
                  ? [
                      {
                        ...globalDictionaries.vehicle.music.allowed,
                        icon: {
                          ...globalDictionaries.vehicle.music.allowed.icon,
                          name: globalDictionaries.vehicle.music.allowed.icon
                            .name as SVGIconProps["name"],
                          color: isDarkMode
                            ? globalDictionaries.vehicle.music.allowed.icon
                                .darkColor
                            : globalDictionaries.vehicle.music.allowed.icon
                                .color,
                        },
                        name: {
                          ...globalDictionaries.vehicle.music.allowed.name,
                          color: isDarkMode
                            ? globalDictionaries.vehicle.music.allowed.name
                                .darkColor
                            : globalDictionaries.vehicle.music.allowed.name
                                .color,
                        },
                      },
                    ]
                  : [
                      {
                        ...globalDictionaries.vehicle.music.prohibited,
                        icon: {
                          ...globalDictionaries.vehicle.music.prohibited.icon,
                          name: globalDictionaries.vehicle.music.prohibited.icon
                            .name as SVGIconProps["name"],
                        },
                      },
                    ]),

                // Pet
                ...(!!item.ride?.vehicle?.pet_allowed
                  ? [
                      {
                        ...globalDictionaries.vehicle.pets.allowed,
                        icon: {
                          ...globalDictionaries.vehicle.pets.allowed.icon,
                          name: globalDictionaries.vehicle.pets.allowed.icon
                            .name as SVGIconProps["name"],
                          color: isDarkMode
                            ? globalDictionaries.vehicle.pets.allowed.icon
                                .darkColor
                            : globalDictionaries.vehicle.pets.allowed.icon
                                .color,
                        },
                        name: {
                          ...globalDictionaries.vehicle.pets.allowed.name,
                          color: isDarkMode
                            ? globalDictionaries.vehicle.pets.allowed.name
                                .darkColor
                            : globalDictionaries.vehicle.pets.allowed.name
                                .color,
                        },
                      },
                    ]
                  : [
                      {
                        ...globalDictionaries.vehicle.pets.prohibited,
                        icon: {
                          ...globalDictionaries.vehicle.pets.prohibited.icon,
                          name: globalDictionaries.vehicle.pets.prohibited.icon
                            .name as SVGIconProps["name"],
                        },
                      },
                    ]),
              ],
            },
          },

          routes: {
            date: !rideStatus
              ? undefined
              : {
                  label: !item.ride?.departure_time
                    ? "-"
                    : dayjs
                        .utc(item.ride.departure_time)
                        .format("dddd")
                        .replace(/^\w/, (c) => c.toUpperCase()),
                  date: !item.ride?.departure_time
                    ? "-"
                    : dayjs.utc(item.ride.departure_time).format("DD.MM.YY"),
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
            umWeg: {
              label: globalDictionaries.vehicle.umweg.label.text.replaceAll(
                "{{number}}",
                !item.ride?.waiting_time ? "0" : item.ride?.waiting_time
              ),
              icon: {
                ...globalDictionaries.vehicle.umweg.label.icon,
                name: globalDictionaries.vehicle.umweg.label.icon
                  .name as SVGIconProps["name"],
                color: isDarkMode
                  ? globalDictionaries.vehicle.umweg.label.icon.darkColor
                  : globalDictionaries.vehicle.umweg.label.icon.color,
              },
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
              price: formatEuro(item.offered_price),
            },
          },
          ride: {
            badge: [
              ...formatDriverLabel(
                globalDictionaries.personal_information.gender.options.items,
                item.user?.gender
              ),
            ],
          },
          cta: {
            detail: {
              children: "Siehe Details",
              href: AppCollectionURL.private.myList(urlSearchParams.toString()),
            },
            share: {
              onClick: () => {},
              href: !item.ride?.url ? ENVIRONMENTS.SITE_URL : item.ride?.url,
              message: shareMessage,
            },
          },
        };
      });
      dispatch({
        type: ListTripActionEnum.SetBookDataData,
        payload:
          state.book.pagination.current === 1
            ? [...newPayload]
            : !newPayload.length
            ? state.book.data
            : [...state.book.data, ...newPayload],
      });
      dispatch({
        type: ListTripActionEnum.SetBookDataPaginationLast,
        payload: data.meta.last_page,
      });
    }
  }, [query.data, query.isFetching, isDarkMode]);
  return query;
};

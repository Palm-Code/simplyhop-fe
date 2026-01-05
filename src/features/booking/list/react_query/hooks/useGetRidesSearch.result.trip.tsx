import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ResultTripReactQueryKey } from "../keys";

import { ResultTripActionEnum, ResultTripContext } from "../../context";

import { fetchGetRidesSearch } from "@/core/services/rest/simplyhop/rides";
import {
  GetRidesSearchErrorResponseInterface,
  GetRidesSearchSuccessResponseInterface,
  GetRidesSearchPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/rides";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/de";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { SVGIconProps } from "@/core/icons";
import { usePathname, useSearchParams } from "next/navigation";
import { RIDE_FILTER } from "@/core/enums";
import { setArrivalTime, setDurationTime } from "@/core/utils/time/functions";
import { PAGINATION } from "@/core/utils/pagination/contants";
import { formatEuro } from "@/core/utils/currency/functions";
import { formatDriverLabel } from "@/core/utils/driver/functions";
import { formatDisplayName } from "@/core/utils/name/functions";
import { ThemeContext } from "@/core/modules/app/context/theme/Theme.context";

dayjs.extend(utc);
dayjs.locale("de");

export const useGetRideSearch = () => {
  const globalDictionaries = getGlobalDictionaries();
  const { state, dispatch } = React.useContext(ResultTripContext);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const adult = searchParams.get(RIDE_FILTER.ADULT_PASSENGER);
  const children = searchParams.get(RIDE_FILTER.CHILDREN_PASSENGER);
  const { isDarkMode } = React.useContext(ThemeContext);

  const getPrimarySearchDate = () => {
    if (Array.isArray(state.filters.date.selected)) {
      return state.filters.date.selected.length > 0
        ? state.filters.date.selected
            .map((item) => dayjs(item).format("YYYY-MM-DD"))
            .join(",")
        : dayjs(new Date()).format("YYYY-MM-DD");
    } else {
      return dayjs(state.filters.date.selected).format("YYYY-MM-DD");
    }
  };

  const fullPath = `${pathname}?${searchParams.toString()}`;
  const payload: GetRidesSearchPayloadRequestInterface = {
    params: {
      start_lat: state.filters.origin.selected.lat_lng?.lat ?? 0,
      start_long: state.filters.origin.selected.lat_lng?.lng ?? 0,
      destination_lat: state.filters.destination.selected.lat_lng?.lat ?? 0,
      destination_long: state.filters.destination.selected.lat_lng?.lng ?? 0,
      departure_dates: getPrimarySearchDate(),
      // departure_date: dayjs(primaryDate).isSame(dayjs(), "day")
      //   ? undefined
      //   : dayjs(primaryDate).format("YYYY-MM-DD"),
      // departure_time__lte: dayjs(primaryDate).isSame(
      //   dayjs(),
      //   "day"
      // )
      //   ? dayjs().endOf("day").format("YYYY-MM-DDTHH:mm:ss")
      //   : undefined,
      // departure_time__gte: dayjs(primaryDate).isSame(
      //   dayjs(),
      //   "day"
      // )
      //   ? dayjs().format("YYYY-MM-DDTHH:mm:ss")
      //   : undefined,
      // start_lat: 52.5200066,
      // start_long: 13.414954,
      // destination_lat: 48.1351253,
      // destination_long: 11.5819804,
      include: "vehicle,user,vehicle.brand,vehicle.category",
      available_seats__gte: String(
        Number(String(adult ?? "0")) + Number(String(children ?? "0"))
      ),
      "filter[luggage_allowed]": !state.advanced_filter.luggage.selected.length
        ? undefined
        : state.advanced_filter.luggage.selected.length === 1
        ? state.advanced_filter.luggage.selected[0].id === "true"
        : undefined,
      music_availability: !state.advanced_filter.music.selected.length
        ? undefined
        : state.advanced_filter.music.selected.length === 1
        ? state.advanced_filter.music.selected[0].id === "true"
        : undefined,
      smoke_allowed: !state.advanced_filter.smoker.selected.length
        ? undefined
        : state.advanced_filter.smoker.selected.length === 1
        ? state.advanced_filter.smoker.selected[0].id === "true"
        : undefined,
      pet_allowed: !state.advanced_filter.pets.selected.length
        ? undefined
        : state.advanced_filter.pets.selected.length === 1
        ? state.advanced_filter.pets.selected[0].id === "true"
        : undefined,
      "filter[user.gender]": !state.advanced_filter.driver_gender.selected
        .length
        ? undefined
        : state.advanced_filter.driver_gender.selected.length === 1
        ? state.advanced_filter.driver_gender.selected[0].id === "undefined"
          ? undefined
          : state.advanced_filter.driver_gender.selected[0].id
        : undefined,
      sort: !state.advanced_filter.sort.selected?.id
        ? "average_distance"
        : state.advanced_filter.sort.selected.id,
      "page[number]": state.rides.pagination.current,
      "page[size]": PAGINATION.SIZE,
      "filter[shift_id]": !state.advanced_filter.shift.selected.length
        ? undefined
        : state.advanced_filter.shift.selected.length === 1
        ? parseInt(state.advanced_filter.shift.selected[0].id)
        : undefined,
    },
  };

  const queryPayload = {
    url: fullPath,
    include: "vehicle,user,vehicle.brand,vehicle.category",
    "filter[luggage_allowed]": !state.advanced_filter.luggage.selected.length
      ? undefined
      : state.advanced_filter.luggage.selected.length === 1
      ? state.advanced_filter.luggage.selected[0].id === "true"
      : undefined,
    music_availability: !state.advanced_filter.music.selected.length
      ? undefined
      : state.advanced_filter.music.selected.length === 1
      ? state.advanced_filter.music.selected[0].id === "true"
      : undefined,
    smoke_allowed: !state.advanced_filter.smoker.selected.length
      ? undefined
      : state.advanced_filter.smoker.selected.length === 1
      ? state.advanced_filter.smoker.selected[0].id === "true"
      : undefined,
    pet_allowed: !state.advanced_filter.pets.selected.length
      ? undefined
      : state.advanced_filter.pets.selected.length === 1
      ? state.advanced_filter.pets.selected[0].id === "true"
      : undefined,
    "filter[user.gender]": !state.advanced_filter.driver_gender.selected.length
      ? undefined
      : state.advanced_filter.driver_gender.selected.length === 1
      ? state.advanced_filter.driver_gender.selected[0].id === "undefined"
        ? undefined
        : state.advanced_filter.driver_gender.selected[0].id
      : undefined,
    sort: !state.advanced_filter.sort.selected?.id
      ? "average_distance"
      : state.advanced_filter.sort.selected.id,
    "page[number]": state.rides.pagination.current,
    "page[size]": PAGINATION.SIZE,
    "filter[shift_id]": !state.advanced_filter.shift.selected.length
      ? undefined
      : state.advanced_filter.shift.selected.length === 1
      ? parseInt(state.advanced_filter.shift.selected[0].id)
      : undefined,
  };

  const query = useQuery<
    GetRidesSearchSuccessResponseInterface,
    GetRidesSearchErrorResponseInterface
  >({
    queryKey: ResultTripReactQueryKey.GetRidesSearch(queryPayload),
    queryFn: () => {
      return fetchGetRidesSearch(payload);
    },
    enabled:
      !!state.filters.origin.selected.lat_lng &&
      !!state.filters.destination.selected.lat_lng,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      const totalPassenger = state.filters.passenger.value.reduce(
        (acc, item) => {
          return acc + item.value;
        },
        0
      );

      const newPayload = data.data.map((item) => {
        return {
          id: String(item.id),
          driver: {
            profile: {
              id: String(item.user.id),
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
            rating: !item.user.average_ride_rating
              ? undefined
              : {
                  label: item.user.average_ride_rating.toLocaleString("de-DE"),
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
            facility: {
              top: [
                ...(!!item.available_seats
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
                          label: !item.maxtwo_backseat
                            ? globalDictionaries.vehicle.seat.available.name.label
                                .replaceAll(
                                  "{{number}}",
                                  item.available_seats.toLocaleString("de-DE")
                                )
                                .replaceAll("(Max. 2 auf der Rückbank)", "")
                            : globalDictionaries.vehicle.seat.available.name.label.replaceAll(
                                "{{number}}",
                                item.available_seats.toLocaleString("de-DE")
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
                ...(!!item.vehicle.numb_of_luggages
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
                ...(!!item.vehicle.smoke_allowed
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
                ...(!!item.vehicle.music_availability
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
                ...(!!item.vehicle.pet_allowed
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
            date: {
              label: !item.departure_time
                ? "-"
                : dayjs
                    .utc(item.departure_time)
                    .format("dddd")
                    .replace(/^\w/, (c) => c.toUpperCase()),
              date: !item.departure_time
                ? "-"
                : dayjs.utc(item.departure_time).format("DD.MM.YY"),
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
            umWeg: {
              label: globalDictionaries.vehicle.umweg.label.text.replaceAll(
                "{{number}}",
                !item.waiting_time ? "0" : item.waiting_time
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
              place: !item.destination_name ? "-" : item.destination_name,
              time:
                !item.eta || !item.departure_time
                  ? "-"
                  : `${setArrivalTime(
                      dayjs.utc(item.departure_time).format("HH:mm"),
                      item.eta
                    )} Uhr`,
            },
          },

          price: {
            initial: {
              price: formatEuro(item.base_price * totalPassenger),
            },
          },
          ride: {
            badge: [
              ...formatDriverLabel(
                globalDictionaries.personal_information.gender.options.items,
                item.user.gender
              ),
            ],
          },
          cta: {
            book: {
              href: `${fullPath}&${RIDE_FILTER.RIDE_ID}=${item.id}`,
              children: "Mitfahren",
            },
          },
        };
      });

      dispatch({
        type: ResultTripActionEnum.SetRidesDataData,
        payload:
          state.rides.pagination.current === 1
            ? [...newPayload]
            : !newPayload.length
            ? state.rides.data
            : [...state.rides.data, ...newPayload],
      });
      dispatch({
        type: ResultTripActionEnum.SetRidesDataPaginationLast,
        payload: data.meta.last_page,
      });
    }
  }, [query.data, query.isFetching, isDarkMode]);
  return query;
};

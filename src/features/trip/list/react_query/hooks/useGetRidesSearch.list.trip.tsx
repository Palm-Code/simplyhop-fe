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
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { setArrivalTime, setDurationTime } from "@/core/utils/time/functions";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/de";
import { UserContext } from "@/core/modules/app/context";
import { PAGINATION } from "@/core/utils/pagination/contants";
import { formatEuro } from "@/core/utils/currency/functions";
import { formatDisplayName } from "@/core/utils/name/functions";
import { ENVIRONMENTS } from "@/core/environments";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { SVGIconProps } from "@/core/icons";
import { ThemeContext } from "@/core/modules/app/context/theme/Theme.context";

dayjs.extend(utc);
dayjs.locale("de");

export const useGetRidesSearch = () => {
  const searchParams = useSearchParams();
  const dictionaries = getDictionaries();
  const globalDictionaries = getGlobalDictionaries();
  const type = searchParams.get("type");
  const rideStatus = searchParams.get("ride-status");
  const pathname = usePathname();
  const { organization_id } = useParams();
  const { driver_id } = useParams();
  const { state, dispatch } = React.useContext(ListTripContext);
  const { state: userState } = React.useContext(UserContext);
  const { isDarkMode } = React.useContext(ThemeContext);

  // const search = searchParams.get("sort");

  const isEmployee = userState.profile?.role === "employee";
  const isOrganizationAdmin =
    userState.profile?.role === "admin" &&
    userState.profile.is_super_admin === false;
  const isSuperAdmin =
    userState.profile?.role === "admin" &&
    userState.profile.is_super_admin === true;
  const isOrganizationDetailRoute =
    pathname.startsWith("/support/organisation/detail") && !!organization_id;
  const isDriverDetailRoute = pathname.startsWith("/support/fahrer/detail");

  const sort =
    searchParams.get("sort") ?? rideStatus === "finished"
      ? "-departure_time"
      : "departure_time";

  const isEnabled = isEmployee
    ? !type && !!userState.profile?.id && userState.profile.is_driver
    : isOrganizationAdmin
    ? !!userState.profile?.organization_id
    : isSuperAdmin
    ? true
    : false;

  const payload: GetRidesSearchPayloadRequestInterface = {
    params: {
      "filter[user_id]":
        !!userState.profile?.id && isEmployee
          ? String(userState.profile.id)
          : !!driver_id
          ? String(driver_id ?? "0")
          : undefined,
      "filter[organization_id]": isOrganizationDetailRoute
        ? String(organization_id ?? "0")
        : isOrganizationAdmin && !!userState.profile?.organization_id
        ? String(userState.profile.organization_id)
        : undefined,
      include: "vehicle.brand,user,bookings,bookings.user",
      status: rideStatus ?? "in_progress",
      sort: sort,
      "page[number]": state.ride.pagination.current,
      "page[size]": isOrganizationDetailRoute
        ? 3
        : isDriverDetailRoute
        ? 3
        : PAGINATION.SIZE,
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
    enabled: isEnabled,
  });

  // Reset pagination when rideStatus or type changes
  React.useEffect(() => {
    dispatch({
      type: ListTripActionEnum.SetRideDataPaginationCurrent,
      payload: PAGINATION.NUMBER,
    });
    dispatch({
      type: ListTripActionEnum.SetRideDataData,
      payload: [],
    });
  }, [rideStatus, type]);

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
            rating: {
              label: item.user.average_ride_rating?.toLocaleString("de-DE"),
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
            facility: isSuperAdmin
              ? {
                  top: [
                    ...(!!item?.available_seats
                      ? [
                          {
                            ...globalDictionaries.vehicle.seat.available,
                            icon: {
                              ...globalDictionaries.vehicle.seat.available.icon,
                              name: globalDictionaries.vehicle.seat.available
                                .icon.name as SVGIconProps["name"],
                              color: isDarkMode
                                ? globalDictionaries.vehicle.seat.available.icon
                                    .darkColor
                                : globalDictionaries.vehicle.seat.available.icon
                                    .color,
                            },
                            name: {
                              ...globalDictionaries.vehicle.seat.available.name,
                              label: !item?.maxtwo_backseat
                                ? globalDictionaries.vehicle.seat.available.name.label
                                    .replaceAll(
                                      "{{number}}",
                                      item?.available_seats.toLocaleString(
                                        "de-DE"
                                      )
                                    )
                                    .replaceAll("(Max. 2 auf der Rückbank)", "")
                                : globalDictionaries.vehicle.seat.available.name.label.replaceAll(
                                    "{{number}}",
                                    item?.available_seats.toLocaleString(
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
                    ...(!!item?.vehicle?.numb_of_luggages
                      ? [
                          {
                            ...globalDictionaries.vehicle.luggage.available,
                            icon: {
                              ...globalDictionaries.vehicle.luggage.available
                                .icon,
                              name: globalDictionaries.vehicle.luggage.available
                                .icon.name as SVGIconProps["name"],
                              color: isDarkMode
                                ? globalDictionaries.vehicle.luggage.available
                                    .icon.darkColor
                                : globalDictionaries.vehicle.luggage.available
                                    .icon.color,
                            },
                            name: {
                              ...globalDictionaries.vehicle.luggage.available
                                .name,
                              label:
                                globalDictionaries.vehicle.luggage.available
                                  .name.label,
                              color: isDarkMode
                                ? globalDictionaries.vehicle.luggage.available
                                    .name.darkColor
                                : globalDictionaries.vehicle.luggage.available
                                    .name.color,
                            },
                          },
                        ]
                      : [
                          {
                            ...globalDictionaries.vehicle.luggage.empty,
                            icon: {
                              ...globalDictionaries.vehicle.luggage.empty.icon,
                              name: globalDictionaries.vehicle.luggage.empty
                                .icon.name as SVGIconProps["name"],
                            },
                          },
                        ]),
                  ],
                  bottom: [
                    // Smoking
                    ...(!!item?.vehicle?.smoke_allowed
                      ? [
                          {
                            ...globalDictionaries.vehicle.smoking.allowed,
                            icon: {
                              ...globalDictionaries.vehicle.smoking.allowed
                                .icon,
                              name: globalDictionaries.vehicle.smoking.allowed
                                .icon.name as SVGIconProps["name"],
                              color: isDarkMode
                                ? globalDictionaries.vehicle.smoking.allowed
                                    .icon.darkColor
                                : globalDictionaries.vehicle.smoking.allowed
                                    .icon.color,
                            },
                            name: {
                              ...globalDictionaries.vehicle.smoking.allowed
                                .name,
                              color: isDarkMode
                                ? globalDictionaries.vehicle.smoking.allowed
                                    .name.darkColor
                                : globalDictionaries.vehicle.smoking.allowed
                                    .name.color,
                            },
                          },
                        ]
                      : [
                          {
                            ...globalDictionaries.vehicle.smoking.prohibited,
                            icon: {
                              ...globalDictionaries.vehicle.smoking.prohibited
                                .icon,
                              name: globalDictionaries.vehicle.smoking
                                .prohibited.icon.name as SVGIconProps["name"],
                            },
                          },
                        ]),

                    // Music
                    ...(!!item?.vehicle?.music_availability
                      ? [
                          {
                            ...globalDictionaries.vehicle.music.allowed,
                            icon: {
                              ...globalDictionaries.vehicle.music.allowed.icon,
                              name: globalDictionaries.vehicle.music.allowed
                                .icon.name as SVGIconProps["name"],
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
                              ...globalDictionaries.vehicle.music.prohibited
                                .icon,
                              name: globalDictionaries.vehicle.music.prohibited
                                .icon.name as SVGIconProps["name"],
                            },
                          },
                        ]),

                    // Pet
                    ...(!!item?.vehicle?.pet_allowed
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
                              ...globalDictionaries.vehicle.pets.prohibited
                                .icon,
                              name: globalDictionaries.vehicle.pets.prohibited
                                .icon.name as SVGIconProps["name"],
                            },
                          },
                        ]),
                  ],
                }
              : undefined,
          },

          routes: {
            date: !rideStatus
              ? undefined
              : {
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

          price:
            userState.profile?.role === "admin"
              ? undefined
              : {
                  initial: {
                    price: formatEuro(item.base_price),
                  },
                },
          cta: {
            detail: {
              children: "Siehe Details",
              href: `${pathname}?${urlSearchParams.toString()}`,
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
  }, [query.data, query.isFetching, isDarkMode]);
  return query;
};

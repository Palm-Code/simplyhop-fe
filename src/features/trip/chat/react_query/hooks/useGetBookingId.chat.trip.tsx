import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ChatTripReactQueryKey } from "../keys";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { ChatTripActionEnum, ChatTripContext } from "../../context";

import { fetchGetBookingId } from "@/core/services/rest/simplyhop/booking";
import {
  GetBookingIdErrorResponseInterface,
  GetBookingIdPayloadRequestInterface,
  GetBookingIdSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/booking";
import { useSearchParams } from "next/navigation";
import { SVGIconProps } from "@/core/icons";
import { setArrivalTime, setDurationTime } from "@/core/utils/time/functions";
import dayjs from "dayjs";

export const useGetBookingId = () => {
  const globalDictionaries = getGlobalDictionaries();
  const searchParams = useSearchParams();

  const { state, dispatch } = React.useContext(ChatTripContext);
  const id = searchParams.get("bookingId");

  const payload: GetBookingIdPayloadRequestInterface = {
    path: {
      id: !id ? "0" : String(id),
    },
    params: {
      include: "ride.vehicle.brand,rideTime,user",
    },
  };
  const query = useQuery<
    GetBookingIdSuccessResponseInterface,
    GetBookingIdErrorResponseInterface
  >({
    queryKey: ChatTripReactQueryKey.GetBookingId(),
    queryFn: () => {
      return fetchGetBookingId(payload);
    },
    enabled: !!id,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: ChatTripActionEnum.SetOfferData,
        payload: {
          ...state.offer,
          price: {
            label: "Angebotspreis",
            price: `€${data.data?.offered_price ?? 0}`,
          },
          passenger: {
            adult: data.data.seats - data.data.child_seats,
            children: data.data.child_seats,
          },
          ride: {
            id: String(data.data.id),
            driver: {
              profile: {
                id: String(data.data.user?.id),
                avatar: !data.data.user?.avatar
                  ? undefined
                  : {
                      src: data.data.user?.avatar,
                      alt: "photo_profile",
                    },
                name: `${data.data.user?.first_name} ${data.data.user?.last_name}`,
              },
            },
            car: {
              image: {
                src: !data.data.ride?.vehicle?.image.length
                  ? "/images/general/car.png"
                  : data.data.ride?.vehicle.image[0] ??
                    "/images/general/car.png",
                alt: "car",
                width: 145,
                height: 46,
              },
              identity: {
                name: `${data.data.ride?.vehicle?.brand?.title} ${data.data.ride?.vehicle?.model}`,
                number: data.data.ride?.vehicle?.plate_license,
              },
              facility: {
                top: [
                  ...(!!data.data.ride_time?.available_seats
                    ? [
                        {
                          ...globalDictionaries.vehicle.seat.available,
                          icon: {
                            ...globalDictionaries.vehicle.seat.available.icon,
                            name: globalDictionaries.vehicle.seat.available.icon
                              .name as SVGIconProps["name"],
                          },
                          name: {
                            ...globalDictionaries.vehicle.seat.available.name,
                            label:
                              globalDictionaries.vehicle.seat.available.name.label.replaceAll(
                                "{{number}}",
                                data.data.ride_time.available_seats.toLocaleString(
                                  "de-DE"
                                )
                              ),
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
                  ...(!!data.data.ride?.vehicle?.numb_of_luggages
                    ? [
                        {
                          ...globalDictionaries.vehicle.luggage.available,
                          icon: {
                            ...globalDictionaries.vehicle.luggage.available
                              .icon,
                            name: globalDictionaries.vehicle.luggage.available
                              .icon.name as SVGIconProps["name"],
                          },
                          name: {
                            ...globalDictionaries.vehicle.luggage.available
                              .name,
                            label:
                              globalDictionaries.vehicle.luggage.available.name
                                .label,
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
                  ...(!!data.data.ride?.vehicle?.smoke_allowed
                    ? [
                        {
                          ...globalDictionaries.vehicle.smoking.allowed,
                          icon: {
                            ...globalDictionaries.vehicle.smoking.allowed.icon,
                            name: globalDictionaries.vehicle.smoking.allowed
                              .icon.name as SVGIconProps["name"],
                          },
                        },
                      ]
                    : [
                        {
                          ...globalDictionaries.vehicle.smoking.prohibited,
                          icon: {
                            ...globalDictionaries.vehicle.smoking.prohibited
                              .icon,
                            name: globalDictionaries.vehicle.smoking.prohibited
                              .icon.name as SVGIconProps["name"],
                          },
                        },
                      ]),

                  // Music
                  ...(!!data.data.ride?.vehicle?.music_availability
                    ? [
                        {
                          ...globalDictionaries.vehicle.music.allowed,
                          icon: {
                            ...globalDictionaries.vehicle.music.allowed.icon,
                            name: globalDictionaries.vehicle.music.allowed.icon
                              .name as SVGIconProps["name"],
                          },
                        },
                      ]
                    : [
                        {
                          ...globalDictionaries.vehicle.music.prohibited,
                          icon: {
                            ...globalDictionaries.vehicle.music.prohibited.icon,
                            name: globalDictionaries.vehicle.music.prohibited
                              .icon.name as SVGIconProps["name"],
                          },
                        },
                      ]),

                  // Pet
                  ...(!!data.data.ride?.vehicle?.pet_allowed
                    ? [
                        {
                          ...globalDictionaries.vehicle.pets.allowed,
                          icon: {
                            ...globalDictionaries.vehicle.pets.allowed.icon,
                            name: globalDictionaries.vehicle.pets.allowed.icon
                              .name as SVGIconProps["name"],
                          },
                        },
                      ]
                    : [
                        {
                          ...globalDictionaries.vehicle.pets.prohibited,
                          icon: {
                            ...globalDictionaries.vehicle.pets.prohibited.icon,
                            name: globalDictionaries.vehicle.pets.prohibited
                              .icon.name as SVGIconProps["name"],
                          },
                        },
                      ]),
                ],
              },
            },

            routes: {
              departure: {
                place: !data.data.ride?.start_name
                  ? "-"
                  : data.data.ride?.start_name,
                time: dayjs(data.data.ride_time?.departure_time).format(
                  "HH.mm [Uhr]"
                ),
              },
              travelTime: {
                time: !data.data.ride?.eta
                  ? "-"
                  : setDurationTime(data.data.ride?.eta),
                waitingTime: !data.data.ride?.waiting_time
                  ? ""
                  : data.data.ride?.waiting_time,
              },
              arrival: {
                place: !data.data.ride?.destination_name
                  ? "-"
                  : data.data.ride?.destination_name,
                time: !data.data.ride?.eta
                  ? "-"
                  : `${setArrivalTime(
                      dayjs(data.data.ride_time?.departure_time).format(
                        "HH:mm"
                      ),
                      data.data.ride?.eta
                    )} Uhr`,
              },
            },

            // price: {
            //   initial: {
            //     label: "Angebotspreis",
            //     price: "",
            //     // price: `€${(data.data.ride?.base_price ?? 0) * totalPassenger}`,
            //   },
            // },
            ride: {
              badge: [
                // ...(index === 0
                //   ? [
                //       {
                //         id: "bester_preis",
                //         label: "Bester Preis",
                //         variant: "success" as "success" | "danger",
                //       },
                //     ]
                //   : []),
                ...(data.data.user?.gender === "female"
                  ? [
                      {
                        id: "fahrerin",
                        label: "Fahrerin (W)",
                        variant: "danger" as "success" | "danger",
                      },
                    ]
                  : []),
                ...(data.data.ride?.maxtwo_backseat
                  ? [
                      {
                        id: "max_two_backseat",
                        label: "Max. 2 auf der Rückbank",
                        variant: "danger" as "danger" | "success",
                      },
                    ]
                  : []),
              ],
            },
            // cta: {
            //   ride: {
            //     href: "",
            //     // href: `${fullPath}&${RIDE_FILTER.RIDE_ID}=${item.id}`,
            //     children: "Mitfahren",
            //   },
            // },
          },
        },
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ChatTripReactQueryKey } from "../keys";

import { ChatTripActionEnum, ChatTripContext } from "../../context";

import { fetchGetMessagesListByRoom } from "@/core/services/rest/simplyhop/messages";
import {
  GetMessagesListByRoomErrorResponseInterface,
  GetMessagesListByRoomPayloadRequestInterface,
  GetMessagesListByRoomSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/messages";
import { useSearchParams } from "next/navigation";
import { UserContext } from "@/core/modules/app/context";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isSameOrToday from "dayjs/plugin/isSameOrAfter";
import "dayjs/locale/de";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { SVGIconProps } from "@/core/icons";
import { setArrivalTime, setDurationTime } from "@/core/utils/time/functions";
import { MessageContent } from "@/core/models/data";
import { formatEuro } from "@/core/utils/currency/functions";
import { formatDisplayName } from "@/core/utils/name/functions";

dayjs.extend(utc);
dayjs.extend(isSameOrToday);
dayjs.locale("de");

function formatChatTime(timestamp: string) {
  const time = dayjs.utc(timestamp).local(); // convert ke local time
  const now = dayjs();

  if (time.isSame(now, "day")) {
    return time.format("h:mm A"); // Contoh: 3:45 PM
  } else {
    return time.format("DD MMM YYYY"); // Contoh: 22 Apr 2025
  }
}

export const useGetMessagesListByRoom = () => {
  const globalDictionaries = getGlobalDictionaries();
  const { state: userState } = React.useContext(UserContext);
  const { state, dispatch } = React.useContext(ChatTripContext);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const messageRoomId = !id ? "0" : String(id);

  const payload: GetMessagesListByRoomPayloadRequestInterface = {
    path: {
      roomId: messageRoomId,
    },
    params: {
      include:
        "booking,bookingCount,bookingExists,booking,booking.ride,booking.ride.vehicle,booking.ride.vehicle.brand,driver,driverCount,driverExists,driver.profile,passenger,passengerCount,passengerExists,passenger.profile",
      sort: "-updated_at",
      "page[number]": state.room.message.pagination.current,
      "page[size]": 100,
    },
  };

  const query = useQuery<
    GetMessagesListByRoomSuccessResponseInterface,
    GetMessagesListByRoomErrorResponseInterface
  >({
    queryKey: ChatTripReactQueryKey.GetMessagesListByRoom({
      ...payload,
      params: {
        ...payload.params,
      },
      counter: state.room.message.pagination.counter,
    }),
    queryFn: () => {
      return fetchGetMessagesListByRoom(payload);
    },
    enabled: !!id,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;

      const rawPayload = data.data.map((item) => {
        const isSenderAsPassenger = userState.profile?.id === item.passenger_id;
        const isPassenger = item.sender_id === item.passenger_id;
        const isSender = userState.profile?.id === item.sender_id;

        const content =
          typeof item.contents === "string"
            ? JSON.parse(item.contents)
            : (item.contents as MessageContent);
        return {
          id: String(id),
          type: content.type,
          updated_at: item.updated_at,
          role: isSender ? "sender" : "recipient",
          booking_role: (isSenderAsPassenger ? "passenger" : "driver") as
            | "passenger"
            | "driver",
          sender_id: String(item.sender_id),
          time: formatChatTime(item.created_at),
          date: dayjs(item.created_at).format("DD.MM.YYYY"),
          name: isPassenger
            ? formatDisplayName({
                first_name: item.passenger?.first_name,
                email: item.passenger?.email,
              })
            : formatDisplayName({
                first_name: item.driver?.first_name,
                email: item.driver?.email,
              }),
          avatar: {
            src: isPassenger ? item.passenger?.avatar : item.driver?.avatar,
            width: 36,
            height: 36,
            alt: isSender ? "sender" : "recipient",
          },
          message: content.message,
          booking: {
            time: dayjs(item.created_at).format("hh:mma"),
            driver: {
              profile: {
                avatar: !item.driver?.avatar
                  ? undefined
                  : {
                      src: item?.driver?.avatar,
                      alt: "photo_profile",
                    },
                name: formatDisplayName({
                  first_name: item.driver?.first_name,
                  email: item.driver?.email,
                }),
              },
            },
            car: {
              image: {
                src: !item.booking?.ride?.vehicle?.image.length
                  ? "/images/general/car.png"
                  : (item.booking.ride?.vehicle.image[0] ??
                    "/images/general/car.png"),
                alt: "car",
                width: 145,
                height: 46,
              },
              identity: {
                name: !item.booking?.ride?.vehicle?.brand?.title
                  ? (item.booking?.ride?.vehicle?.model ?? "")
                  : !item.booking?.ride?.vehicle.model
                    ? (item.booking?.ride?.vehicle.brand?.title ?? "")
                    : `${item.booking?.ride?.vehicle.brand?.title} ${item.booking?.ride?.vehicle.model}`,
                number: item.booking?.ride?.vehicle?.plate_license,
              },
              facility: {
                top: [
                  ...(!!item.booking?.ride?.available_seats
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
                                item.booking.ride.available_seats.toLocaleString(
                                  "de-DE",
                                ),
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
                  ...(!!item.booking?.ride?.vehicle?.numb_of_luggages
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
                  ...(!!item.booking?.ride?.vehicle?.smoke_allowed
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
                  ...(!!item.booking?.ride?.vehicle?.music_availability
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
                  ...(!!item.booking?.ride?.vehicle?.pet_allowed
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
            date: {
              label: "Datum",
              date: !item.booking?.ride?.departure_time
                ? "-"
                : dayjs(item.booking?.ride?.departure_time).format(
                    "DD.MM.YYYY",
                  ),
            },

            routes: {
              departure: {
                place: !item.booking?.ride?.start_name
                  ? "-"
                  : item.booking.ride.start_name,
                time: !item.booking?.ride?.departure_time
                  ? "-"
                  : dayjs(item.booking?.ride?.departure_time).format(
                      "HH.mm [Uhr]",
                    ),
              },
              travelTime: {
                time: !item.booking?.ride?.eta
                  ? "-"
                  : setDurationTime(item.booking.ride.eta),
              },
              arrival: {
                place: !item.booking?.ride?.destination_name
                  ? "-"
                  : item.booking.ride.destination_name,
                time:
                  !item.booking?.ride?.eta || !item.booking.ride?.departure_time
                    ? "-"
                    : `${setArrivalTime(
                        dayjs(item.booking.ride?.departure_time).format(
                          "HH:mm",
                        ),
                        item.booking.ride.eta,
                      )} Uhr`,
              },
            },

            price: {
              initial: {
                label: "Angebotspreis",
                price: formatEuro(item.booking?.ride?.base_price),
              },
              offered: {
                label: "Angebotener Preis",
                price: !item.booking?.offered_price
                  ? "-"
                  : formatEuro(item.booking.offered_price),
              },
            },
            note: {
              label: "Hinweis",
              note: content.message,
            },
          },
          driver: null,
        };
      });
      const newPayload = rawPayload.sort((a, b) => {
        return (
          new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
        );
      });

      dispatch({
        type: ChatTripActionEnum.SetRoomMessageItems,
        payload:
          state.room.message.pagination.current === 1
            ? [...newPayload]
            : !newPayload.length
              ? state.room.message.items
              : [...newPayload, ...state.room.message.items],
      });
      dispatch({
        type: ChatTripActionEnum.SetRoomMessagePaginationLast,
        payload: data.meta.last_page,
      });
      dispatch({
        type: ChatTripActionEnum.SetRoomMessageIsBlocked,
        payload: data.is_blocked,
      });
      dispatch({
        type: ChatTripActionEnum.SetRoomMessageIsRated,
        payload: data.is_rated,
      });
      dispatch({
        type: ChatTripActionEnum.SetRoomMessageRating,
        payload: data.rating,
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};

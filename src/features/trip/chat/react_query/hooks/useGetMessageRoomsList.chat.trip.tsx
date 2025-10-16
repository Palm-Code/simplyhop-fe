import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ChatTripReactQueryKey } from "../keys";

import { ChatTripActionEnum, ChatTripContext } from "../../context";

import { fetchGetMessageRoomsList } from "@/core/services/rest/simplyhop/message_rooms";
import {
  GetMessageRoomsListErrorResponseInterface,
  GetMessageRoomsListPayloadRequestInterface,
  GetMessageRoomsListSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/message_rooms";
import { UserContext } from "@/core/modules/app/context";
import dayjs from "dayjs";
import { PAGINATION } from "@/core/utils/pagination/contants";
import { formatDisplayName } from "@/core/utils/name/functions";

export const useGetMessageRoomsList = () => {
  const { state: userState } = React.useContext(UserContext);
  const { state, dispatch } = React.useContext(ChatTripContext);
  const payload: GetMessageRoomsListPayloadRequestInterface = {
    params: {
      include:
        "messages,passenger,driver,driverExists,passengerExists,messagesExists,booking",
      "filter[passenger_id]":
        state.list.tab.selected?.id === "passenger"
          ? userState.profile?.id ?? undefined
          : undefined,
      "filter[driver_id]":
        state.list.tab.selected?.id === "driver"
          ? userState.profile?.id ?? undefined
          : undefined,
      search: !state.list.search.value.length
        ? undefined
        : state.list.search.value,
      sort: "-last_message_at",
      "page[number]": state.list.message.pagination.current,
      "page[size]": PAGINATION.SIZE,
    },
  };
  const query = useQuery<
    GetMessageRoomsListSuccessResponseInterface,
    GetMessageRoomsListErrorResponseInterface
  >({
    queryKey: ChatTripReactQueryKey.GetMessageRoomsList(payload),
    queryFn: () => {
      return fetchGetMessageRoomsList(payload);
    },
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;

      const newPayload = data.data.map((item) => {
        const isPassenger = userState.profile?.id === item.passenger_id;
        const lastMessage = item.messages?.find(
          (_, index) => index === (item.messages?.length ?? 1) - 1
        );

        const lastMessageObject: { [key: string]: string } = !lastMessage
          ? {}
          : typeof lastMessage.contents === "string"
          ? JSON.parse(lastMessage.contents)
          : lastMessage.contents;
        const displayMessage =
          item.booking?.status === "rejected"
            ? "Deine Buchung wurde abgelehnt"
            : !Object.keys(lastMessageObject).length
            ? ""
            : lastMessageObject?.type !== "text"
            ? lastMessageObject.text
            : lastMessageObject?.message ?? "";
        const date = !lastMessage
          ? ""
          : dayjs(lastMessage.created_at).format("MMM DD");

        return {
          id: String(item.id),
          booking_id: String(item.ride_booking_id),
          user_id: !isPassenger
            ? item.passenger?.id ?? null
            : item.driver?.id ?? null,
          avatar: {
            src: !isPassenger ? item.passenger?.avatar : item.driver?.avatar,
            alt: isPassenger ? "passenger" : "driver",
          },
          name: !isPassenger
            ? formatDisplayName({
                first_name: item.passenger?.first_name,
                email: item.passenger?.email,
              })
            : formatDisplayName({
                first_name: item.driver?.first_name,
                email: item.driver?.email,
              }),
          message: displayMessage,
          date: date,
          isNew: !isPassenger
            ? item.is_driver_read === 0
            : item.is_passenger_read === 0,
          booking_status: item.booking?.status ?? null,
        };
      });
      dispatch({
        type: ChatTripActionEnum.SetListMessageItems,
        payload:
          state.list.message.pagination.current === 1
            ? [...newPayload]
            : !newPayload.length
            ? state.list.message.items
            : [...state.list.message.items, ...newPayload],
      });
      dispatch({
        type: ChatTripActionEnum.SetListMessagePaginationLast,
        payload: data.meta.last_page,
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};

"use client";
import * as React from "react";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import {
  BookingCardChatTrip,
  BookingCardChatTripProps,
} from "../../components/booking_card";
import RoomConversationContainerChatTrip from "../../components/room_conversation_container/RoomConversationContainer.chat.trip";
import { ChatTripActionEnum, ChatTripContext } from "../../context";
import {
  useGetBookingId,
  useGetMessagesListByRoom,
  usePostBookingAccept,
  usePostBookingReject,
} from "../../react_query/hooks";
import SenderMessageItemChatTrip from "../../components/sender_message_item/SenderMessageItem.chat.trip";
import RecipientMessageItemChatTrip from "../../components/recipient_message_item/RecipientMessageItem.chat.trip";
import { queryClient } from "@/core/utils/react_query";
import { MoonLoader } from "@/core/components/moon_loader";
import { ChatTripReactQueryKey } from "../../react_query/keys";
import { findLastIndexOfferCard } from "@/core/utils/chat/functions";
import { UserContext } from "@/core/modules/app/context";
import { InfiniteScrollWrapper } from "@/core/components/infinite_scroll_wrapper";
import SVGIcon from "@/core/icons";
import { getDictionaries } from "../../i18n";
import { PAGINATION } from "@/core/utils/pagination/contants";
import { GetBookingIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/booking";
import { CompleteBookingRideCardChatTrip } from "../../components/complete_booking_ride_card";

export const RoomChatTrip = () => {
  const dictionaries = getDictionaries();
  const { state: userState } = React.useContext(UserContext);

  const searchParams = useSearchParams();
  const { state, dispatch } = React.useContext(ChatTripContext);

  const bookingId = searchParams.get("bookingId");

  const { isFetching: isFetchingMessagesListByRoom } =
    useGetMessagesListByRoom();
  const { isFetching: isFetchingGetBookingId } = useGetBookingId();
  const isLoading = isFetchingMessagesListByRoom || isFetchingGetBookingId;

  const {
    mutateAsync: postBookingAccept,
    isPending: isPendingPostBookingAccept,
  } = usePostBookingAccept();

  const {
    mutateAsync: postBookingReject,
    isPending: isPendingPostBookingReject,
  } = usePostBookingReject();

  const bookingIdPayload: GetBookingIdPayloadRequestInterface = {
    path: {
      id: !bookingId ? "0" : String(bookingId),
    },
    params: {
      include: "ride.vehicle.brand,user",
    },
  };
  const counterRef = React.useRef(state.room.message.pagination.counter);

  const conversationData = state.room.message.items;
  React.useEffect(() => {
    if (!!bookingId) {
      const interval = setInterval(() => {
        // Skip update jika tab di-background
        if (typeof document !== "undefined" && document.hidden) {
          return;
        }

        counterRef.current += 1;

        dispatch({
          type: ChatTripActionEnum.SetRoomMessagePaginationCurrent,
          payload: 1,
        });
        dispatch({
          type: ChatTripActionEnum.SetRoomMessagePaginationCounter,
          payload: counterRef.current,
        });
      }, 10 * 1000);

      return () => clearInterval(interval);
    }
  }, [bookingId]);

  if (
    isLoading &&
    state.room.message.pagination.current === PAGINATION.NUMBER &&
    !state.room.message.items.length
  ) {
    return (
      <RoomConversationContainerChatTrip
        className={clsx("!place-content-center !place-items-center")}
      >
        {isFetchingMessagesListByRoom && (
          <MoonLoader size={48} color={"#05912A"} />
        )}
      </RoomConversationContainerChatTrip>
    );
  }

  if (!state.room.message.items.length && !isLoading) {
    return (
      <RoomConversationContainerChatTrip
        className={clsx("!place-content-center !place-items-center")}
      >
        <div
          className={clsx(
            "grid grid-cols-1 place-content-center place-items-center",
            "w-full",
          )}
        >
          <SVGIcon
            name="MessageSquare"
            className={clsx("w-[3rem] h-[3rem]", "text-[#C2C2C2]")}
          />
          <span className={clsx("text-[1rem] text-[#C2C2C2] font-medium")}>
            {dictionaries.chat.list.empty.message}
          </span>
        </div>
      </RoomConversationContainerChatTrip>
    );
  }

  const handleClickReject = async () => {
    await postBookingReject();

    queryClient.invalidateQueries({
      queryKey: ChatTripReactQueryKey.GetBookingId(bookingIdPayload),
      type: "all",
      refetchType: "all",
    });
    dispatch({
      type: ChatTripActionEnum.SetRoomMessagePaginationCurrent,
      payload: 1,
    });
    dispatch({
      type: ChatTripActionEnum.SetRoomMessagePaginationCounter,
      payload: state.room.message.pagination.counter + 1,
    });
  };

  const handleClickCancel = async () => {
    await postBookingReject();

    queryClient.invalidateQueries({
      queryKey: ChatTripReactQueryKey.GetBookingId(bookingIdPayload),
      type: "all",
      refetchType: "all",
    });
    dispatch({
      type: ChatTripActionEnum.SetRoomMessagePaginationCurrent,
      payload: 1,
    });
    dispatch({
      type: ChatTripActionEnum.SetRoomMessagePaginationCounter,
      payload: state.room.message.pagination.counter + 1,
    });
  };

  const handleClickOffer = async () => {
    dispatch({
      type: ChatTripActionEnum.SetOfferData,
      payload: {
        ...state.offer,
        is_open: true,
      },
    });
  };

  const handleClickAccept = async () => {
    await postBookingAccept();
    queryClient.invalidateQueries({
      queryKey: ChatTripReactQueryKey.GetBookingId(bookingIdPayload),
      type: "all",
      refetchType: "all",
    });
    dispatch({
      type: ChatTripActionEnum.SetRoomMessagePaginationCurrent,
      payload: 1,
    });
    dispatch({
      type: ChatTripActionEnum.SetRoomMessagePaginationCounter,
      payload: state.room.message.pagination.counter + 1,
    });
  };

  const handleLoadMore = () => {
    if (isLoading) return;
    dispatch({
      type: ChatTripActionEnum.SetRoomMessagePaginationCurrent,
      payload: state.room.message.pagination.current + 1,
    });
  };

  const isEndReached =
    state.room.message.pagination.last ===
    state.room.message.pagination.current;

  const handleClickViewTripDetails = (
    data: BookingCardChatTripProps | null,
    is_rated: boolean,
    rating: number | null,
    booking_role: "driver" | "passenger" | null,
  ) => {
    dispatch({
      type: ChatTripActionEnum.SetCompletedRideData,
      payload: {
        ...state.completed_ride,
        booking: data,
        is_open: true,
        is_rated: is_rated,
        rating: rating,
        booking_role: booking_role,
      },
    });
  };

  return (
    <InfiniteScrollWrapper
      loader={
        <RoomConversationContainerChatTrip
          className={clsx("!place-content-center !place-items-center")}
        >
          <MoonLoader size={48} color={"#05912A"} />
        </RoomConversationContainerChatTrip>
      }
      position="top"
      isPaused={isLoading}
      isEndReached={isEndReached}
      onLoadMore={handleLoadMore}
    >
      <RoomConversationContainerChatTrip>
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
            "w-full",
          )}
        >
          {conversationData.map((chat, chatIndex) => {
            const { type, role, sender_id, ...otherChatProps } = chat;
            const completedType = type === "archieve";
            // const completedType = true;
            if (completedType) {
              return (
                <CompleteBookingRideCardChatTrip
                  {...chat.booking}
                  key={chatIndex}
                  cta={{
                    trip_details: {
                      children: "Details ansehen",
                      disabled: false,
                      loading: false,
                      onClick: () =>
                        handleClickViewTripDetails(
                          chat.booking,
                          state.room.is_rated,
                          state.room.rating,
                          chat.booking_role,
                        ),
                    },
                  }}
                />
              );
            }
            if (type === "offer_request" || type === "booking_request") {
              const lastOfferCardIndex = findLastIndexOfferCard(
                conversationData,
                "type",
                "text",
              );
              return (
                <BookingCardChatTrip
                  {...chat.booking}
                  key={chatIndex}
                  cta={{
                    cancel:
                      type === "offer_request" &&
                      state.room.booking.status === "pending" &&
                      chatIndex === lastOfferCardIndex &&
                      !!userState.profile?.id &&
                      String(userState.profile?.id) === sender_id
                        ? {
                            children: "Abbrechen",
                            disabled: isPendingPostBookingReject,
                            loading: isPendingPostBookingReject,
                            onClick: handleClickCancel,
                          }
                        : null,
                    reject:
                      type === "offer_request" &&
                      state.room.booking.status === "pending" &&
                      chatIndex === lastOfferCardIndex &&
                      !!userState.profile?.id &&
                      String(userState.profile?.id) !== sender_id
                        ? {
                            children: "Angebot ablehnen",
                            disabled: isPendingPostBookingReject,
                            loading: isPendingPostBookingReject,
                            onClick: handleClickReject,
                          }
                        : null,
                    bargain:
                      type === "offer_request" &&
                      state.room.booking.status === "pending" &&
                      chatIndex === lastOfferCardIndex &&
                      !!userState.profile?.id &&
                      String(userState.profile?.id) !== sender_id
                        ? {
                            children: "Ein weiteres Angebot senden",
                            disabled: false,
                            loading: false,
                            onClick: handleClickOffer,
                          }
                        : null,
                    accept:
                      type === "offer_request" &&
                      state.room.booking.status === "pending" &&
                      chatIndex === lastOfferCardIndex &&
                      !!userState.profile?.id &&
                      String(userState.profile?.id) !== sender_id
                        ? {
                            children: "Angebot annehmen",
                            disabled: isPendingPostBookingAccept,
                            loading: isPendingPostBookingAccept,
                            onClick: handleClickAccept,
                          }
                        : null,
                  }}
                />
              );
            }
            if (role === "sender") {
              return (
                <SenderMessageItemChatTrip
                  {...otherChatProps}
                  key={chatIndex}
                />
              );
            }
            return (
              <RecipientMessageItemChatTrip
                {...otherChatProps}
                key={chatIndex}
              />
            );
          })}
        </div>
      </RoomConversationContainerChatTrip>
    </InfiniteScrollWrapper>
  );
};

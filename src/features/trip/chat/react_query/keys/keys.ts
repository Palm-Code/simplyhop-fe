import { GetBookingIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/booking";
import {
  GetMessageRoomsIdPayloadRequestInterface,
  GetMessageRoomsListPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/message_rooms";
import { GetMessagesListByRoomPayloadRequestInterface } from "@/core/models/rest/simplyhop/messages";
import { GetUserProfileIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/user_profile";

export const ChatTripReactQueryKey = {
  GetMessagesListByRoom: (
    payload?: GetMessagesListByRoomPayloadRequestInterface & { counter: number }
  ) => {
    return ["ChatTripReactQueryKey.GetMessagesList", [payload] as const];
  },
  GetMessageRoomsList: (
    payload?: GetMessageRoomsListPayloadRequestInterface
  ) => {
    return ["ChatTripReactQueryKey.GetMessageRoomsList", [payload] as const];
  },
  GetMessageRoomsId: (payload?: GetMessageRoomsIdPayloadRequestInterface) => {
    return ["ChatTripReactQueryKey.GetMessageRoomsId", [payload] as const];
  },
  GetBookingId: (payload?: GetBookingIdPayloadRequestInterface) => {
    return ["ChatTripReactQueryKey.GetBookingId", [payload] as const];
  },
  GetUserProfileId: (payload?: GetUserProfileIdPayloadRequestInterface) => {
    return ["ChatTripReactQueryKey.GetUserProfileId", [payload] as const];
  },
  PutMessageRoomsMarkAsRead: () => {
    return ["ChatTripReactQueryKey.PutMessageRoomsMarkAsRead"];
  },
  PostMessagesChat: () => {
    return ["ChatTripReactQueryKey.PostMessagesChat"];
  },
  PostBookingAccept: () => {
    return ["ChatTripReactQueryKey.PostBookingAccept"];
  },
  PostBookingOffer: () => {
    return ["ChatTripReactQueryKey.PostBookingOffer"];
  },
  PostBookingReject: () => {
    return ["ChatTripReactQueryKey.PostBookingReject"];
  },
  PostBookingRating: () => {
    return ["ChatTripReactQueryKey.PostBookingRating"];
  },
};

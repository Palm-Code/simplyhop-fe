import {
  GetAuthSocialCallbackPathPayloadRequestInterface,
  GetAuthSocialRedirectPathPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/auth";
import {
  GetBookingIdPathPayloadRequestInterface,
  PostBookingAcceptPathPayloadRequestInterface,
  PostBookingOfferPathPayloadRequestInterface,
  PostBookingRejectPathPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/booking";
import { GetMessageRoomsIdPathPayloadRequestInterface } from "@/core/models/rest/simplyhop/message_rooms";
import { PutMessageRoomsMarkAsReadPathPayloadRequestInterface } from "@/core/models/rest/simplyhop/message_rooms/mark_as_read.put";
import {
  DeleteMessagesChatPathPayloadRequestInterface,
  GetMessagesListByRoomPathPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/messages";
import {
  DeleteRidesIdPathPayloadRequestInterface,
  GetRidesIdPathPayloadRequestInterface,
  PutRidesSecondPathPayloadRequestInterface,
  PutRidesThirdPathPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/rides";
import {
  DeleteVehicleIdPathPayloadRequestInterface,
  DeleteVehicleMediaPathPayloadRequestInterface,
  GetVehicleIdPathPayloadRequestInterface,
  PutVehicleUpdatePathPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/vehicle";

export const SimplyHopAPICollectionURL = {
  auth: {
    postLogin: () => `/api/auth/login`,
    postRegister: () => `/api/auth/register`,
    postForgotPassword: () => `/api/auth/forgot-password`,
    postResetPassword: () => `/api/auth/reset-password`,
    postLogout: () => `/api/auth/logout`,
    postChangePassword: () => `/api/auth/change-password`,
    getSocialRedirect: (
      path: GetAuthSocialRedirectPathPayloadRequestInterface
    ) => `/api/auth/${path.provider}/redirect`,
    getSocialCallback: (
      path: GetAuthSocialCallbackPathPayloadRequestInterface
    ) => `/api/auth/${path.provider}/callback`,
    deleteDeactivateAccount: () => `/api/auth/deactivate-account`,
  },
  shift: {
    getList: () => `/api/shifts`,
  },
  vehicle: {
    postCreateMy: () => `/api/vehicle/storeMy`,
    postUpdate: (path: PutVehicleUpdatePathPayloadRequestInterface) =>
      `/api/vehicle/${path.id}`,
    getMy: () => `/api/vehicle/my`,
    getId: (path: GetVehicleIdPathPayloadRequestInterface) =>
      `/api/vehicle/${path.id}`,
    deleteId: (path: DeleteVehicleIdPathPayloadRequestInterface) =>
      `/api/vehicle/${path.vehicle_id}`,
    deleteMedia: (path: DeleteVehicleMediaPathPayloadRequestInterface) =>
      `/api/vehicle/${path.vehicle_id}/media/${path.media_id}`,
  },
  user_profile: {
    postCreate: () => `/api/profile`,
    getData: () => `/api/profile`,
  },
  vehicle_brand: {
    getList: () => `/api/vehicle-brand`,
    postCreate: () => `/api/vehicle-brand`,
  },
  vehicle_category: {
    getList: () => `/api/vehicle-category`,
    postCreate: () => `/api/vehicle-category`,
  },
  rides: {
    getSearch: () => `/api/rides/search`,
    getId: (path: GetRidesIdPathPayloadRequestInterface) =>
      `/api/rides/${path.id}`,
    getMy: () => `/api/rides/my`,
    postFirst: () => `/api/rides/first`,
    putSecond: (path: PutRidesSecondPathPayloadRequestInterface) =>
      `/api/rides/second/${path.id}`,
    putThird: (path: PutRidesThirdPathPayloadRequestInterface) =>
      `/api/rides/third/${path.id}`,
    deleteId: (path: DeleteRidesIdPathPayloadRequestInterface) =>
      `/api/rides/${path.id}`,
  },
  booking: {
    postBook: () => `/api/bookings/book`,
    getMy: () => `/api/bookings/my`,
    getId: (path: GetBookingIdPathPayloadRequestInterface) =>
      `/api/bookings/${path.id}`,
    postAccept: (path: PostBookingAcceptPathPayloadRequestInterface) =>
      `/api/bookings/${path.id}/accept`,
    postOffer: (path: PostBookingOfferPathPayloadRequestInterface) =>
      `/api/bookings/${path.id}/counter-offer`,
    postReject: (path: PostBookingRejectPathPayloadRequestInterface) =>
      `/api/bookings/${path.id}/reject`,
  },
  messages: {
    getListByRoom: (path: GetMessagesListByRoomPathPayloadRequestInterface) =>
      `/api/messages/room/${path.roomId}`,
    postChat: () => `/api/messages/send-text`,
    deleteChat: (path: DeleteMessagesChatPathPayloadRequestInterface) =>
      `/api/messages/${path.id}`,
  },
  message_rooms: {
    getList: () => `/api/message-rooms`,
    getUnreadList: () => `/api/message-rooms/unread-list`,
    getId: (path: GetMessageRoomsIdPathPayloadRequestInterface) =>
      `/api/message-rooms/${path.id}`,
    putMarkAsRead: (
      path: PutMessageRoomsMarkAsReadPathPayloadRequestInterface
    ) => `/api/message-rooms/${path.roomId}/mark-as-read`,
  },
  payment: {
    getBillingPortal: () => `/api/payments/billing-portal`,
    getSubscribe: () => `/api/payments/subscribe`,
    getStatus: () => `/api/payments/status`,
    postCancel: () => `/api/payments/cancel`,
  },
};

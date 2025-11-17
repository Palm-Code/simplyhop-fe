import {
  GetAuthSocialCallbackPathPayloadRequestInterface,
  GetAuthSocialRedirectPathPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/auth";
import {
  GetBookingIdPathPayloadRequestInterface,
  PostBookingAcceptPathPayloadRequestInterface,
  PostBookingOfferPathPayloadRequestInterface,
  PostBookingRejectPathPayloadRequestInterface,
  PostBookingRatingPathPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/booking";
import { GetDashboardSuperAdminPerOrganizationIdPathPayloadRequestInterface } from "@/core/models/rest/simplyhop/dashboard";
import { GetMessageRoomsIdPathPayloadRequestInterface } from "@/core/models/rest/simplyhop/message_rooms";
import {
  PutMessageRoomsMarkAsReadPathPayloadRequestInterface,
  DeleteMessageRoomsIdPathPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/message_rooms";
import {
  DeleteMessagesChatPathPayloadRequestInterface,
  GetMessagesListByRoomPathPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/messages";
import {
  DeleteRidesIdPathPayloadRequestInterface,
  GetRidesIdPathPayloadRequestInterface,
  PutRidesSecondPathPayloadRequestInterface,
  PutRidesThirdPathPayloadRequestInterface,
  PostRidesArchivePathPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/rides";
import { GetUserProfileIdPathPayloadRequestInterface } from "@/core/models/rest/simplyhop/user_profile";
import {
  DeleteVehicleIdPathPayloadRequestInterface,
  DeleteVehicleMediaPathPayloadRequestInterface,
  GetVehicleIdPathPayloadRequestInterface,
  PutVehicleUpdatePathPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/vehicle";

export const SimplyHopAPICollectionURL = {
  auth: {
    postLogin: () => `/api/auth/login`,
    postRequestOTP: () => `/api/auth/request-otp`,
    postVerifyOTP: () => `/api/auth/verify-otp`,
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
    getList: () => `/api/vehicle`,
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
    getId: (path: GetUserProfileIdPathPayloadRequestInterface) =>
      `/api/users/profile/${path.id}`,
  },
  user: {
    postBlock: () => `/api/user-block`,
    deleteBlock: () => `/api/user-block`,
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
    postArchive: (path: PostRidesArchivePathPayloadRequestInterface) =>
      `/api/rides/archive/${path.id}`,
  },
  booking: {
    postBook: () => `/api/bookings/book`,
    getMy: () => `/api/bookings/my`,
    getList: () => `/api/bookings`,
    getId: (path: GetBookingIdPathPayloadRequestInterface) =>
      `/api/bookings/${path.id}`,
    postAccept: (path: PostBookingAcceptPathPayloadRequestInterface) =>
      `/api/bookings/${path.id}/accept`,
    postOffer: (path: PostBookingOfferPathPayloadRequestInterface) =>
      `/api/bookings/${path.id}/counter-offer`,
    postReject: (path: PostBookingRejectPathPayloadRequestInterface) =>
      `/api/bookings/${path.id}/reject`,
    postRating: (path: PostBookingRatingPathPayloadRequestInterface) =>
      `/api/bookings/rating/${path.ride_booking_id}`,
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
    deleteId: (path: DeleteMessageRoomsIdPathPayloadRequestInterface) =>
      `/api/message-rooms/${path.id}`,
  },
  payment: {
    getBillingPortal: () => `/api/payments/billing-portal`,
    getSubscribe: () => `/api/payments/subscribe`,
    getStatus: () => `/api/payments/status`,
    postCancel: () => `/api/payments/cancel`,
  },
  dashboard: {
    getMy: () => `/api/dashboard/my`,
    getOrganizationSummary: () => `/api/dashboard/organization/summary`,
    getSuperAdminSummary: () => `/api/dashboard/superadmin/summary`,
    getOrganization: () => `/api/dashboard/organization`,
    getSuperAdmin: () => `/api/dashboard/superadmin`,
    getSuperAdminPerOrganization: () =>
      `/api/dashboard/superadmin/per-organization`,
    getSuperAdminPerOrganizationId: (
      payload: GetDashboardSuperAdminPerOrganizationIdPathPayloadRequestInterface
    ) => `/api/dashboard/superadmin/per-organization/${payload.id}`,
  },
};

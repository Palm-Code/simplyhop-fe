import {
  GetBookingIdPayloadRequestInterface,
  GetBookingListPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/booking";
import {
  GetRidesIdPayloadRequestInterface,
  GetRidesSearchPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/rides";

export const ListTripReactQueryKey = {
  GetRidesSearch: (payload?: GetRidesSearchPayloadRequestInterface) => {
    return ["ListTripReactQueryKey.GetRidesSearch", [payload] as const];
  },
  GetBookingList: (payload?: GetBookingListPayloadRequestInterface) => {
    return ["ListTripReactQueryKey.GetBookingList", [payload] as const];
  },
  GetRidesId: (payload?: GetRidesIdPayloadRequestInterface) => {
    return ["ListTripReactQueryKey.GetRidesId", [payload] as const];
  },
  GetBookingId: (payload?: GetBookingIdPayloadRequestInterface) => {
    return ["ListTripReactQueryKey.GetBookingId", [payload] as const];
  },
  DeleteRidesId: () => {
    return ["ListTripReactQueryKey.DeleteRidesId"];
  },
  PostBookingReject: () => {
    return ["ListTripReactQueryKey.PostBookingReject"];
  },
  PostRidesArchive: () => {
    return ["ListTripReactQueryKey.PostRidesArchive"];
  },
};

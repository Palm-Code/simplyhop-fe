import {
  GetBookingIdPayloadRequestInterface,
  GetBookingListPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/booking";
import {
  GetRidesIdPayloadRequestInterface,
  GetRidesSearchPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/rides";

export const MyListTripReactQueryKey = {
  GetRidesSearch: (payload?: GetRidesSearchPayloadRequestInterface) => {
    return ["MyListTripReactQueryKey.GetRidesSearch", [payload] as const];
  },
  GetBookingList: (payload?: GetBookingListPayloadRequestInterface) => {
    return ["MyListTripReactQueryKey.GetBookingList", [payload] as const];
  },
  GetRidesId: (payload?: GetRidesIdPayloadRequestInterface) => {
    return ["MyListTripReactQueryKey.GetRidesId", [payload] as const];
  },
  GetBookingId: (payload?: GetBookingIdPayloadRequestInterface) => {
    return ["MyListTripReactQueryKey.GetBookingId", [payload] as const];
  },
  DeleteRidesId: () => {
    return ["MyListTripReactQueryKey.DeleteRidesId"];
  },
  PostBookingReject: () => {
    return ["MyListTripReactQueryKey.PostBookingReject"];
  },
  PostRidesArchive: () => {
    return ["MyListTripReactQueryKey.PostRidesArchive"];
  },
};

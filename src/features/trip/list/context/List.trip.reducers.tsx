import {
  ListTripActionEnum,
  ListTripActions,
  ListTripBook,
  ListTripCancelBookNotification,
  ListTripCompleteRideConfirmation,
  ListTripDeleteRideNotification,
  ListTripDetailBookNotification,
  ListTripDetailRideNotification,
  ListTripFilters,
  ListTripRide,
  ListTripShareRideNotification,
  ListTripSuccessCancelBookNotification,
  ListTripSuccessDeleteRideNotification,
} from "./List.trip.types";

// Filters
export const ListTripFiltersReducers = (
  state: ListTripFilters,
  action: ListTripActions
) => {
  switch (action.type) {
    case ListTripActionEnum.SetFiltersData:
      return action.payload;

    default:
      return state;
  }
};

// Ride
export const ListTripRideReducers = (
  state: ListTripRide,
  action: ListTripActions
) => {
  switch (action.type) {
    case ListTripActionEnum.SetRideData:
      return action.payload;
    case ListTripActionEnum.SetRideDataData: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case ListTripActionEnum.SetRideDataPaginationCurrent: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          current: action.payload,
        },
      };
    }
    case ListTripActionEnum.SetRideDataPaginationLast: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          last: action.payload,
        },
      };
    }

    default:
      return state;
  }
};

// Book
export const ListTripBookReducers = (
  state: ListTripBook,
  action: ListTripActions
) => {
  switch (action.type) {
    case ListTripActionEnum.SetBookData:
      return action.payload;
    case ListTripActionEnum.SetBookDataData: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case ListTripActionEnum.SetBookDataPaginationCurrent: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          current: action.payload,
        },
      };
    }
    case ListTripActionEnum.SetBookDataPaginationLast: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          last: action.payload,
        },
      };
    }
    default:
      return state;
  }
};

// DetailRideNotification
export const ListTripDetailRideNotificationReducers = (
  state: ListTripDetailRideNotification,
  action: ListTripActions
) => {
  switch (action.type) {
    case ListTripActionEnum.SetDetailRideNotificationData:
      return action.payload;

    default:
      return state;
  }
};

// DeleteRideNotification
export const ListTripDeleteRideNotificationReducers = (
  state: ListTripDeleteRideNotification,
  action: ListTripActions
) => {
  switch (action.type) {
    case ListTripActionEnum.SetDeleteRideNotificationData:
      return action.payload;

    default:
      return state;
  }
};

// SuccessDeleteRideNotification
export const ListTripSuccessDeleteRideNotificationReducers = (
  state: ListTripSuccessDeleteRideNotification,
  action: ListTripActions
) => {
  switch (action.type) {
    case ListTripActionEnum.SetSuccessDeleteRideNotificationData:
      return action.payload;

    default:
      return state;
  }
};

// ShareRideNotification
export const ListTripShareRideNotificationReducers = (
  state: ListTripShareRideNotification,
  action: ListTripActions
) => {
  switch (action.type) {
    case ListTripActionEnum.SetShareRideNotificationData:
      return action.payload;

    default:
      return state;
  }
};

// DetailBookNotification
export const ListTripDetailBookNotificationReducers = (
  state: ListTripDetailBookNotification,
  action: ListTripActions
) => {
  switch (action.type) {
    case ListTripActionEnum.SetDetailBookNotificationData:
      return action.payload;

    default:
      return state;
  }
};

// CancelBookNotification
export const ListTripCancelBookNotificationReducers = (
  state: ListTripCancelBookNotification,
  action: ListTripActions
) => {
  switch (action.type) {
    case ListTripActionEnum.SetCancelBookNotificationData:
      return action.payload;

    default:
      return state;
  }
};

// SuccessCancelBookNotification
export const ListTripSuccessCancelBookNotificationReducers = (
  state: ListTripSuccessCancelBookNotification,
  action: ListTripActions
) => {
  switch (action.type) {
    case ListTripActionEnum.SetSuccessCancelBookNotificationData:
      return action.payload;

    default:
      return state;
  }
};

// CompleteRideConfirmation
export const ListTripCompleteRideConfirmationReducers = (
  state: ListTripCompleteRideConfirmation,
  action: ListTripActions
) => {
  switch (action.type) {
    case ListTripActionEnum.SetCompleteRideConfirmationData:
      return action.payload;

    default:
      return state;
  }
};

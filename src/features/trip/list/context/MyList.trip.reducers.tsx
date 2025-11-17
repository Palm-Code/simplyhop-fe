import {
  MyListTripActionEnum,
  MyListTripActions,
  MyListTripBook,
  MyListTripCancelBookNotification,
  MyListTripCompleteRideConfirmation,
  MyListTripDeleteRideNotification,
  MyListTripDetailBookNotification,
  MyListTripDetailRideNotification,
  MyListTripFilters,
  MyListTripRide,
  MyListTripShareRideNotification,
  MyListTripSuccessCancelBookNotification,
  MyListTripSuccessDeleteRideNotification,
} from "./MyList.trip.types";

// Filters
export const MyListTripFiltersReducers = (
  state: MyListTripFilters,
  action: MyListTripActions
) => {
  switch (action.type) {
    case MyListTripActionEnum.SetFiltersData:
      return action.payload;

    default:
      return state;
  }
};

// Ride
export const MyListTripRideReducers = (
  state: MyListTripRide,
  action: MyListTripActions
) => {
  switch (action.type) {
    case MyListTripActionEnum.SetRideData:
      return action.payload;
    case MyListTripActionEnum.SetRideDataData: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case MyListTripActionEnum.SetRideDataPaginationCurrent: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          current: action.payload,
        },
      };
    }
    case MyListTripActionEnum.SetRideDataPaginationLast: {
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
export const MyListTripBookReducers = (
  state: MyListTripBook,
  action: MyListTripActions
) => {
  switch (action.type) {
    case MyListTripActionEnum.SetBookData:
      return action.payload;
    case MyListTripActionEnum.SetBookDataData: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case MyListTripActionEnum.SetBookDataPaginationCurrent: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          current: action.payload,
        },
      };
    }
    case MyListTripActionEnum.SetBookDataPaginationLast: {
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
export const MyListTripDetailRideNotificationReducers = (
  state: MyListTripDetailRideNotification,
  action: MyListTripActions
) => {
  switch (action.type) {
    case MyListTripActionEnum.SetDetailRideNotificationData:
      return action.payload;

    default:
      return state;
  }
};

// DeleteRideNotification
export const MyListTripDeleteRideNotificationReducers = (
  state: MyListTripDeleteRideNotification,
  action: MyListTripActions
) => {
  switch (action.type) {
    case MyListTripActionEnum.SetDeleteRideNotificationData:
      return action.payload;

    default:
      return state;
  }
};

// SuccessDeleteRideNotification
export const MyListTripSuccessDeleteRideNotificationReducers = (
  state: MyListTripSuccessDeleteRideNotification,
  action: MyListTripActions
) => {
  switch (action.type) {
    case MyListTripActionEnum.SetSuccessDeleteRideNotificationData:
      return action.payload;

    default:
      return state;
  }
};

// ShareRideNotification
export const MyListTripShareRideNotificationReducers = (
  state: MyListTripShareRideNotification,
  action: MyListTripActions
) => {
  switch (action.type) {
    case MyListTripActionEnum.SetShareRideNotificationData:
      return action.payload;

    default:
      return state;
  }
};

// DetailBookNotification
export const MyListTripDetailBookNotificationReducers = (
  state: MyListTripDetailBookNotification,
  action: MyListTripActions
) => {
  switch (action.type) {
    case MyListTripActionEnum.SetDetailBookNotificationData:
      return action.payload;

    default:
      return state;
  }
};

// CancelBookNotification
export const MyListTripCancelBookNotificationReducers = (
  state: MyListTripCancelBookNotification,
  action: MyListTripActions
) => {
  switch (action.type) {
    case MyListTripActionEnum.SetCancelBookNotificationData:
      return action.payload;

    default:
      return state;
  }
};

// SuccessCancelBookNotification
export const MyListTripSuccessCancelBookNotificationReducers = (
  state: MyListTripSuccessCancelBookNotification,
  action: MyListTripActions
) => {
  switch (action.type) {
    case MyListTripActionEnum.SetSuccessCancelBookNotificationData:
      return action.payload;

    default:
      return state;
  }
};

// CompleteRideConfirmation
export const MyListTripCompleteRideConfirmationReducers = (
  state: MyListTripCompleteRideConfirmation,
  action: MyListTripActions
) => {
  switch (action.type) {
    case MyListTripActionEnum.SetCompleteRideConfirmationData:
      return action.payload;

    default:
      return state;
  }
};

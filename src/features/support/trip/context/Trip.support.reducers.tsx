import {
  TripSupportActionEnum,
  TripSupportActions,
  TripSupportBook,
  TripSupportCancelBookNotification,
  TripSupportCompleteRideConfirmation,
  TripSupportDeleteRideNotification,
  TripSupportDetailBookNotification,
  TripSupportDetailRideNotification,
  TripSupportFilters,
  TripSupportRide,
  TripSupportShareRideNotification,
  TripSupportSuccessCancelBookNotification,
  TripSupportSuccessDeleteRideNotification,
} from "./Trip.support.types";

// Filters
export const TripSupportFiltersReducers = (
  state: TripSupportFilters,
  action: TripSupportActions
) => {
  switch (action.type) {
    case TripSupportActionEnum.SetFiltersData:
      return action.payload;

    default:
      return state;
  }
};

// Ride
export const TripSupportRideReducers = (
  state: TripSupportRide,
  action: TripSupportActions
) => {
  switch (action.type) {
    case TripSupportActionEnum.SetRideData:
      return action.payload;
    case TripSupportActionEnum.SetRideDataData: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case TripSupportActionEnum.SetRideDataPaginationCurrent: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          current: action.payload,
        },
      };
    }
    case TripSupportActionEnum.SetRideDataPaginationLast: {
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
export const TripSupportBookReducers = (
  state: TripSupportBook,
  action: TripSupportActions
) => {
  switch (action.type) {
    case TripSupportActionEnum.SetBookData:
      return action.payload;
    case TripSupportActionEnum.SetBookDataData: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case TripSupportActionEnum.SetBookDataPaginationCurrent: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          current: action.payload,
        },
      };
    }
    case TripSupportActionEnum.SetBookDataPaginationLast: {
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
export const TripSupportDetailRideNotificationReducers = (
  state: TripSupportDetailRideNotification,
  action: TripSupportActions
) => {
  switch (action.type) {
    case TripSupportActionEnum.SetDetailRideNotificationData:
      return action.payload;

    default:
      return state;
  }
};

// DeleteRideNotification
export const TripSupportDeleteRideNotificationReducers = (
  state: TripSupportDeleteRideNotification,
  action: TripSupportActions
) => {
  switch (action.type) {
    case TripSupportActionEnum.SetDeleteRideNotificationData:
      return action.payload;

    default:
      return state;
  }
};

// SuccessDeleteRideNotification
export const TripSupportSuccessDeleteRideNotificationReducers = (
  state: TripSupportSuccessDeleteRideNotification,
  action: TripSupportActions
) => {
  switch (action.type) {
    case TripSupportActionEnum.SetSuccessDeleteRideNotificationData:
      return action.payload;

    default:
      return state;
  }
};

// ShareRideNotification
export const TripSupportShareRideNotificationReducers = (
  state: TripSupportShareRideNotification,
  action: TripSupportActions
) => {
  switch (action.type) {
    case TripSupportActionEnum.SetShareRideNotificationData:
      return action.payload;

    default:
      return state;
  }
};

// DetailBookNotification
export const TripSupportDetailBookNotificationReducers = (
  state: TripSupportDetailBookNotification,
  action: TripSupportActions
) => {
  switch (action.type) {
    case TripSupportActionEnum.SetDetailBookNotificationData:
      return action.payload;

    default:
      return state;
  }
};

// CancelBookNotification
export const TripSupportCancelBookNotificationReducers = (
  state: TripSupportCancelBookNotification,
  action: TripSupportActions
) => {
  switch (action.type) {
    case TripSupportActionEnum.SetCancelBookNotificationData:
      return action.payload;

    default:
      return state;
  }
};

// SuccessCancelBookNotification
export const TripSupportSuccessCancelBookNotificationReducers = (
  state: TripSupportSuccessCancelBookNotification,
  action: TripSupportActions
) => {
  switch (action.type) {
    case TripSupportActionEnum.SetSuccessCancelBookNotificationData:
      return action.payload;

    default:
      return state;
  }
};

// CompleteRideConfirmation
export const TripSupportCompleteRideConfirmationReducers = (
  state: TripSupportCompleteRideConfirmation,
  action: TripSupportActions
) => {
  switch (action.type) {
    case TripSupportActionEnum.SetCompleteRideConfirmationData:
      return action.payload;

    default:
      return state;
  }
};

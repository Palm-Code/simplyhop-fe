import {
  ResultTripActionEnum,
  ResultTripActions,
  ResultTripAdvancedFilter,
  ResultTripDetail,
  ResultTripFilters,
  ResultTripNotification,
  ResultTripRides,
  ResultTripVehicleFilters,
} from "./Result.trip.types";

// Filters
export const ResultTripFiltersReducers = (
  state: ResultTripFilters,
  action: ResultTripActions
) => {
  switch (action.type) {
    case ResultTripActionEnum.SetFiltersData:
      return action.payload;

    default:
      return state;
  }
};

// VehicleFilters
export const ResultTripVehicleFiltersReducers = (
  state: ResultTripVehicleFilters,
  action: ResultTripActions
) => {
  switch (action.type) {
    case ResultTripActionEnum.SetVehicleFiltersData:
      return action.payload;

    default:
      return state;
  }
};

// AdvancedFilter
export const ResultTripAdvancedFilterReducers = (
  state: ResultTripAdvancedFilter,
  action: ResultTripActions
) => {
  switch (action.type) {
    case ResultTripActionEnum.SetAdvancedFilterData:
      return action.payload;

    default:
      return state;
  }
};

// Rides
export const ResultTripRidesReducers = (
  state: ResultTripRides,
  action: ResultTripActions
) => {
  switch (action.type) {
    case ResultTripActionEnum.SetRidesData:
      return action.payload;
    case ResultTripActionEnum.SetRidesDataData: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case ResultTripActionEnum.SetRidesDataPaginationCurrent: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          current: action.payload,
        },
      };
    }
    case ResultTripActionEnum.SetRidesDataPaginationLast: {
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

// Detail
export const ResultTripDetailReducers = (
  state: ResultTripDetail,
  action: ResultTripActions
) => {
  switch (action.type) {
    case ResultTripActionEnum.SetDetailData:
      return action.payload;

    default:
      return state;
  }
};

// Notification
export const ResultTripNotificationReducers = (
  state: ResultTripNotification,
  action: ResultTripActions
) => {
  switch (action.type) {
    case ResultTripActionEnum.SetNotificationData:
      return action.payload;

    default:
      return state;
  }
};

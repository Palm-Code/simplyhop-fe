import {
  PlanRideTripActionEnum,
  PlanRideTripActions,
  PlanRideTripDetail,
  PlanRideTripFilters,
  PlanRideTripMap,
  PlanRideTripNotification,
} from "./PlanRide.trip.types";

// Filters
export const PlanRideTripFiltersReducers = (
  state: PlanRideTripFilters,
  action: PlanRideTripActions
) => {
  switch (action.type) {
    case PlanRideTripActionEnum.SetFiltersData:
      return action.payload;

    default:
      return state;
  }
};

// Map
export const PlanRideTripMapReducers = (
  state: PlanRideTripMap,
  action: PlanRideTripActions
) => {
  switch (action.type) {
    case PlanRideTripActionEnum.SetMapData:
      return action.payload;

    default:
      return state;
  }
};

// Detail
export const PlanRideTripDetailReducers = (
  state: PlanRideTripDetail,
  action: PlanRideTripActions
) => {
  switch (action.type) {
    case PlanRideTripActionEnum.SetDetailData:
      return action.payload;

    default:
      return state;
  }
};

// Notification
export const PlanRideTripNotificationReducers = (
  state: PlanRideTripNotification,
  action: PlanRideTripActions
) => {
  switch (action.type) {
    case PlanRideTripActionEnum.SetNotificationData:
      return action.payload;

    default:
      return state;
  }
};

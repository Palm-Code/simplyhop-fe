import {
  FindTripActionEnum,
  FindTripActions,
  FindTripFilters,
  FindTripMap,
} from "./Find.trip.types";

// Filters
export const FindTripFiltersReducers = (
  state: FindTripFilters,
  action: FindTripActions
) => {
  switch (action.type) {
    case FindTripActionEnum.SetFiltersData:
      return action.payload;

    default:
      return state;
  }
};

// Map
export const FindTripMapReducers = (
  state: FindTripMap,
  action: FindTripActions
) => {
  switch (action.type) {
    case FindTripActionEnum.SetMapData:
      return action.payload;

    default:
      return state;
  }
};

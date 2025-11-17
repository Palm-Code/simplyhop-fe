"use client";
import React from "react";
import { COORDINATE } from "@/core/utils/map/constants";
import { PlanRideTripContext } from "./PlanRide.trip.context";
import { PlanRideTripActionEnum } from "./PlanRide.trip.types";
import { storageService } from "@/core/services/storage/indexdb";
import { INDEXDB_STORAGE_NAME } from "@/core/utils/indexdb/constants";

export const useSetInitialContextValue = () => {
  const { state, dispatch } = React.useContext(PlanRideTripContext);

  const setDefaultData = async () => {
    const planRideTripOriginStorage = await storageService<
      null | { id: string; name: string }[]
    >({
      method: "getItem",
      key: INDEXDB_STORAGE_NAME.PLAN_RIDE_TRIP_ORIGIN_SEARCH_LIST,
    });

    const planRideTripDestinationStorage = await storageService<
      null | { id: string; name: string }[]
    >({
      method: "getItem",
      key: INDEXDB_STORAGE_NAME.PLAN_RIDE_TRIP_DESTINATION_SEARCH_LIST,
    });

    dispatch({
      type: PlanRideTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        origin: {
          ...state.filters.origin,
          saved_items: !planRideTripOriginStorage.data
            ? []
            : planRideTripOriginStorage.data,
        },
        destination: {
          ...state.filters.destination,
          saved_items: !planRideTripDestinationStorage.data
            ? []
            : planRideTripDestinationStorage.data,
        },
      },
    });

    dispatch({
      type: PlanRideTripActionEnum.SetMapData,
      payload: {
        ...state.map,
        initial_coordinate: COORDINATE.germany,
      },
    });
  };

  React.useEffect(() => {
    setDefaultData();
  }, []);
};

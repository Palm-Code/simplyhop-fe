"use client";
import React from "react";
import { FindTripContext } from "./Find.trip.context";
import { FindTripActionEnum } from "./Find.trip.types";
import { getDictionaries } from "../i18n";
import { COORDINATE } from "@/core/utils/map/constants";
import { INDEXDB_STORAGE_NAME } from "@/core/utils/indexdb/constants";
import { storageService } from "@/core/services/storage/indexdb";

export const useSetInitialContextValue = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(FindTripContext);

  const setDefaultData = async () => {
    const findTripOriginStorage = await storageService<
      null | { id: string; name: string }[]
    >({
      method: "getItem",
      key: INDEXDB_STORAGE_NAME.FIND_TRIP_ORIGIN_SEARCH_LIST,
    });

    const findTripDestinationStorage = await storageService<
      null | { id: string; name: string }[]
    >({
      method: "getItem",
      key: INDEXDB_STORAGE_NAME.FIND_TRIP_DESTINATION_SEARCH_LIST,
    });

    dispatch({
      type: FindTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        origin: {
          ...state.filters.origin,
          saved_items: !findTripOriginStorage.data
            ? []
            : findTripOriginStorage.data,
        },
        destination: {
          ...state.filters.destination,
          saved_items: !findTripDestinationStorage.data
            ? []
            : findTripDestinationStorage.data,
        },
        date: {
          ...state.filters.date, // Preserve existing date state including initial selected date
        },
        passenger: {
          ...state.filters.passenger,
          value: dictionaries.filter.form.passenger.detail.items.map((item) => {
            return {
              id: item.id,
              value: item.value,
            };
          }),
        },
      },
    });

    dispatch({
      type: FindTripActionEnum.SetMapData,
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

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { FindTripReactQueryKey } from "../keys";
import { FindTripActionEnum, FindTripContext } from "../../context";

import {
  RestGooglePostRouteDirectionsPayloadRequestInterface,
  RestGooglePostRouteDirectionsSuccessResponseInterface,
} from "@/core/models/rest/google/route";
import { fetchRestGooglePostRouteDirections } from "@/core/services/rest/google/routes.post";
import { decode } from "@googlemaps/polyline-codec";
import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import { v4 as uuidv4 } from "uuid";

export const useRestGooglePostRouteDirections = () => {
  const { state, dispatch } = React.useContext(FindTripContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);

  const payload: RestGooglePostRouteDirectionsPayloadRequestInterface = {
    body: {
      origin: {
        location: {
          latLng: {
            latitude: state.filters.origin.selected.lat_lng?.lat ?? 0,
            longitude: state.filters.origin.selected.lat_lng?.lng ?? 0,
          },
        },
      },
      destination: {
        location: {
          latLng: {
            latitude: state.filters.destination.selected.lat_lng?.lat ?? 0,
            longitude: state.filters.destination.selected.lat_lng?.lng ?? 0,
          },
        },
      },
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_AWARE_OPTIMAL",
      computeAlternativeRoutes: false,
    },
  };

  const query = useQuery<RestGooglePostRouteDirectionsSuccessResponseInterface>(
    {
      queryKey: FindTripReactQueryKey.RestGooglePostRouteDirections(payload),
      queryFn: () => {
        return fetchRestGooglePostRouteDirections(payload);
      },
      enabled:
        !!state.filters.origin.selected.lat_lng &&
        !!state.filters.destination.selected.lat_lng,
    },
  );

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      if (
        !state.filters.origin.selected.lat_lng ||
        !state.filters.destination.selected.lat_lng
      )
        return;
      if (!Object.keys(data).length) {
        dispatchGlobal({
          type: GlobalActionEnum.SetAlertData,
          payload: {
            ...globalState.alert,
            items: [
              ...globalState.alert.items,
              {
                id: uuidv4(),
                variant: "error",
                message: "Entschuldigung, wir können deine Route nicht finden.",
              },
            ],
          },
        });
        return;
      }
      if (!data.routes.length) {
        dispatchGlobal({
          type: GlobalActionEnum.SetAlertData,
          payload: {
            ...globalState.alert,
            items: [
              ...globalState.alert.items,
              {
                id: uuidv4(),
                variant: "error",
                message: "Entschuldigung, wir können deine Route nicht finden.",
              },
            ],
          },
        });
        return;
      }
      const encodedPolyline = data.routes[0].polyline.encodedPolyline;
      const decodedPolyline = decode(encodedPolyline).map(([lat, lng]) => ({
        lat,
        lng,
      }));

      dispatch({
        type: FindTripActionEnum.SetMapData,
        payload: {
          ...state.map,
          polyline_path: decodedPolyline,
          marker:
            !!state.filters.origin.selected.item &&
            !!state.filters.destination.selected.item,
          mode: "route",
        },
      });
    }
  }, [query.data, query.isFetching]);

  return query;
};

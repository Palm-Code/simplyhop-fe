import { AxiosError } from "axios";
import { RestGoogleAPICollectionURL } from "@/core/utils/router/constants/google_api";
import { RestGoogleGetDistanceMatrixPayloadRequestInterface } from "@/core/models/rest/google/route";

export const fetchRestGoogleGetDistanceMatrix = async (
  payload?: RestGoogleGetDistanceMatrixPayloadRequestInterface
) => {
  try {
    const params = {
      originLat: String(payload?.params.originLat ?? 0),
      originLng: String(payload?.params.originLng ?? 0),
      destLat: String(payload?.params.destLat ?? 0),
      destLng: String(payload?.params.destLng ?? 0),
    };

    const query = new URLSearchParams(params).toString();

    const url = `${RestGoogleAPICollectionURL.maps.getLocalDistanceMatrix()}?${query}`;

    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    throw (err as AxiosError)?.response?.data || (err as AxiosError)?.response;
  }
};

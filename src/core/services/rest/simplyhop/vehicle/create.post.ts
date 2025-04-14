import axios, { AxiosError } from "axios";
import { ENVIRONMENTS } from "@/core/environments";
import { SimplyHopAPICollectionURL } from "@/core/utils/router/constants/simplyhop_api";
import { PostVehicleCreatePayloadRequestInterface } from "@/core/models/rest/simplyhop/vehicle";

export const fetchPostVehicleCreate = async (
  payload: PostVehicleCreatePayloadRequestInterface
) => {
  try {
    const url = `${
      ENVIRONMENTS.SIMPLY_HOP_API_URL
    }${SimplyHopAPICollectionURL.vehicle.postCreate()}`;

    const res = await axios.post(url, payload.body);
    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response?.data || (err as AxiosError)?.response;
  }
};

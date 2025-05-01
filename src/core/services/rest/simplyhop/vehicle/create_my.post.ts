import { AxiosError } from "axios";
import { ENVIRONMENTS } from "@/core/environments";
import { SimplyHopAPICollectionURL } from "@/core/utils/router/constants/simplyhop_api";
import { PostVehicleCreateMyPayloadRequestInterface } from "@/core/models/rest/simplyhop/vehicle";
import Cookies from "universal-cookie";
import axios from "@/core/utils/axios/functions/base";

export const fetchPostVehicleCreateMy = async (
  payload: PostVehicleCreateMyPayloadRequestInterface
) => {
  try {
    const url = `${
      ENVIRONMENTS.SIMPLY_HOP_API_URL
    }${SimplyHopAPICollectionURL.vehicle.postCreateMy()}`;

    const cookies = new Cookies();
    const token = cookies.get("token");
    const res = await axios.post(url, payload.body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response?.data || (err as AxiosError)?.response;
  }
};

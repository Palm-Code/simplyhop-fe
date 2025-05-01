import { AxiosError } from "axios";
import { ENVIRONMENTS } from "@/core/environments";
import { SimplyHopAPICollectionURL } from "@/core/utils/router/constants/simplyhop_api";
import { GetBookingMyPayloadRequestInterface } from "@/core/models/rest/simplyhop/booking";
import Cookies from "universal-cookie";
import axios from "@/core/utils/axios/functions/base";

export const fetchGetBookingMy = async (
  payload?: GetBookingMyPayloadRequestInterface
) => {
  try {
    const url = `${
      ENVIRONMENTS.SIMPLY_HOP_API_URL
    }${SimplyHopAPICollectionURL.booking.getMy()}`;

    const cookies = new Cookies();
    const token = cookies.get("token");
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: payload?.params,
    });
    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response?.data || (err as AxiosError)?.response;
  }
};

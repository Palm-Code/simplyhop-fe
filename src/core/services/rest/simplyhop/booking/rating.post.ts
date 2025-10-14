import { AxiosError } from "axios";
import { ENVIRONMENTS } from "@/core/environments";
import { SimplyHopAPICollectionURL } from "@/core/utils/router/constants/simplyhop_api";
import Cookies from "universal-cookie";
import { PostBookingRatingPayloadRequestInterface } from "@/core/models/rest/simplyhop/booking";
import axios from "@/core/utils/axios/functions/base";

export const fetchPostBookingRating = async (
  payload: PostBookingRatingPayloadRequestInterface
) => {
  try {
    const url = `${
      ENVIRONMENTS.SIMPLY_HOP_API_URL
    }${SimplyHopAPICollectionURL.booking.postRating(payload.path)}`;

    const cookies = new Cookies();
    const token = cookies.get("token");
    const res = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response?.data || (err as AxiosError)?.response;
  }
};

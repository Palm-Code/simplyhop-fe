import { AxiosError } from "axios";
import { ENVIRONMENTS } from "@/core/environments";
import { SimplyHopAPICollectionURL } from "@/core/utils/router/constants/simplyhop_api";
import { PostAuthDeactivateAccountOTPPayloadRequestInterface } from "@/core/models/rest/simplyhop/auth";
import axios from "@/core/utils/axios/functions/base";

export const fetchPostAuthDeactivateAccountOTP = async (
  payload: PostAuthDeactivateAccountOTPPayloadRequestInterface
) => {
  try {
    const url = `${
      ENVIRONMENTS.SIMPLY_HOP_API_URL
    }${SimplyHopAPICollectionURL.auth.postDeactivateAccountOTP()}`;

    const res = await axios.post(url, payload.body);
    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response?.data || (err as AxiosError)?.response;
  }
};

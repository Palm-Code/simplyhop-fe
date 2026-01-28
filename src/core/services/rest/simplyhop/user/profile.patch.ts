import { AxiosError } from "axios";
import { ENVIRONMENTS } from "@/core/environments";
import { SimplyHopAPICollectionURL } from "@/core/utils/router/constants/simplyhop_api";
import { PatchUserProfilePayloadRequestInterface } from "@/core/models/rest/simplyhop/user";
import Cookies from "universal-cookie";
import axios from "@/core/utils/axios/functions/base";

export const fetchPatchUserProfile = async (
  payload: PatchUserProfilePayloadRequestInterface
) => {
  try {
    const url = `${
      ENVIRONMENTS.SIMPLY_HOP_API_URL
    }${SimplyHopAPICollectionURL.user.patchProfile(payload.path)}`;

    const cookies = new Cookies();
    const token = cookies.get("token");
    const res = await axios.patch(
      url,
      payload.body,
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

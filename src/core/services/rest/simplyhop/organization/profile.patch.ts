import { AxiosError } from "axios";
import { ENVIRONMENTS } from "@/core/environments";
import { SimplyHopAPICollectionURL } from "@/core/utils/router/constants/simplyhop_api";
import { PatchOrganizationProfilePayloadRequestInterface } from "@/core/models/rest/simplyhop/organization";
import Cookies from "universal-cookie";
import axios from "@/core/utils/axios/functions/base";

export const fetchPatchOrganizationProfile = async (
  payload: PatchOrganizationProfilePayloadRequestInterface
) => {
  try {
    const url = `${
      ENVIRONMENTS.SIMPLY_HOP_API_URL
    }${SimplyHopAPICollectionURL.organization.patchProfile(payload.path)}`;

    const cookies = new Cookies();
    const token = cookies.get("token");
    const res = await axios.patch(
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

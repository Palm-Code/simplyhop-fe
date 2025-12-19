import { AxiosError } from "axios";
import { ENVIRONMENTS } from "@/core/environments";
import { SimplyHopAPICollectionURL } from "@/core/utils/router/constants/simplyhop_api";
import { GetOrganizationListPayloadRequestInterface } from "@/core/models/rest/simplyhop/organization";
import axios from "@/core/utils/axios/functions/base";

export const fetchGetOrganizationList = async (
  payload?: GetOrganizationListPayloadRequestInterface
) => {
  try {
    const url = `${
      ENVIRONMENTS.SIMPLY_HOP_API_URL
    }${SimplyHopAPICollectionURL.organization.getList()}`;

    const res = await axios.get(url, {
      params: payload?.params,
    });
    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response?.data || (err as AxiosError)?.response;
  }
};

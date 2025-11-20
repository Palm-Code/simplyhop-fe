import { AxiosError } from "axios";
import { ENVIRONMENTS } from "@/core/environments";
import { SimplyHopAPICollectionURL } from "@/core/utils/router/constants/simplyhop_api";
import { DeleteMessageRoomsUserIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/message_rooms";
import Cookies from "universal-cookie";
import axios from "@/core/utils/axios/functions/base";

export const fetchDeleteMessageRoomsUserId = async (
  payload: DeleteMessageRoomsUserIdPayloadRequestInterface
) => {
  try {
    const url = `${
      ENVIRONMENTS.SIMPLY_HOP_API_URL
    }${SimplyHopAPICollectionURL.message_rooms.deleteUserId(payload.path)}`;

    const cookies = new Cookies();
    const token = cookies.get("token");
    const res = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response?.data || (err as AxiosError)?.response;
  }
};

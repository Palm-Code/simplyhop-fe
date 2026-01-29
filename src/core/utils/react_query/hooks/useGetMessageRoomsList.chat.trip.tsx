import { useQuery } from "@tanstack/react-query";
import { ChatTripReactQueryKey } from "../keys";
import Cookies from "universal-cookie";
import { fetchGetMessageRoomsUnreadList } from "@/core/services/rest/simplyhop/message_rooms";
import {
  GetMessageRoomsUnreadListErrorResponseInterface,
  GetMessageRoomsUnreadListPayloadRequestInterface,
  GetMessageRoomsUnreadListSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/message_rooms";

export const useGetMessageRoomsUnreadList = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const payload: GetMessageRoomsUnreadListPayloadRequestInterface = {
    params: {
      include:
        "messages,passenger,driver,driverExists,passengerExists,messagesExists,booking",
      sort: "-last_message_at",
    },
  };
  const query = useQuery<
    GetMessageRoomsUnreadListSuccessResponseInterface,
    GetMessageRoomsUnreadListErrorResponseInterface
  >({
    queryKey: ChatTripReactQueryKey.GetMessageRoomsUnreadList(payload),
    queryFn: () => {
      return fetchGetMessageRoomsUnreadList(payload);
    },
    enabled: !!token,
    // Polling dengan Page Visibility API protection
    // 1 menit interval + pause saat tab hidden = optimal balance
    refetchInterval: (query) => {
      // Stop polling jika tab di-background untuk prevent freezing
      if (typeof document !== "undefined" && document.hidden) {
        return false;
      }
      return 60000; // 1 menit saat tab active (75% reduction dari 15 detik)
    },
  });

  return query;
};

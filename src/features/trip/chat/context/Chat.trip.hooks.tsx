"use client";
import React from "react";
import { ChatTripContext } from "./Chat.trip.context";
import { ChatTripActionEnum } from "./Chat.trip.types";
import { getDictionaries } from "../i18n";
import { useSearchParams } from "next/navigation";
import { storageService } from "@/core/services/storage/indexdb";
import { AvatarProps } from "@/core/components/avatar";
import { INDEXDB_STORAGE_NAME } from "@/core/utils/indexdb/constants";

export const useSetInitialContextValue = () => {
  const { state, dispatch } = React.useContext(ChatTripContext);
  const dictionaries = getDictionaries();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const setDefaultData = async () => {
    if (!id) {
      await storageService<null | {
        id: number | null;
        header: {
          user_id: number | null;
          type: "driver" | "passenger" | null;
          name: string;
          avatar: AvatarProps;
        };
        booking: {
          status: string | null;
        };
      }>({
        method: "removeItem",
        key: INDEXDB_STORAGE_NAME.CHAT_TRIP_ROOM_DETAIL,
      });
    }

    dispatch({
      type: ChatTripActionEnum.SetListData,
      payload: {
        ...state.list,
        tab: {
          ...state.list.tab,
          selected:
            dictionaries.tab.items.find((_, index) => index === 0) ?? null,
        },
      },
    });
  };

  const setDefaultRoomData = async () => {
    if (!!id) {
      const chatTripRoomDetailStorage = await storageService<null | {
        id: number | null;
        header: {
          user_id: number | null;
          name: string;
          avatar: AvatarProps;
        };
        booking: {
          status: string | null;
        };
      }>({
        method: "getItem",
        key: INDEXDB_STORAGE_NAME.CHAT_TRIP_ROOM_DETAIL,
      });

      if (!!chatTripRoomDetailStorage.data) {
        const data = chatTripRoomDetailStorage.data;
        dispatch({
          type: ChatTripActionEnum.SetRoomData,
          payload: {
            ...state.room,
            id: data.id,
            header: {
              ...state.room.header,
              user_id: data.header.user_id,
              avatar: {
                src: data.header.avatar.src,
                alt: data.header.avatar.alt,
              },
              name: data.header.name,
            },
            booking: {
              status: data.booking.status,
            },
          },
        });
      }
    }
  };

  React.useEffect(() => {
    setDefaultData();
  }, []);

  React.useEffect(() => {
    if (!!id) {
      setDefaultRoomData();
    }
  }, [id]);
};

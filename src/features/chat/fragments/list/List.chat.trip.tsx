"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { ListItemChatTrip } from "../../components/list_item";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import { ChatTripActionEnum, ChatTripContext } from "../../context";
import {
  useGetMessageRoomsList,
  usePutMessageRoomsMarkAsRead,
} from "../../react_query/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import SVGIcon from "@/core/icons";
import { PAGINATION } from "@/core/utils/pagination/contants";
import { MoonLoader } from "@/core/components/moon_loader";
import { InfiniteScrollWrapper } from "@/core/components/infinite_scroll_wrapper";
import { storageService } from "@/core/services/storage/indexdb";
import { INDEXDB_STORAGE_NAME } from "@/core/utils/indexdb/constants";

export const ListChatTrip = () => {
  const router = useRouter();
  const dictionaries = getDictionaries();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { state, dispatch } = React.useContext(ChatTripContext);
  const { isFetching: isFetchingGetMessageRoomsList } =
    useGetMessageRoomsList();
  const { mutateAsync: putMessageRoomsMarkAsRead } =
    usePutMessageRoomsMarkAsRead();

  const isLoading = isFetchingGetMessageRoomsList;

  if (
    isLoading &&
    state.list.message.pagination.current === PAGINATION.NUMBER
  ) {
    return (
      <div
        className={clsx(
          "grid grid-cols-1 place-content-center place-items-center gap-[1rem]",
          "w-full h-[calc(100vh-360px)]"
        )}
      >
        <MoonLoader size={48} color={"#05912A"} />
      </div>
    );
  }

  if (!state.list.message.items.length && !isLoading) {
    return (
      <div
        className={clsx(
          "grid grid-cols-1 place-content-center place-items-center gap-[1rem]",
          "w-full h-[calc(100vh-360px)]",
          "overflow-auto"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 place-content-center place-items-center",
            "w-full"
          )}
        >
          <SVGIcon
            name="MessageSquare"
            className={clsx("w-[3rem] h-[3rem]", "text-[#C2C2C2]")}
          />
          <span className={clsx("text-[1rem] text-[#C2C2C2] font-medium")}>
            {dictionaries.chat.list.empty.message}
          </span>
        </div>
      </div>
    );
  }

  const handleClickList = async (data: { id: string; booking_id: string }) => {
    await storageService({
      method: "setItem",
      key: INDEXDB_STORAGE_NAME.CHAT_TRIP_ROOM_DETAIL,
      value: {
        id: data.id,
        header: {
          user_id:
            state.list.message.items.find((item) => item.id === data.id)
              ?.user_id ?? null,
          avatar: {
            src:
              state.list.message.items.find((item) => item.id === data.id)
                ?.avatar.src ?? "",
            alt:
              state.list.message.items.find((item) => item.id === data.id)
                ?.avatar.alt ?? "",
          },
          name:
            state.list.message.items.find((item) => item.id === data.id)
              ?.name ?? "",
        },
        booking: {
          status:
            state.list.message.items.find((item) => item.id === data.id)
              ?.booking_status ?? null,
        },
      },
    });
    dispatch({
      type: ChatTripActionEnum.SetRoomData,
      payload: {
        ...state.room,
        message: {
          ...state.room.message,
          items: String(id) === data.id ? state.room.message.items : [],
          pagination: {
            ...state.room.message.pagination,
            current: 1,
          },
        },
        chat: {
          ...state.room.chat,
          input: {
            ...state.room.chat.input,
            value: "",
          },
        },
      },
    });
    putMessageRoomsMarkAsRead(data);

    dispatch({
      type: ChatTripActionEnum.SetListData,
      payload: {
        ...state.list,
        message: {
          ...state.list.message,
          items: state.list.message.items.map((item) => {
            return {
              ...item,
              isNew:
                item.id === data.id && item.booking_id === data.booking_id
                  ? false
                  : item.isNew,
            };
          }),
        },
      },
    });

    router.push(
      `${AppCollectionURL.private.chat()}?id=${data.id}&bookingId=${
        data.booking_id
      }`
    );
  };

  const handleLoadMore = () => {
    if (isLoading) return;
    dispatch({
      type: ChatTripActionEnum.SetListMessagePaginationCurrent,
      payload: state.list.message.pagination.current + 1,
    });
  };

  const isEndReached =
    state.list.message.pagination.last ===
    state.list.message.pagination.current;

  return (
    <InfiniteScrollWrapper
      loader={
        <div
          className={clsx(
            "grid grid-cols-1 place-content-center place-items-center gap-[1rem]",
            "w-full h-[calc(100vh-360px)]"
          )}
        >
          <MoonLoader size={48} color={"#05912A"} />
        </div>
      }
      isPaused={isLoading}
      isEndReached={isEndReached}
      onLoadMore={handleLoadMore}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
          "w-full max-h-[calc(100vh-360px)]",
          "overflow-auto"
        )}
      >
        {state.list.message.items.map((item, itemIndex) => (
          <button
            aria-label={item.name}
            name={item.name}
            key={itemIndex}
            className={clsx("cursor-pointer", "w-full")}
            onClick={() =>
              handleClickList({
                id: item.id,
                booking_id: item.booking_id,
              })
            }
          >
            <ListItemChatTrip {...item} selected={String(id) === item.id} />
          </button>
        ))}
      </div>
    </InfiniteScrollWrapper>
  );
};

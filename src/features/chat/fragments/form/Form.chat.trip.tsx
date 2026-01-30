import * as React from "react";
import clsx from "clsx";
import { ChatTripActionEnum, ChatTripContext } from "../../context";
import SVGIcon from "@/core/icons";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { ChatField } from "@/core/components/chatfield";
import { getDictionaries } from "../../i18n";
import { usePostMessagesChat } from "../../react_query/hooks";
import { MoonLoader } from "@/core/components/moon_loader";
import { useSearchParams } from "next/navigation";

export const FormChatTrip = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(ChatTripContext);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [isEmojiOpen, setIsEmojiOpen] = React.useState<boolean>(false);
  const { mutateAsync: postMessagesChat, isPending: isPendingPostMessageChat } =
    usePostMessagesChat();
  const handleClickEmoji = () => {
    setIsEmojiOpen((prev) => !prev);
  };

  const handleChangeChat = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ChatTripActionEnum.SetRoomData,
      payload: {
        ...state.room,
        chat: {
          ...state.room.chat,
          input: {
            ...state.room.chat.input,
            value: e.currentTarget.value,
          },
        },
      },
    });
  };

  const handleSelectEmoji = (emojiData: EmojiClickData) => {
    dispatch({
      type: ChatTripActionEnum.SetRoomData,
      payload: {
        ...state.room,
        chat: {
          ...state.room.chat,
          input: {
            ...state.room.chat.input,
            value: state.room.chat.input.value + emojiData.emoji,
          },
        },
      },
    });
    setIsEmojiOpen(false);
  };

  const handleClickSend = async () => {
    if (!state.room.chat.input.value.length) return;
    const res = await postMessagesChat();
    if (!res) return;

    dispatch({
      type: ChatTripActionEnum.SetListMessageItems,
      payload: state.list.message.items.map((item) => {
        return {
          ...item,
          message: item.id === id ? state.room.chat.input.value : item.message,
        };
      }),
    });
    dispatch({
      type: ChatTripActionEnum.SetRoomData,
      payload: {
        ...state.room,
        message: {
          ...state.room.message,
          pagination: {
            ...state.room.message.pagination,
            current: 1,
            counter: state.room.message.pagination.counter + 1,
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
  };

  const isLoadingSendChat = isPendingPostMessageChat;
  const isBookingStatusAccepted = state.room.booking.status === "accepted";
  const isDisabledSendChat =
    isPendingPostMessageChat || state.room.booking.status !== "accepted";

  const isBlocked =
    state.user_profile.data?.i_blocked || state.user_profile.data?.blocked_me;
  const isUserDoBlock = state.user_profile.data?.i_blocked;

  const handleClickDeleteChat = () => {
    dispatch({
      type: ChatTripActionEnum.SetDeleteChatConfirmationData,
      payload: {
        ...state.delete_chat_confirmation,
        is_open: true,
      },
    });
  };

  const handleClickUnblock = () => {
    dispatch({
      type: ChatTripActionEnum.SetUnblockConfirmationData,
      payload: {
        ...state.unblock_confirmation,
        is_open: true,
      },
    });
  };

  if (isBlocked && isUserDoBlock) {
    return (
      <div
        className={clsx(
          "grid grid-cols-2 place-content-center place-items-center gap-[1rem]",
          "w-full",
          "border-t border-t-[#DFDFDF] dark:border-[#464646]",
          "px-[0.75rem] py-[1rem]",
        )}
      >
        <button
          className={clsx(
            "flex items-center justify-center",
            "w-full",
            "px-[0.75rem] py-[0.75rem]",
            "rounded-[6px]",
            "bg-[white] dark:bg-[#232323] disabled:bg-[#F6F6F6] dark:disabled:bg-[#5B5B5B]",
            "text-[#B30606] disabled:text-[#A6A6A6] text-[1rem] font-semibold",
            "border border-[#B30606]",
            "box-border",
          )}
          onClick={handleClickDeleteChat}
        >
          {"Chat löschen"}
        </button>
        <button
          className={clsx(
            "flex items-center justify-center",
            "w-full",
            "px-[0.75rem] py-[0.75rem]",
            "rounded-[6px]",
            "bg-[#249124] dark:bg-[#33CC33] disabled:bg-[#F6F6F6] dark:disabled:bg-[#5B5B5B]",
            "text-[#232323] dark:text-white disabled:text-[#A6A6A6] text-[1rem] font-semibold",
          )}
          onClick={handleClickUnblock}
        >
          {"Entblocken"}
        </button>
      </div>
    );
  }
  if (isBlocked && !isUserDoBlock) {
    return (
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start",
          "w-full",
          "border-t border-t-[#DFDFDF] dark:border-t-[#464646]",
          "px-[0.75rem] py-[1rem]",
          "bg-[#F6F6F6CC] dark:bg-[#292929]",
        )}
      >
        <p
          className={clsx(
            "text-[#767676] dark:text-[#C3C3C3] text-[1rem] font-normal",
          )}
        >
          {"Entschuldigung, du kannst dieser Person keine Nachricht senden."}
        </p>
      </div>
    );
  }
  if (!isBookingStatusAccepted) {
    return (
      <div
        className={clsx(
          "grid grid-cols-[24px_1fr] items-center content-center justify-start justify-items-start gap-2",
          "w-full",
          "border-t border-t-[#DFDFDF] dark:border-t-[#464646]",
          "px-[0.75rem] py-[1rem]",
          "bg-[#F6F6F6CC] dark:bg-[#292929]",
        )}
      >
        <SVGIcon
          name="Info"
          className={clsx("w-6 h-6", "text-[#767676] dark:text-[#C3C3C3]")}
        />
        <p
          className={clsx(
            "text-[#767676] dark:text-[#C3C3C3] text-[0.625rem] sm:text-[0.875rem] font-normal",
          )}
        >
          {
            "Der Direktchat ist deaktiviert, bis sich beide Parteien über die Fahrtkonfiguration und den Preis geeinigt haben."
          }
        </p>
      </div>
    );
  }
  return (
    <div
      className={clsx(
        "grid-cols-[1.5rem_1fr_auto]",
        "grid items-center content-center justify-start justify-items-start gap-[0.625rem]",
        "w-full sticky bottom-0",
        "bg-[white] dark:bg-[#232323]",
        "px-[1rem] lg:px-[2.5rem] py-[1rem]",
        "h-[72px]",
        "border-t border-t-[#E9E6E6] dark:border-t-[#464646]",
      )}
    >
      <div className={clsx("relative")}>
        <button
          aria-label={"Emoji"}
          name={"Emoji"}
          onClick={() => {
            if (isDisabledSendChat) return;
            handleClickEmoji();
          }}
        >
          <SVGIcon
            name="Smile"
            className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#BDBDBD]")}
          />
        </button>
        {isEmojiOpen && (
          <EmojiPicker
            className={clsx(
              "!absolute",
              "top-[-480px] lg:left-[-175px] left-[0px]",
              "z-[10]",
            )}
            onEmojiClick={handleSelectEmoji}
          />
        )}
      </div>

      <ChatField
        labelProps={{ ...dictionaries.chat.room.message.labelProps }}
        inputProps={{
          ...dictionaries.chat.room.message.inputProps,
          disabled: state.room.booking.status !== "accepted",
          value: state.room.chat.input.value,
          onChange: handleChangeChat,
          onKeyDown: (e) => {
            if (e.key === "Enter" && !isLoadingSendChat) {
              handleClickSend();
            }
          },
        }}
      />
      <button
        aria-label={dictionaries.chat.room.cta.send.children}
        name={dictionaries.chat.room.cta.send.children}
        className={clsx(
          "grid grid-flow-col place-content-center place-items-center gap-[0.625rem]",
          "px-[0.75rem] py-[0.625rem]",
          "bg-[#249124] dark:bg-[#33CC33] disabled:bg-[#F6F6F6] dark:disabled:bg-[#5B5B5B]",
          "rounded-[0.375rem]",
          "text-[0.875rem] text-[white] dark:text-[#232323] disabled:text-[#5B5B5B] dark:disabled:text-[#C3C3C3] font-normal",
        )}
        type="submit"
        disabled={isDisabledSendChat}
        onClick={handleClickSend}
      >
        {dictionaries.chat.room.cta.send.children}
        {isLoadingSendChat ? (
          <MoonLoader size={16} color={"white"} />
        ) : (
          <SVGIcon
            name="SendHorizonal"
            className={clsx(
              "w-[1rem] h-[1rem]",
              isDisabledSendChat
                ? "text-[#5B5B5B] dark:text-[#C3C3C3]"
                : "text-[white] dark:text-[#232323]",
            )}
          />
        )}
      </button>
    </div>
  );
};

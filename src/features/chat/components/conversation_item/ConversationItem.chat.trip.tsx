import * as React from "react";
import clsx from "clsx";
import { SenderMessageItemChatTripProps } from "../sender_message_item";
import { RecipientMessageItemChatTripProps } from "../recipient_message_item";
import SenderMessageItemChatTrip from "../sender_message_item/SenderMessageItem.chat.trip";
import RecipientMessageItemChatTrip from "../recipient_message_item/RecipientMessageItem.chat.trip";

export interface ConversationItemChatTripProps {
  chats?:
    | (SenderMessageItemChatTripProps & { type?: string }[])
    | (RecipientMessageItemChatTripProps & { type?: string }[]);
}

export const ConversationItemChatTrip = ({
  chats = [],
}: ConversationItemChatTripProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      {chats.map((chat, chatIndex) => {
        const { type, ...otherChatProps } = chat;
        if (type === "sender") {
          return (
            <SenderMessageItemChatTrip {...otherChatProps} key={chatIndex} />
          );
        }
        return (
          <RecipientMessageItemChatTrip {...otherChatProps} key={chatIndex} />
        );
      })}
    </div>
  );
};

import * as React from "react";
import clsx from "clsx";
import { Avatar, AvatarProps } from "@/core/components/avatar";

export interface SenderMessageItemChatTripProps {
  id?: string;
  time?: string;
  name?: string;
  avatar?: AvatarProps;
  message?: string;
}

export default function SenderMessageItemChatTrip({
  id = "",
  time = "",
  name = "",
  avatar,
  message = "",
}: SenderMessageItemChatTripProps) {
  return (
    <div
      id={id}
      className={clsx(
        "grid grid-cols-1 items-start content-start justify-end justify-items-end gap-[1rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-flow-col items-start content-start justify-end justify-items-end gap-[1rem]"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-end justify-items-end gap-[1rem]"
          )}
        >
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-end justify-items-end gap-[0.75rem]"
            )}
          >
            <span
              className={clsx(
                "text-[#5B5B5B] dark:text-[#DADADA] text-[0.75rem] font-normal"
              )}
            >
              {time}
            </span>
            <span
              className={clsx(
                "text-[#232323] dark:text-white text-[0.75rem] font-medium"
              )}
            >
              {name}
            </span>
          </div>

          <div
            className={clsx(
              "bg-[#249124] dark:bg-[#33CC33]",
              "rounded-tl-[0.875rem] rounded-br-[0.875rem] rounded-bl-[0.875rem]",
              "px-[1.5rem] py-[1rem]",
              "max-w-[351px]",
              "text-[white] dark:text-[#232323] text-[1rem] font-normal"
            )}
          >
            {message}
          </div>
        </div>

        <Avatar {...avatar} className={clsx("w-[2.25rem] h-[2.25rem]")} />
      </div>
    </div>
  );
}

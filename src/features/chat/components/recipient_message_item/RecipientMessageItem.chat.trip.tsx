import * as React from "react";
import clsx from "clsx";
import { Avatar, AvatarProps } from "@/core/components/avatar";

export interface RecipientMessageItemChatTripProps {
  id?: string;
  time?: string;
  name?: string;
  avatar?: AvatarProps;
  message?: string;
}

export default function RecipientMessageItemChatTrip({
  id = "",
  time = "",
  name = "",
  avatar,
  message = "",
}: RecipientMessageItemChatTripProps) {
  return (
    <div
      id={id}
      className={clsx(
        "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[1rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-flow-col items-start content-start justify-start justify-items-start gap-[1rem]"
        )}
      >
        <Avatar {...avatar} className={clsx("w-[2.25rem] h-[2.25rem]")} />
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[1rem]"
          )}
        >
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.75rem]"
            )}
          >
            <span
              className={clsx(
                "text-[#232323] dark:text-[#FFFFFF] text-[0.75rem] font-medium"
              )}
            >
              {name}
            </span>
            <span
              className={clsx(
                "text-[#5B5B5B] dark:text-[#DADADA] text-[0.75rem] font-normal"
              )}
            >
              {time}
            </span>
          </div>

          <div
            className={clsx(
              "bg-[white] dark:bg-[#232323]",
              "border border-[#E9E6E6] dark:border-[#464646]",
              "rounded-tr-[0.875rem] rounded-br-[0.875rem] rounded-bl-[0.875rem]",
              "px-[1.5rem] py-[1rem]",
              "max-w-[351px]",
              "text-[#232323] dark:text-white text-[1rem] font-normal"
            )}
          >
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}

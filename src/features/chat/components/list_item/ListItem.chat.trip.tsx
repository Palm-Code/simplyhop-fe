import * as React from "react";
import clsx from "clsx";
import { Avatar, AvatarProps } from "@/core/components/avatar";

export interface ListItemChatTripProps {
  id?: string;
  avatar?: AvatarProps;
  name?: string;
  message?: string;
  date?: string;
  isNew?: boolean;
  selected?: boolean;
}

export const ListItemChatTrip = ({
  id = "",
  avatar,
  name = "",
  message = "",
  date = "",
  isNew = false,
  selected = false,
}: ListItemChatTripProps) => {
  return (
    <div
      id={id}
      className={clsx(
        "grid grid-flow-col items-start content-start justify-between justify-items-start gap-[1.5rem]",
        "w-full",
        selected ? "bg-[#EFF9EC]" : "hover:bg-[#EFF9EC]",
        "py-[0.5rem] px-[0.25rem]"
      )}
    >
      <div
        className={clsx(
          "grid grid-flow-col items-start content-start justify-between justify-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        <Avatar {...avatar} className={clsx("w-[2.5rem] h-[2.5rem]")} />

        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[0.25rem]",
            "w-full"
          )}
        >
          <p className={clsx("text-[1rem] text-[#141414] font-semibold")}>
            {name}
          </p>
          <p
            className={clsx(
              "text-[0.875rem] text-[#4F5665] font-normal text-left",
              "line-clamp-1 text-ellipsis",
              "w-full"
            )}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        </div>
      </div>

      <div
        className={clsx(
          "grid grid-rows-1 grid-cols-1 items-stretch content-between justify-end justify-items-end",
          "h-full",
          "pb-[0.5rem]"
        )}
      >
        <span className={clsx("text-[0.625rem] text-[#4F5665] font-normal")}>
          {date}
        </span>
        {isNew && (
          <div
            className={clsx(
              "w-[0.75rem] h-[0.75rem]",
              "bg-[#33CC33]",
              "rounded-[50%]"
            )}
          />
        )}
      </div>
    </div>
  );
};

import * as React from "react";
import clsx from "clsx";
import Link from "next/link";
import SVGIcon from "@/core/icons";
import { Avatar, AvatarProps } from "@/core/components/avatar";

export interface RoomHeaderChatTripProps {
  avatar?: AvatarProps;
  name?: string;
  href?: string;
}

export const RoomHeaderChatTrip = ({
  avatar,
  name = "",
  href = "",
}: RoomHeaderChatTripProps) => {
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-items-start justify-start gap-[0.75rem]",
        "w-full",
        "px-[1rem] py-[0.75rem] lg:px-[2.25rem] lg:py-[0.75rem]",
        "border-b border-b-[#E9E9E9]"
      )}
    >
      <Link href={href} className={clsx("block lg:hidden")}>
        <SVGIcon
          name="ArrowLeft"
          className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#5B5B5B]")}
        />
      </Link>
      <Avatar {...avatar} className={clsx("w-[2.25rem] h-[2.25rem]")} />

      <div
        className={clsx(
          "grid grid-cols-1 items-center content-center justify-start justify-items-start gap-[0rem]"
        )}
      >
        <h2 className={clsx("text-[#141414] text-[1rem] font-semibold")}>
          {name}
        </h2>
      </div>
    </div>
  );
};

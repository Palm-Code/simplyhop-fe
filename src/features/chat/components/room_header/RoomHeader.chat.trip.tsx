import * as React from "react";
import clsx from "clsx";
import Link from "next/link";
import SVGIcon from "@/core/icons";
import { AvatarProps } from "@/core/components/avatar";
import { DriverProfileLabel } from "@/core/components/driver_profile_label";
import {
  DriverRatingLabel,
  DriverRatingLabelProps,
} from "@/core/components/driver_rating_label";

export interface RoomHeaderChatTripProps {
  avatar?: AvatarProps;
  name?: string;
  href?: string;
  cta?: {
    onClick?: () => void;
  };
  rating?: DriverRatingLabelProps;
}

export const RoomHeaderChatTrip = ({
  avatar,
  name = "",
  href = "",
  cta = {
    onClick: () => {},
  },
  rating,
}: RoomHeaderChatTripProps) => {
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-items-start justify-start gap-[0.75rem]",
        "w-full",
        "px-[1rem] py-[0.75rem] lg:px-[2.25rem] lg:py-[0.75rem]",
        "border-b border-b-[#E9E6E6] dark:border-b-[#464646]",
        "bg-white dark:bg-[#232323]",
        "h-20"
      )}
    >
      <Link href={href} className={clsx("block xl:hidden")}>
        <SVGIcon
          name="ArrowLeft"
          className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#5B5B5B]")}
        />
      </Link>

      <button
        className={clsx(
          "grid grid-flow-col items-center content-center justify-items-start justify-start gap-[0.75rem]",
          "w-full",
          "cursor-pointer"
        )}
        onClick={cta.onClick}
      >
        <DriverProfileLabel
          id={"id"}
          avatar={avatar}
          name={name}
          icon={{
            name: "User",
            className: "w-4 h-4 text-[#767676]",
          }}
        />
        {rating && <DriverRatingLabel {...rating} />}
      </button>
    </div>
  );
};

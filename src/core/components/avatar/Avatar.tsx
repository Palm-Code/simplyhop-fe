import Image from "next/image";
import * as React from "react";
import clsx from "clsx";
import SVGIcon, { SVGIconProps } from "@/core/icons";
import { Skeleton } from "../skeleton";

export interface AvatarProps {
  src?: string | null;
  alt?: string;
  variant?: "skeleton" | "avatar";
  iconName?: SVGIconProps["name"];
  className?: string;
}

export const Avatar = ({
  src,
  alt = "User avatar",
  variant = "avatar",
  iconName = "User",
  className,
}: AvatarProps) => {
  if (variant === "skeleton") {
    return (
      <div
        className={clsx(
          "flex items-center justify-center",
          "rounded-[50%]",
          "bg-[#33CC33]",
          "overflow-clip",
          "relative",
          className
        )}
      >
        <Skeleton circle width={130} height={130} />
      </div>
    );
  }
  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        "rounded-[50%]",
        "bg-[#33CC33]",
        "overflow-clip",
        "relative",
        className
      )}
    >
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 10240px) 48px, (min-width: 1024px) 64px, 80px"
          className={clsx("object-cover", "w-full h-full")}
        />
      )}
      {!src && (
        <SVGIcon
          name={iconName}
          className={clsx("w-2/3 h-2/3", "text-[white]")}
        />
      )}
    </div>
  );
};

import * as React from "react";
import clsx from "clsx";

export interface MapInfoWindowProps {
  title?: string;
  description?: string;
}

export const MapInfoWindow = ({
  title = "",
  description = "",
}: MapInfoWindowProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.375rem]",
        "w-[120px] lg:w-[228px]"
      )}
    >
      <p
        className={clsx(
          "text-[0.5rem] lg:text-[0.625rem] text-[#232323B2] font-extralight"
        )}
      >
        {title}
      </p>
      <p
        className={clsx(
          "text-[0.75rem] lg:text-[1rem] text-[#232323] font-semibold line-clamp-1 text-ellipsis"
        )}
      >
        {description}
      </p>
    </div>
  );
};

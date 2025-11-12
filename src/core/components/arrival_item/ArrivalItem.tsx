import * as React from "react";
import clsx from "clsx";
import { Tooltip as ReactTooltip } from "react-tooltip";
import SVGIcon from "@/core/icons";

export interface ArrivalItemProps {
  place?: string;
  time?: string;
}

export const ArrivalItem = ({ place = "", time = "" }: ArrivalItemProps) => {
  return (
    <div
      className={clsx("grid grid-cols-1 place-content-start place-items-start")}
    >
      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.25rem]",
          "w-full"
        )}
      >
        <p
          className={clsx(
            "text-[0.75rem] font-normal text-[#8C8D89] lg:truncate lg:text-ellipsis max-lg:line-clamp-2",
            "w-full"
          )}
        >
          {place}
        </p>
        <div
          className={clsx(
            "flex items-center justify-center",
            "w-[1rem] h-[1rem]"
          )}
        >
          <SVGIcon
            data-tooltip-id={place}
            name="Info"
            className={clsx(
              "w-[0.75rem] h-[0.75rem]",
              "stroke-[#667085]",
              "inline-block"
            )}
          />
          <ReactTooltip
            id={place}
            place="bottom"
            variant="info"
            className={clsx(
              "!bg-[white] !shadow-lg",
              "!text-[#212121] !text-[0.75rem] !font-normal",
              "!max-w-[250px]",
              "!px-[0.75rem] !py-[0.5rem]",
              "!rounded",
              "!opacity-100"
            )}
            content={place}
          />
        </div>
      </div>
      <p
        className={clsx(
          "text-[0.875rem] font-semibold text-[black]"
        )}
      >
        {time}
      </p>
    </div>
  );
};

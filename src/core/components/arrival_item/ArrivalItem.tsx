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
            "text-[0.75rem] font-medium text-[#232323] dark:text-white lg:truncate lg:text-ellipsis max-lg:line-clamp-2",
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
              "stroke-[#667085] dark:stroke-white",
              "inline-block"
            )}
          />
          <ReactTooltip
            id={place}
            place="bottom"
            variant="info"
            className={clsx(
              "!bg-[white] dark:!bg-[#232323] !shadow-lg",
              "!text-[#212121] dark:!text-white !text-[0.75rem] !font-normal",
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
          "text-[0.875rem] font-semibold text-[black] dark:text-white"
        )}
      >
        {time}
      </p>
    </div>
  );
};

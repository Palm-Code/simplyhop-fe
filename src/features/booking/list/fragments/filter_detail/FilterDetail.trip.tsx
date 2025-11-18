"use client";
import * as React from "react";
import clsx from "clsx";
import {
  ResultTripActionEnum,
  ResultTripContext,
  useRideFilterResultTrip,
} from "../../context";
import SVGIcon from "@/core/icons";
import dayjs from "dayjs";
import { Button } from "@/core/components/button";

export const FilterDetailTrip = () => {
  const { state, dispatch } = React.useContext(ResultTripContext);
  useRideFilterResultTrip();
  const handleClickOpenFilter = () => {
    dispatch({
      type: ResultTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        is_open: true,
      },
    });
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[2rem]",
        "w-full max-w-container",
        "px-[1rem] py-[0.75rem]",
        "bg-[#FFFFFF] dark:bg-[#232323]",
        "rounded-[1.25rem]"
      )}
      style={{
        backdropFilter: "blur(20px)",
        boxShadow: "0px 0px 15px 0px #0A31001A",
      }}
    >
      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-between justify-items-start gap-[0.25rem]",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[0.25rem]",
            "w-full"
          )}
        >
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-between justify-items-start gap-[0.25rem]",
              "w-full"
            )}
          >
            <p
              className={clsx(
                "text-[black] text-[0.875rem] font-semibold truncate text-ellipsis",
                "w-[5rem]"
              )}
            >
              {state.filters.origin.selected.item?.name ?? ""}
            </p>
            <span className={clsx("text-[black] text-[0.875rem] font-normal")}>
              to
            </span>
            <p
              className={clsx(
                "text-[black] text-[0.875rem] font-semibold truncate text-ellipsis",
                "w-[5rem]"
              )}
            >
              {state.filters.destination.selected.item?.name ?? ""}
            </p>
          </div>

          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
              "w-full"
            )}
          >
            <div
              className={clsx(
                "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.25rem]",
                "w-full"
              )}
            >
              <SVGIcon
                name="Calendar"
                className={clsx("w-[1rem] h-[1rem]", "text-[#5B5B5B]")}
              />
              <span
                className={clsx("text-[#5B5B5B] text-[0.875rem] font-normal")}
              >
                {Array.isArray(state.filters.date.selected) 
                  ? state.filters.date.selected.length > 1
                    ? `${state.filters.date.selected.length} Tage ausgewählt`
                    : dayjs(state.filters.date.selected[0]).format("DD.MM.YY")
                  : dayjs(state.filters.date.selected).format("DD.MM.YY")
                }
              </span>
            </div>

            <div
              className={clsx("w-[5px] h-[5px]", "rounded-[]", "bg-[#D9D9D9]")}
            />

            <div
              className={clsx(
                "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.25rem]",
                "w-full"
              )}
            >
              <SVGIcon
                name="User2"
                className={clsx("w-[1rem] h-[1rem]", "text-[#5B5B5B]")}
              />
              <span
                className={clsx("text-[#5B5B5B] text-[0.875rem] font-normal")}
              >
                {state.filters.passenger.value.reduce((acc, item) => {
                  return acc + item.value;
                }, 0)}
              </span>
            </div>
          </div>
        </div>
        <Button
          aria-label={"Ändern"}
          name={"Ändern"}
          variant="secondary"
          className={clsx("!px-[1rem] !py-[0.5rem]")}
          onClick={handleClickOpenFilter}
        >
          {"Ändern"}
        </Button>
      </div>
    </div>
  );
};

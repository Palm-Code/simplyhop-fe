"use client";
import * as React from "react";
import clsx from "clsx";
import SVGIcon from "@/core/icons";
import { useOnClickOutside } from "usehooks-ts";

export interface SortDropdownListTripProps {
  selected?: { id: string; name: string } | null;
  label?: string;
  items?: { id: string; name: string }[];
  onSelect?: (data: { id: string; name: string }) => void;
}

export const SortDropdownListTrip = ({
  selected = null,
  label = "",
  items = [],
  onSelect = () => {},
}: SortDropdownListTripProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref as any, () => {
    setIsOpen(false);
  });
  const handleClickDropdownButton = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div ref={ref} className={clsx("relative")}>
      <button
        className={clsx(
          "grid grid-flow-col place-content-center place-items-center gap-[0.5rem]",
          "px-[0.5rem] py-[0.5rem]",
          "bg-[white] dark:bg-[#232323]",
          "border border-[#E9E6E6] dark:border-[#464646]",
          "rounded-[0.75rem]",
          "text-[0.875rem] font-medium",
          "text-[#979797] dark:text-[#C3C3C3]",
          "cursor-pointer"
        )}
        onClick={handleClickDropdownButton}
      >
        <SVGIcon
          name={"ArrowDownWideNarrow"}
          className={clsx(
            "w-[0.75rem] h-[0.75rem]",
            "text-[#979797] dark:text-[#C3C3C3]"
          )}
        />
        {label}
      </button>

      {isOpen && (
        <div
          className={clsx(
            "absolute top-[40px] right-0",
            "bg-[white] dark:bg-[#232323]",
            "border border-[#E9E6E6] dark:border-[#464646]",
            "rounded-[0.5rem] w-[255px]",
            "max-h-[200px]",
            "overflow-auto",
            "px-[1rem] py-[1rem]"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[0.75rem]",
              "w-full"
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
                "w-full"
              )}
            >
              {items.map((item, itemIndex) => (
                <button
                  aria-label={item.name}
                  name={item.name}
                  key={itemIndex}
                  className={clsx(
                    "grid grid-flow-col items-center content-center justify-start justify-items-start",
                    "w-full",
                    "text-[0.875rem] text-left",
                    selected?.id === item.id
                      ? "text-[#33CC33] font-semibold"
                      : "text-[#232323] dark:text-[white] font-medium",
                    "cursor-pointer"
                  )}
                  onClick={() => {
                    setIsOpen(false);
                    onSelect(item);
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

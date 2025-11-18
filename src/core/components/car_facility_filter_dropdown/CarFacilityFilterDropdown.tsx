import * as React from "react";
import clsx from "clsx";
import SVGIcon from "@/core/icons";
import { useOnClickOutside } from "usehooks-ts";
import { VehicleFilterOption } from "../vehicle_filter_checkbox";

export interface CarFacilityFilterDropdownProps {
  selected?: { id: string; name: string }[];
  label?: string;
  items?: { id: string; name: string }[];
  variant?: "multiple" | "single";
  onSelect?: (data: { id: string; name: string }) => void;
  onReset?: () => void;
}

export const CarFacilityFilterDropdown = ({
  selected = [],
  label = "",
  items = [],
  variant = "multiple",
  onSelect = () => {},
  onReset = () => {},
}: CarFacilityFilterDropdownProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref as any, () => {
    setIsOpen(false);
  });
  const handleClickDropdownButton = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div ref={ref} className={clsx(isOpen && "relative", "rounded-[1.25rem]")}>
      <button
        aria-label={label}
        name={label}
        className={clsx(
          "grid grid-flow-col place-content-center place-items-center gap-[0.5rem]",
          "px-[0.5rem] py-[0.25rem]",
          "bg-[white] dark:bg-[#232323]",
          "border",
          isOpen
            ? "border-[#33CC33]"
            : !!selected.length
            ? "border-[#33CC33]"
            : "border-[#E9E6E6] dark:border-[#464646]",
          "rounded-[1.25rem]",
          "text-[0.875rem] font-medium",
          isOpen
            ? "text-[#33CC33]"
            : !!selected.length
            ? "text-[#33CC33]"
            : "text-[#636262] dark:text-[#E9E6E6]",
          "cursor-pointer"
        )}
        onClick={handleClickDropdownButton}
      >
        {label}

        <SVGIcon
          name={isOpen ? "ChevronUp" : "ChevronDown"}
          className={clsx(
            "w-[1.25rem] h-[1.25rem]",
            isOpen
              ? "text-[#33CC33]"
              : !!selected.length
              ? "text-[#33CC33]"
              : "text-[#636262]"
          )}
        />
        {!!selected.length && (
          <div
            className={clsx(
              "flex items-center justify-center",
              "bg-[#33CC33]",
              "w-[1.125rem] h-[1.125rem]",
              "rounded-[50%]",
              "cursor-pointer"
            )}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onReset();
            }}
          >
            <SVGIcon
              name={"X"}
              className={clsx("w-[0.875rem] h-[0.875rem]", "text-[white]")}
            />
          </div>
        )}
      </button>

      {isOpen && (
        <div
          className={clsx(
            "absolute top-[40px] left-0 right-0",
            "bg-[white] dark:bg-[#232323]",
            "rounded-[0.75rem]",
            "max-h-[200px] w-[255px]",
            "overflow-auto",
            "px-[1rem] py-[1rem]"
          )}
          style={{
            backdropFilter: "blur(20px)",
            boxShadow: "0px 0px 25px 0px #969C9640",
          }}
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
                <VehicleFilterOption
                  key={itemIndex}
                  label={item.name}
                  optionVariant={variant === "multiple" ? "checkbox" : "radio"}
                  checked={selected
                    .map((selectedItem) => selectedItem.id)
                    .includes(item.id)}
                  value={item.id}
                  onChange={() => onSelect(item)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

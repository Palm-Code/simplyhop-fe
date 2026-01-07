import * as React from "react";
import clsx from "clsx";
import { VehicleFilterOption } from "../vehicle_filter_checkbox";

export interface VehicleFilterListProps {
  selected?: { id: string; name: string }[];
  label?: string;
  items?: { id: string; name: string }[];
  variant?: "multiple" | "single";
  onSelect?: (data: { id: string; name: string }) => void;
}

export const VehicleFilterList = ({
  selected = [],
  label = "",
  items = [],
  variant = "single",
  onSelect = () => {},
}: VehicleFilterListProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.75rem]",
        "w-full"
      )}
    >
      <p className={clsx("text-[#232323] dark:text-white text-[0.875rem] lg:text-[1rem] font-semibold")}>
        {label}
      </p>

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
            onChange={() => onSelect(item)}
          />
        ))}
      </div>
    </div>
  );
};

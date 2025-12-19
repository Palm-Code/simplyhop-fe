import * as React from "react";
import clsx from "clsx";
import SVGIcon from "@/core/icons";
import { useOnClickOutside } from "usehooks-ts";
import { DropdownSelectButton } from "@/core/components/dropdown_select_button";

export interface CompanyTypeDropdownProps {
  selected?: null | { id: string; name: string; description: string };
  items?: {
    id: string;
    name: string;
    description: string;
  }[];
  label?: string;
  onSelect?: (data: { id: string; name: string; description: string }) => void;
}

export const CompanyTypeDropdown = ({
  selected = null,
  items = [],
  label,
  onSelect = () => {},
}: CompanyTypeDropdownProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref as any, () => {
    setIsOpen(false);
  });

  const handleClickDropdownSelectButton = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (data: {
    id: string;
    name: string;
    description: string;
  }) => {
    onSelect(data);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className={clsx("relative", "w-full")}>
      <DropdownSelectButton
        className={clsx(
          "items-center! content-center!",
          "text-[#5B5B5B]! dark:text-[#DADADA]! text-[0.875rem]! font-normal!"
        )}
        onClick={handleClickDropdownSelectButton}
      >
        <span
          className={clsx(
            "text-[#5B5B5B]! dark:text-[#DADADA]! text-[0.875rem]! font-normal! text-ellipsis truncate w-full"
          )}
        >
          {selected?.name ?? label}
        </span>

        <SVGIcon
          name={isOpen ? "ChevronUp" : "ChevronDown"}
          className={clsx("w-4 h-4", "text-[#5B5B5B] dark:text-[#DADADA]")}
        />
      </DropdownSelectButton>
      {isOpen && (
        <div
          className={clsx(
            "absolute",
            "top-[60px] left-0 right-0",
            "grid grid-cols-1 place-content-start place-items-start",
            "px-4 py-4",
            "min-w-[255px]",
            "bg-[white] dark:bg-[#232323]",
            "rounded-md",
            "border border-[#E2E2E2] dark:border-[#464646]",
            "z-99"
          )}
        >
          {items.map((item, itemIndex) => (
            <button
              aria-label={item.name}
              name={item.name}
              key={itemIndex}
              className={clsx(
                "w-full",
                "text-[#5B5B5B]! dark:text-[#DADADA]! text-[0.875rem]! font-normal! text-left",
                "py-2",
                "cursor-pointer disabled:cursor-default"
              )}
              onClick={() => handleSelect(item)}
            >
              <div
                className={clsx(
                  "grid grid-cols-1 place-content-start place-items-start gap-0.5",
                  "w-full"
                )}
              >
                <p
                  className={clsx(
                    "text-[#232323] dark:text-white text-sm font-normal"
                  )}
                >
                  {item.name}
                </p>
                <span
                  className={clsx(
                    "text-[#979797] dark:text-[#C3C3C3] text-[0.625rem] font-normal"
                  )}
                >
                  {item.description}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

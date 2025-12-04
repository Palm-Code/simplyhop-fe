"use client";
import * as React from "react";
import clsx from "clsx";
import SVGIcon, { SVGIconProps } from "@/core/icons";
import { useOnClickOutside } from "usehooks-ts";
import Link from "next/link";
import { SettingTabButton } from "../setting_tab_button";
import { usePathname } from "next/navigation";

export interface SettingMenuDropdownProps {
  label?: string;
  items?: { id: string; name: string; href: string; icon: string }[];
}

export const SettingMenuDropdown = ({
  label = "",
  items = [],
}: SettingMenuDropdownProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref as any, () => {
    setIsOpen(false);
  });
  const handleClickDropdownButton = () => {
    setIsOpen((prev) => !prev);
  };

  // Find the selected menu item based on current pathname
  const selectedItem = items.find((menu) => pathname.includes(menu.href));
  const displayLabel = selectedItem ? selectedItem.name : label;

  return (
    <div ref={ref} className={clsx("relative")}>
      <button
        className={clsx(
          "flex items-center justify-start gap-[0.5rem]",
          "w-full",
          "px-[1rem] py-[0.75rem]",
          "bg-[white] dark:bg-[#232323]",
          "border border-[#E9E6E6] dark:border-[#464646]",
          "rounded-[0.75rem]",
          "text-[0.875rem] font-medium",
          "text-[#249124] dark:text-[#33CC33]",
          "cursor-pointer"
        )}
        onClick={handleClickDropdownButton}
      >
        <div
          className={clsx(
            "flex items-center justify-start gap-[0.5rem]",
            "w-full"
          )}
        >
          {selectedItem?.icon && (
            <SVGIcon
              name={selectedItem.icon as SVGIconProps["name"]}
              className={clsx("w-4 h-4", "text-[#249124] dark:text-[#33CC33]")}
            />
          )}

          {displayLabel}
        </div>

        <SVGIcon
          name={isOpen ? "ChevronUp" : "ChevronDown"}
          className={clsx("w-4 h-4", "text-[#249124] dark:text-[#33CC33]")}
        />
      </button>

      {isOpen && (
        <div
          className={clsx(
            "absolute top-[56px] left-0 right-0",
            "flex flex-col items-start justify-start",
            "h-[200px]",
            "px-4 py-4",
            "bg-[white] dark:bg-[#232323]",
            "rounded-2xl",
            "overflow-auto",
            "border border-[#E9E6E6] dark:border-[#464646]"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
              "w-full"
            )}
          >
            {items.map((menu, index) => {
              const isSelected = pathname.includes(menu.href);
              return (
                <Link
                  key={index}
                  href={menu.href}
                  aria-label={menu.name}
                  className={clsx("w-full")}
                >
                  <SettingTabButton
                    selected={isSelected}
                    className={clsx("whitespace-nowrap")}
                  >
                    <SVGIcon
                      name={menu.icon as SVGIconProps["name"]}
                      className={clsx("w-4 h-4")}
                    />
                    {menu.name}
                  </SettingTabButton>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

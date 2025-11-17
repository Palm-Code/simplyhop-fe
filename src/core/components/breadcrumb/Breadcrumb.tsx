import * as React from "react";
import SVGIcon from "@/core/icons";
import clsx from "clsx";
import Link from "next/link";

export interface BreadcrumbProps {
  items?: {
    label: string;
    href: string;
  }[];
}

export const Breadcrumb = ({ items = [] }: BreadcrumbProps) => {
  return (
    <div className={clsx("flex items-center justify-start gap-1", "w-full")}>
      {items.map((item, index) => (
        <>
          {index < items.length - 1 && (
            <Link
              href={item.href}
              className={clsx("text-[#767676] text-xs font-normal")}
            >
              {item.label}
            </Link>
          )}

          {index === items.length - 1 && (
            <span className={clsx("text-[#249124] text-xs font-semibold")}>
              {item.label}
            </span>
          )}
          {index < items.length - 1 && (
            <SVGIcon
              name="ChevronRight"
              className={clsx("w-4 h-4", "text-[#767676]")}
            />
          )}
        </>
      ))}
    </div>
  );
};

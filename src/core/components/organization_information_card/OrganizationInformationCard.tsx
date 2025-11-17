import * as React from "react";
import clsx from "clsx";
import Link from "next/link";
import { Avatar } from "@/core/components/avatar";
import SVGIcon from "@/core/icons";
import { OrganizationInformationItem } from "../organization_information_item";

export interface OrganizationInformationCardProps {
  summary: {
    value: string;
    id: string;
    name: string;
  }[];
  header: {
    avatar?: {
      src?: string;
      className?: string;
    };
    displayName: string;
    cta: {
      text: string;
      href: string;
    };
  };
  detail: {
    label: string;
    value: string;
  }[];

  // Optional styling props
  containerClassName?: string;
}

export const OrganizationInformationCard = ({
  summary = [],
  header: { avatar, displayName, cta },
  detail = [],
  containerClassName,
}: OrganizationInformationCardProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full",
        "px-[1.5rem] py-[1.5rem]",
        "relative",
        "border border-[#D3E7CE]",
        "rounded-[1.25rem]",
        containerClassName
      )}
    >
      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
          "w-full"
        )}
      >
        <div className={clsx("flex items-center justify-start gap-3")}>
          <Avatar
            src={avatar?.src}
            variant="avatar"
            className={clsx("w-[3rem] h-[3rem]", avatar?.className)}
          />
          <h2 className={clsx("text-[#292929] text-2xl font-bold")}>
            {displayName}
          </h2>
        </div>

        <Link href={cta.href}>
          <button
            className={clsx(
              "flex items-center justify-center",
              "bg-white",
              "px-4 py-2",
              "rounded-md",
              "border border-[#33CC33]",
              "text-[#33CC33] text-xs font-semibold"
            )}
          >
            {cta.text}
          </button>
        </Link>
      </div>

      <div className={clsx("flex items-center justify-between", "w-full")}>
        <div
          className={clsx("flex items-center justify-start gap-4", "w-full")}
        >
          {summary.map((item, index) => (
            <div
              key={index}
              className={clsx(
                "grid grid-cols-1 place-content-center place-items-center gap-[0.5rem]",
                "w-full"
              )}
            >
              <p className={clsx("text-[0.75rem] text-[#606060] font-normal")}>
                {item.name}
              </p>
              <div
                className={clsx(
                  "flex items-center justify-center gap-[0.5rem]"
                )}
              >
                {item.id === "ratings" && (
                  <SVGIcon
                    name="Star"
                    className={clsx(
                      "w-[1rem] h-[1rem]",
                      "fill-[#FAC248] text-[#FAC248]"
                    )}
                  />
                )}
                <p className={clsx("text-[0.875rem] text-[#232323] font-bold")}>
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={clsx("flex items-center justify-end gap-4", "w-full")}>
          {detail.map((item, index) => (
            <OrganizationInformationItem
              key={index}
              name={item.label}
              value={item.value}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

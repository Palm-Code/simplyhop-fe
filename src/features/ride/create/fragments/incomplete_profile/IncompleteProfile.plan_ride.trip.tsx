"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import Link from "next/link";
import { UserContext } from "@/core/modules/app/context";

export const IncompleteProfilePlaneRideTrip = () => {
  const { state: userState } = React.useContext(UserContext);
  const dictionaries = getDictionaries();

  if (!userState.profile || userState.profile?.is_able_to_ride) {
    return null;
  }

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-items-start place-content-start gap-4",
        "bg-[white]",
        "rounded-[0.5rem] lg:rounded-[1.25rem]",
        "px-[0.5rem] py-[0.5rem] lg:px-4 lg:py-4",
        "text-[1rem] lg:text-xl text-neutral-50 font-bold",
        "sm:w-full sm:max-w-[409px]",
        "border border-[#D3E7CE]"
      )}
      style={{
        backdropFilter: "blur(20px)",
        boxShadow: "0px 0px 25px 0px #969C9640",
      }}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-items-start place-content-start gap-[0.5rem]",
          "w-full"
        )}
      >
        <p className={clsx("text-[1rem] text-[#292929] font-bold")}>
          {dictionaries.badge.uncompleted.title}
        </p>
        <p className={clsx("text-[0.75rem] text-[#98989E] font-normal")}>
          {dictionaries.badge.uncompleted.description}
        </p>
      </div>
      <Link
        href={dictionaries.badge.uncompleted.cta.link.href}
        className={clsx("text-[0.875rem] text-[#333FFF] font-medium")}
      >
        {dictionaries.badge.uncompleted.cta.link.children}
      </Link>
    </div>
  );
};

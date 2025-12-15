"use client";
import * as React from "react";
import clsx from "clsx";
import { TabList, Tab, TabGroup } from "@headlessui/react";
import { getDictionaries } from "../../i18n";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { UserContext } from "@/core/modules/app/context";

export const TabListTrip = () => {
  const searchParams = useSearchParams();
  const dictionaries = getDictionaries();

  const type = searchParams.get("type");
  const pathname = usePathname();
  const { state: userState } = React.useContext(UserContext);

  const isEmployee = userState.profile?.role === "employee";
  const isDriver = isEmployee && !!userState.profile?.is_driver;
  const isPassenger = isEmployee && !userState.profile?.is_driver;
  const tabList = isPassenger
    ? dictionaries.tab.employee.items.filter((item) => item.id === "book")
    : isDriver
    ? dictionaries.tab.employee.items.filter((item) => item.id === "book")
    : dictionaries.tab.admin.items;

  return (
    <TabGroup
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[2rem]",
        "w-full"
      )}
    >
      <TabList
        className={clsx(
          "flex justify-start items-center gap-[2rem]",
          "w-full",
          "overflow-x-auto"
        )}
      >
        {tabList.map((item, itemIndex) => {
          const params =
            itemIndex === 0
              ? undefined
              : new URLSearchParams({
                  type: item.id,
                });
          return (
            <Link
              key={itemIndex}
              href={!params ? pathname : `${pathname}?${params.toString()}`}
              scroll={false}
            >
              <Tab
                className={clsx(
                  !type && itemIndex === 0
                    ? "text-[#232323] dark:text-white font-semibold border-b-[2px] border-b-[#33CC33]"
                    : !!type && item.id === type
                    ? "text-[#232323] dark:text-white font-semibold border-b-[2px] border-b-[#33CC33]"
                    : "text-[#5B5B5B]",
                  "font-normal text-[1rem] ",
                  "outline-none",
                  "cursor-pointer",
                  "whitespace-nowrap"
                )}
              >
                {item.name}
              </Tab>
            </Link>
          );
        })}
      </TabList>
    </TabGroup>
  );
};

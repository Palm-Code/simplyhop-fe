import * as React from "react";
import clsx from "clsx";
import { TabList, Tab, TabGroup } from "@headlessui/react";
import { getDictionaries } from "../../i18n";
import Link from "next/link";
import { AppCollectionURL } from "@/core/utils/router/constants";
import { useSearchParams } from "next/navigation";
import { UserContext } from "@/core/modules/app/context";

export const TabTripSupport = () => {
  const { state: userState } = React.useContext(UserContext);
  const searchParams = useSearchParams();
  const dictionaries = getDictionaries();

  const tabList = !userState.profile?.is_driver
    ? dictionaries.tab.items.filter((item) => item.id !== "ride")
    : dictionaries.tab.items;

  const type = searchParams.get("type");

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
              href={AppCollectionURL.private.myList(
                !params ? params : params.toString()
              )}
            >
              <Tab
                className={clsx(
                  !type && itemIndex === 0
                    ? "text-[#232323] font-semibold border-b-[2px] border-b-[#33CC33]"
                    : !!type && item.id === type
                    ? "text-[#232323] font-semibold border-b-[2px] border-b-[#33CC33]"
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

import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { TabButton } from "@/core/components/tab_button";

export const TabFAQHelpCenter = () => {
  const dictionaries = getDictionaries();
  const [activeTab, setActiveTab] = React.useState<{
    id: string;
    name: string;
  } | null>(dictionaries.tab.items[0] ?? null);

  const handleClickTabItem = (data: { id: string; name: string }) => {
    setActiveTab(data);
  };

  const content =
    dictionaries.faq.items.find((item) => item.tabId === activeTab?.id) ?? null;
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-flow-col grid-cols-none lg:grid-cols-2 place-content-start place-items-start gap-[1rem]",
          "w-full",
          "overflow-auto",
          "border-b border-b-[#A6A6A6]"
        )}
      >
        {dictionaries.tab.items.map((tabItem, tabIndex) => (
          <TabButton
            key={tabIndex}
            selected={activeTab?.id === tabItem.id}
            variant={"horizontal"}
            className={clsx(
              "!text-center",
              "!justify-center !justify-items-center"
            )}
            onClick={() => handleClickTabItem(tabItem)}
          >
            {tabItem.name}
          </TabButton>
        ))}
      </div>

      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        {content?.list.map((listItem, listIndex) => (
          <div
            key={listIndex}
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[0rem]",
              "w-full"
            )}
          >
            <p className={clsx("text-[#232323] dark:text-white text-[1rem] font-semibold")}>
              {listItem.question}
            </p>
            <p className={clsx("text-[#5B5B5B] dark:text-[#C3C3C3] text-[0.875rem] font-normal")}>
              {listItem.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

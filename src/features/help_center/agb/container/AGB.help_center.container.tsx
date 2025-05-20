"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../i18n";
import { HeaderHelpCenter } from "@/core/components/header_help_center";

export const AGBHelpCenterContainer = () => {
  const dictionaries = getDictionaries();

  // exercise 1
  const getMinimumSlots = (
    largeSlots: number,
    smallSlots: number,
    buses: number,
    cars: number
  ) => {
    if (buses > largeSlots) return -1;
    if (buses === largeSlots) {
      if (cars <= smallSlots) return buses + cars;
      return -1;
    } else {
      let remainingLargeSlots = largeSlots - buses;
      if (remainingLargeSlots >= cars / 3) return buses + remainingLargeSlots;
      else if (smallSlots >= cars - remainingLargeSlots * 3)
        return largeSlots + (cars - remainingLargeSlots * 3);
      return -1;
    }
  };
  const test = getMinimumSlots(2, 12, 1, 4);
  console.log(test, "ini slots"); // should print 3

  // exercise 2
  const usageCounts = (bridge: number[]) => {
    let count = 0;
    while (bridge.every((section) => section > 0)) {
      let newBridge: number[] = [];
      for (let i = 0; i < bridge.length; i++) {
        bridge[i] = bridge[i] - 2;
        newBridge.push(bridge[i]);
      }
      if (newBridge.every((section) => section >= 0)) count++;
    }
    return count;
  };

  const test2 = usageCounts([7, 6, 5, 8]);
  console.log(test2, "ini counts");
  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-center content-center justify-start justify-items-start gap-[1.5rem]",
        "w-full",
        "px-[1rem]"
      )}
    >
  

      <HeaderHelpCenter title={dictionaries.title} />
      {dictionaries.contents.map((content, contentIndex) => (
        <div
          key={contentIndex}
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start",
            "w-full"
          )}
        >
          <p
            className={clsx("text-[1rem] text-[#232323] font-semibold")}
            dangerouslySetInnerHTML={{ __html: content.title }}
          />
          <br />
          {content.type === "ordered-list" ? (
            <ol className={clsx("list-decimal", "pl-[1rem]")}>
              {content.content.map((subContent, subContentIndex) => {
                return (
                  <li
                    key={`${contentIndex}-${subContentIndex}`}
                    className={clsx(
                      "text-[0.875rem] text-[#606060] font-normal"
                    )}
                    dangerouslySetInnerHTML={{ __html: subContent }}
                  />
                );
              })}
            </ol>
          ) : content.type === "unordered-list" ? (
            <ol className={clsx("pl-[1rem]")}>
              {content.content.map((subContent, subContentIndex) => {
                return (
                  <li
                    key={`${contentIndex}-${subContentIndex}`}
                    className={clsx(
                      "text-[0.875rem] text-[#606060] font-normal"
                    )}
                    dangerouslySetInnerHTML={{
                      __html: subContent.replaceAll("'", '"'),
                    }}
                  />
                );
              })}
            </ol>
          ) : (
            <>
              {content.content.map((subContent, subContentIndex) => {
                return (
                  <div
                    key={`${contentIndex}-${subContentIndex}`}
                    className={clsx(
                      "grid grid-cols-1 place-content-start place-items-start",
                      "w-full"
                    )}
                  >
                    <p
                      className={clsx(
                        "text-[0.875rem] text-[#606060] font-normal"
                      )}
                      dangerouslySetInnerHTML={{
                        __html: subContent.replaceAll("'", '"'),
                      }}
                    />
                    <br />
                  </div>
                );
              })}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

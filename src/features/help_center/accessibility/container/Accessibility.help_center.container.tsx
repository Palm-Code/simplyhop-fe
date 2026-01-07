"use client";
import * as React from "react";
import clsx from "clsx";
import Image from "next/image";
import { getDictionaries } from "../i18n";
import { HeaderHelpCenter } from "@/core/components/header_help_center";

export const AccessibilityHelpCenterContainer = () => {
  const dictionaries = getDictionaries();
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
            className={clsx(
              "text-[1rem] text-[#232323] dark:text-white font-semibold"
            )}
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
                      "text-[0.875rem] text-[#606060] dark:text-[#C3C3C3] font-normal"
                    )}
                    dangerouslySetInnerHTML={{ __html: subContent }}
                  />
                );
              })}
            </ol>
          ) : content.type === "unordered-list" ? (
            <ol>
              {content.content.map((subContent, subContentIndex) => {
                return (
                  <li
                    key={`${contentIndex}-${subContentIndex}`}
                    className={clsx(
                      "text-[0.875rem] text-[#606060] dark:text-[#C3C3C3] font-normal"
                    )}
                    dangerouslySetInnerHTML={{ __html: subContent }}
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
                      dangerouslySetInnerHTML={{ __html: subContent }}
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

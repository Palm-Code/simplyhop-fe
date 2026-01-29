import * as React from "react";
import clsx from "clsx";
import { NavigationListDriver } from "../fragments/navigation";
import { HeaderListDriver } from "../fragments/header";
import { ContentListDriver } from "../fragments/content";
import { SearchListDriver } from "../fragments/search";

export const ListDriverContainer = () => {
  return (
    <>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full",
        )}
      >
        <HeaderListDriver />
        <div className={clsx("flex flex-col lg:flex-row items-center justify-between gap-4", "w-full")}>
          <NavigationListDriver />
          <SearchListDriver />
        </div>

        <ContentListDriver />
      </div>
    </>
  );
};

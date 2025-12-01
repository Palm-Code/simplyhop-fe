"use client";
import * as React from "react";
import clsx from "clsx";
import { useGetUserBlockList } from "../react_query/hooks";
import { HeaderListUserBlock } from "../fragments/header";

import { DataTableListUserBlock } from "../fragments/data_table";

export const ListUserBlockContainer = () => {
  useGetUserBlockList();
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[36px]",
        "w-full h-full",
        "relative"
      )}
    >
      <HeaderListUserBlock />
      <DataTableListUserBlock />
    </div>
  );
};

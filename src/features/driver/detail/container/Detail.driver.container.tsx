"use client";
import * as React from "react";
import clsx from "clsx";
import { NavigationDetailDriver } from "../fragments/navigation";
import { HeaderDetailDriver } from "../fragments/header";
import { ContentDetailDriver } from "../fragments/content";

export const DetailDriverContainer = () => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-6",
        "w-full"
      )}
    >
      <HeaderDetailDriver />
      <NavigationDetailDriver />
      <ContentDetailDriver />
    </div>
  );
};

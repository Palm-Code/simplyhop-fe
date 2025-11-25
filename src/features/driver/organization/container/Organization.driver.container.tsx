'use client'
import * as React from "react";
import clsx from "clsx";
import { ListDriverProvider } from "../../list/context";
import { AlertApp } from "@/core/modules/app/fragments/alert";
import { ContentListDriver } from "../../list/fragments/content";
import { HeaderOrganizationDriver } from "../fragments/header";
import { NavigationOrganizationDriver } from "../fragments/navigation";
import { useGetDashboardSuperAdminPerOrganizationId } from "../react_query/hooks";

export const OrganizationDriverContainer = () => {
  useGetDashboardSuperAdminPerOrganizationId();
  return (
    <ListDriverProvider>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        <HeaderOrganizationDriver />
        <NavigationOrganizationDriver />
        <ContentListDriver />
      </div>

      <AlertApp />
    </ListDriverProvider>
  );
};

"use client";
import * as React from "react";
import clsx from "clsx";
import { AlertApp } from "@/core/modules/app/fragments/alert";
import { HeaderOrganizationDetailDriver } from "../fragments/header";
import { NavigationOrganizationDetailDriver } from "../fragments/navigation";
import { useGetDashboardSuperAdminPerOrganizationId } from "../react_query/hooks";
import { ContentDetailDriver } from "../../detail/fragments/content";
import { DetailDriverProvider } from "../../detail/context";

export const OrganizationDetailDriverContainer = () => {
  useGetDashboardSuperAdminPerOrganizationId();
  return (
    <DetailDriverProvider>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        <HeaderOrganizationDetailDriver />
        <NavigationOrganizationDetailDriver />
        <ContentDetailDriver />
      </div>

      <AlertApp />
    </DetailDriverProvider>
  );
};

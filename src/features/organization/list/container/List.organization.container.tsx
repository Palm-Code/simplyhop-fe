"use client";
import * as React from "react";
import clsx from "clsx";
import { DataTableListOrganization } from "../fragments/data_table";
import { useGetDashboardSuperAdminPerOrganization } from "../react_query/hooks";

export const ListOrganizationContainer = () => {
  useGetDashboardSuperAdminPerOrganization();

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <DataTableListOrganization />
    </div>
  );
};

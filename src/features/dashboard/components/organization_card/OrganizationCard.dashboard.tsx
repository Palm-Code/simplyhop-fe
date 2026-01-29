"use client";
import * as React from "react";
import clsx from "clsx";
import { TableHead } from "@/core/components/table_head";
import { TableBody } from "@/core/components/table_body";
import { Table } from "@tanstack/react-table";

export interface OrganizationCardDashboardProps {
  id?: string;
  table?: Table<any> | null;
}

export const OrganizationCardDashboard = ({
  id = "",
  table = null,
}: OrganizationCardDashboardProps) => {
  return (
    <div
      id={id}
      className={clsx(
        "grid grid-rows-1 grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full h-full",
        "px-[1.5rem] py-[1rem]",
        "rounded-[0.625rem]",
        "bg-white dark:bg-[#232323]",
        "border-[0.5px] border-[#E9E6E6] dark:border-[#464646]"
      )}
    >
      <div className={clsx("overflow-x-auto w-full")}>
        <table className={clsx("table w-full min-w-[400px]")}>
          <TableHead table={table} />
          <TableBody table={table} />
        </table>
      </div>
    </div>
  );
};

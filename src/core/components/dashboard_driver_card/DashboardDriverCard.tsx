"use client";
import * as React from "react";
import clsx from "clsx";
import { TableHead } from "@/core/components/table_head";
import { TableBody } from "@/core/components/table_body";
import { Table } from "@tanstack/react-table";

export interface DashboardDriverCardProps {
  id?: string;
  table?: Table<any> | null;
}

export const DashboardDriverCard = ({
  id = "",
  table = null,
}: DashboardDriverCardProps) => {
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
      <table className={clsx("table w-full")}>
        <TableHead table={table} />
        <TableBody table={table} />
      </table>
    </div>
  );
};

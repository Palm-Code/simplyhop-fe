import { Table, flexRender } from "@tanstack/react-table";
import * as React from "react";
import clsx from "clsx";

export interface TableHeadProps {
  table?: Table<any> | null;
  className?: string;
}

export const TableHead = ({ table = null, className }: TableHeadProps) => {
  return (
    <thead>
      {table !== null &&
        table.getHeaderGroups().map((headerGroup) => (
          <tr
            key={headerGroup.id}
            className={clsx(
              "border-b border-b-[#E9E6E6] dark:border-b-[#464646]",
              "h-9"
            )}
          >
            {headerGroup.headers.map((header) => {
              return (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className={clsx(className)}
                >
                  {header.isPlaceholder !== null &&
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              );
            })}
          </tr>
        ))}
    </thead>
  );
};

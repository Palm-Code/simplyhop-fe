import { Table, flexRender } from "@tanstack/react-table";
import * as React from "react";
import clsx from "clsx";

export interface TableBodyProps {
  table?: Table<any> | null;
  tdClassName?: string;
}

export const TableBody: React.FC<TableBodyProps> = ({
  table = null,
  tdClassName,
}: TableBodyProps) => {
  return (
    <tbody>
      {table !== null &&
        table.getRowModel().rows.map((row) => {
          return (
            <tr key={row.id} role={"table-row"}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <td
                    key={cell.id}
                    className={clsx("h-9 align-middle text-left", tdClassName)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
    </tbody>
  );
};

import * as React from "react";
import clsx from "clsx";
import { TableHead } from "@/core/components/table_head";
import { TableBody } from "@/core/components/table_body";
import { useDriverTableDashboard } from "../../react_table/hooks";

export const DataTableListDriver = () => {
  const table = useDriverTableDashboard();
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start",
        "w-full",
        "px-[1px] py-[1px]",
        "rounded-2xl"
      )}
      style={{
        background:
          "linear-gradient(172.93deg, #F3F3F3 30.07%, #EBEBEB 94.49%)",
      }}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-6",
          "w-full",
          "px-4 py-4",
          "bg-[white]",
          "rounded-2xl"
        )}
      >
        <table className={clsx("table w-full")}>
          <TableHead table={table} />
          <TableBody table={table} tdClassName={"!h-[56px]"} />
        </table>
      </div>
    </div>
  );
};

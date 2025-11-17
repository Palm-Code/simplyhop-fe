import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useContext, useMemo, useState } from "react";
import clsx from "clsx";
import { DetailOrganizationContext } from "../../context";
import { getDictionaries } from "../../i18n";
import "dayjs/locale/de";
import { GetDashboardOrganizationSuccessDataResponseInterface } from "@/core/models/rest/simplyhop/dashboard";
import { formatDisplayName } from "@/core/utils/name/functions";

export const useDriverTableOrganization = () => {
  const { state } = useContext(DetailOrganizationContext);
  const dictionaries = getDictionaries();

  const headerColumns = dictionaries.drivers.table.head.items;

  const tableData = state.driver.data ?? [];

  const pageSize = state.driver.pagination.limit;

  const columns = useMemo<
    ColumnDef<GetDashboardOrganizationSuccessDataResponseInterface>[]
  >(() => {
    return headerColumns.map((item, index) => {
      return {
        accessorKey: item.id,
        header: () => {
          return (
            <div
              className={clsx(
                "flex items-center justify-start",
                "w-full",
                "text-[#606060] text-xs font-normal"
              )}
            >
              {item.name}
            </div>
          );
        },
        cell: (cellProps) => {
          if (item.id === "driver") {
            return (
              <div
                key={index}
                className={clsx(
                  "grid grid-cols-[16px_1fr] items-center content-center justify-start justify-items-start gap-2",
                  "w-full"
                )}
              >
                <img
                  src={cellProps.row.original.user.avatar ?? ""}
                  className={clsx(
                    "w-4 h-4",
                    "rounded-full",
                    "object-cover object-center"
                  )}
                  alt={cellProps.row.original.user.email}
                />

                <p
                  className={clsx(
                    "text-[#292929] font-normal text-[0.875rem] line-clamp-2",
                    "w-full"
                  )}
                >
                  {formatDisplayName({
                    first_name: cellProps.row.original.user.first_name,
                    email: cellProps.row.original.user.email,
                  })}
                </p>
              </div>
            );
          }
          if (item.id === "rides") {
            return (
              <p
                key={index}
                className={clsx(
                  "text-[#292929] font-normal text-[0.875rem] line-clamp-2",
                  "w-full"
                )}
              >
                {cellProps.row.original.total_rides_planned.toLocaleString(
                  "de-DE"
                )}
              </p>
            );
          }
          if (item.id === "bewertungen") {
            return (
              <p
                key={index}
                className={clsx(
                  "text-[#292929] font-normal text-[0.875rem] line-clamp-2",
                  "w-full"
                )}
              >
                {cellProps.row.original.average_rating.toLocaleString("de-DE")}
              </p>
            );
          }
          if (item.id === "passengers") {
            return (
              <p
                key={index}
                className={clsx(
                  "text-[#292929] font-normal text-[0.875rem] line-clamp-2",
                  "w-full"
                )}
              >
                {cellProps.row.original.total_passenger.toLocaleString("de-DE")}
              </p>
            );
          }
          return <div>{cellProps.getValue() as React.ReactNode}</div>;
        },
      };
    });
  }, [headerColumns, tableData]);

  const [sorting, setSorting] = useState<SortingState>([]);

  return useReactTable({
    data: tableData,
    columns: columns,
    state: {
      sorting: sorting,
      pagination: {
        pageIndex: 0,
        pageSize: pageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    paginateExpandedRows: false,
    autoResetPageIndex: false,
    debugTable: false,
  });
};

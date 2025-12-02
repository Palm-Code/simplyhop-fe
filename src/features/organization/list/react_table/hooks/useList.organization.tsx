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
import { ListOrganizationContext } from "../../context";
import { getDictionaries } from "../../i18n";
import "dayjs/locale/de";
import { GetDashboardSuperAdminPerOrganizationSuccessDataResponseInterface } from "@/core/models/rest/simplyhop/dashboard";
import { formatDisplayName } from "@/core/utils/name/functions";
import SVGIcon from "@/core/icons";

export const useListOrganizationTable = () => {
  const { state } = useContext(ListOrganizationContext);
  const dictionaries = getDictionaries();

  const headerColumns = dictionaries.table.head.items;

  const tableData = state.table.items;

  const pageSize = state.table.pagination.limit;

  const columns = useMemo<
    ColumnDef<GetDashboardSuperAdminPerOrganizationSuccessDataResponseInterface>[]
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
                "text-[#606060] dark:text-[#DADADA] text-xs font-normal"
              )}
            >
              {item.name}
            </div>
          );
        },
        cell: (cellProps) => {
          if (item.id === "organisation") {
            return (
              <div
                key={index}
                className={clsx(
                  "grid grid-cols-[16px_1fr] items-center content-center justify-start justify-items-start gap-2",
                  "w-full"
                )}
              >
                {!cellProps.row.original.organization.media.length ? (
                  <div
                    className={clsx(
                      "flex items-center justify-center",
                      "w-4 h-4",
                      "bg-[#EFF9ECC7]",
                      "rounded-full"
                    )}
                  >
                    <SVGIcon
                      name="Building2"
                      className={clsx("w-2.5 h-2.5", "text-[#26531A]")}
                    />
                  </div>
                ) : (
                  <img
                    src={cellProps.row.original.organization.logo}
                    className={clsx(
                      "w-4 h-4",
                      "rounded-full",
                      "object-cover object-center"
                    )}
                    alt={cellProps.row.original.organization.email}
                  />
                )}

                <p
                  className={clsx(
                    "text-[#232323] dark:text-white font-normal text-[0.875rem] line-clamp-2",
                    "w-full"
                  )}
                >
                  {formatDisplayName({
                    first_name: cellProps.row.original.organization.name,
                    email: cellProps.row.original.organization.email,
                  })}
                </p>
              </div>
            );
          }
          if (item.id === "completed_rides") {
            return (
              <p
                key={index}
                className={clsx(
                  "text-[#232323] dark:text-white font-normal text-[0.875rem] line-clamp-2",
                  "w-full"
                )}
              >
                {cellProps.row.original.total_rides_completed.toLocaleString(
                  "de-DE"
                )}
              </p>
            );
          }
          if (item.id === "drivers") {
            return (
              <p
                key={index}
                className={clsx(
                  "text-[#232323] dark:text-white font-normal text-[0.875rem] line-clamp-2",
                  "w-full"
                )}
              >
                {cellProps.row.original.total_driver.toLocaleString("de-DE")}
              </p>
            );
          }
          if (item.id === "upcoming_rides") {
            return (
              <p
                key={index}
                className={clsx(
                  "text-[#232323] dark:text-white font-normal text-[0.875rem] line-clamp-2",
                  "w-full"
                )}
              >
                {cellProps.row.original.total_rides_planned.toLocaleString(
                  "de-DE"
                )}
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

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
import { DashboardSupportContext } from "../../context";
import { getDictionaries } from "../../i18n";
import "dayjs/locale/de";
import { GetDashboardSuperAdminPerOrganizationSuccessDataResponseInterface } from "@/core/models/rest/simplyhop/dashboard";
import { formatDisplayName } from "@/core/utils/name/functions";
import SVGIcon from "@/core/icons";

export const useOrganizationTableDashboard = () => {
  const { state } = useContext(DashboardSupportContext);
  const dictionaries = getDictionaries();

  const headerColumns = dictionaries.super_admin.organizations.table.head.items;

  const tableData = state.sections.super_admin.organization.data ?? [];

  const pageSize = state.sections.super_admin.organization.pagination.limit;

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
                "text-[#606060] text-xs font-normal"
              )}
            >
              {item.name}
            </div>
          );
        },
        cell: (cellProps) => {
          if (item.id === "company") {
            return (
              <div
                key={index}
                className={clsx(
                  "grid grid-cols-[16px_1fr] items-center content-center justify-start justify-items-start gap-2",
                  "w-full"
                )}
              >
                {!cellProps.row.original.organization.logo.length ? (
                  <div
                    className={clsx(
                      "flex items-center justify-center",
                      "rounded-full",
                      "w-3 h-3",
                      "bg-[#EFF9EC]"
                    )}
                  >
                    <SVGIcon
                      name={"Building2"}
                      className={clsx("w-3 h-3", "text-[#26531A]")}
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
                    "text-[#292929] font-normal text-[0.875rem] line-clamp-2",
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
          if (item.id === "rides") {
            return (
              <p
                key={index}
                className={clsx(
                  "text-[#292929] font-normal text-[0.875rem] line-clamp-2",
                  "w-full"
                )}
              >
                {cellProps.row.original.total_rides_booked.toLocaleString(
                  "de-DE"
                )}
              </p>
            );
          }
          if (item.id === "driver") {
            return (
              <p
                key={index}
                className={clsx(
                  "text-[#292929] font-normal text-[0.875rem] line-clamp-2",
                  "w-full"
                )}
              >
                {cellProps.row.original.total_driver.toLocaleString("de-DE")}
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

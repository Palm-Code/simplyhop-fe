import * as React from "react";
import clsx from "clsx";
import { TableHead } from "@/core/components/table_head";
import { TableBody } from "@/core/components/table_body";
import { useListOrganizationTable } from "../../react_table/hooks";
import {
  ListOrganizationActionEnum,
  ListOrganizationContext,
  ListOrganizationItem,
} from "../../context";
import { getDictionaries } from "../../i18n";
import { LoadingState } from "@/core/components/loading_state";
import { EmptyState } from "@/core/components/empty_state";

export const DataTableListOrganization = () => {
  const { state, dispatch } = React.useContext(ListOrganizationContext);
  const table = useListOrganizationTable();
  const dictionaries = getDictionaries();

  const handleRowClick = (row: ListOrganizationItem) => {
    dispatch({
      type: ListOrganizationActionEnum.SetUserProfileData,
      payload: {
        ...state.user_profile,
        user_id: String(row.organization_id),
        is_open: true,
      },
    });
  };
  if (state.table.loading.is_fetching) {
    return (
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-6",
          "w-full",
          "px-4 py-4",
          "bg-[white]",
          "rounded-2xl",
          "border border-[#E9E6E6] dark:border-[#464646]"
        )}
      >
        <LoadingState />
      </div>
    );
  }

  if (!state.table.items.length) {
    return (
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-6",
          "w-full",
          "px-4 py-4",
          "bg-[white]",
          "rounded-2xl",
          "border border-[#E9E6E6] dark:border-[#464646]"
        )}
      >
        <EmptyState {...dictionaries.table.empty} />
      </div>
    );
  }
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-6",
        "w-full",
        "px-4 py-4",
        "bg-[white]",
        "rounded-2xl",
        "border border-[#E9E6E6] dark:border-[#464646]"
      )}
    >
      <table className={clsx("table w-full")}>
        <TableHead table={table} />
        <TableBody
          table={table}
          tdClassName={"!h-[56px]"}
          onRowClick={handleRowClick}
        />
      </table>
    </div>
  );
};

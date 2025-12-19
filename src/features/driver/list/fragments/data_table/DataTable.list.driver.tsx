import * as React from "react";
import clsx from "clsx";
import { TableHead } from "@/core/components/table_head";
import { TableBody } from "@/core/components/table_body";
import { useListDriverTable } from "../../react_table/hooks";
import {
  ListDriverActionEnum,
  ListDriverContext,
  ListDriverItem,
} from "../../context";
import { LoadingState } from "@/core/components/loading_state";
import { EmptyState } from "@/core/components/empty_state";
import { getDictionaries } from "../../i18n";
import { InfiniteScrollWrapper } from "@/core/components/infinite_scroll_wrapper";
import { ListLoader } from "@/core/components/list_loader";
import { PAGINATION } from "@/core/utils/pagination/contants";

export const DataTableListDriver = () => {
  const { state, dispatch } = React.useContext(ListDriverContext);
  const table = useListDriverTable();
  const dictionaries = getDictionaries();

  const handleRowClick = (row: ListDriverItem) => {
    dispatch({
      type: ListDriverActionEnum.SetUserProfileData,
      payload: {
        ...state.user_profile,
        user_id: String(row.user_id),
        is_open: true,
      },
    });
  };

  const handleLoadMore = () => {
    if (state.table.loading.is_fetching) return;

    dispatch({
      type: ListDriverActionEnum.SetTablePaginationData,
      payload: {
        ...state.table.pagination,
        current: state.table.pagination.current + 1,
      },
    });
  };

  const isEndReached =
    state.table.pagination.last === state.table.pagination.current;

  if (
    state.table.loading.is_fetching &&
    state.table.pagination.current === PAGINATION.NUMBER
  ) {
    return (
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-6",
          "w-full",
          "px-4 py-4",
          "bg-[white] dark:bg-[#232323]",
          "rounded-2xl",
          "border border-[#E9E6E6] dark:border-[#464646]"
        )}
      >
        <LoadingState />
      </div>
    );
  }

  if (!state.table.items.length && !state.table.loading.is_fetching) {
    return (
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-6",
          "w-full",
          "px-4 py-4",
          "bg-[white] dark:bg-[#232323]",
          "rounded-2xl",
          "border border-[#E9E6E6] dark:border-[#464646]"
        )}
      >
        <EmptyState {...dictionaries.table.empty} />
      </div>
    );
  }

  return (
    <InfiniteScrollWrapper
      loader={<ListLoader message="Lade weitere Fahrer..." />}
      isPaused={state.table.loading.is_fetching}
      isEndReached={isEndReached}
      onLoadMore={handleLoadMore}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-6",
          "w-full",
          "px-4 py-4",
          "bg-[white] dark:bg-[#232323]",
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
    </InfiniteScrollWrapper>
  );
};

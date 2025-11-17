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

export const DataTableListDriver = () => {
  const { state, dispatch } = React.useContext(ListDriverContext);
  const table = useListDriverTable();

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
          <TableBody
            table={table}
            tdClassName={"!h-[56px]"}
            onRowClick={handleRowClick}
          />
        </table>
      </div>
    </div>
  );
};

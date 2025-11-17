"use client";
import * as React from "react";
import clsx from "clsx";
import { VehiclesSupportContext } from "../../context";
import { CardVehiclesSupport } from "../../components/card";
import { useGetVehicleMy } from "../../react_query/hooks";
import { getDictionaries } from "../../i18n";
import { ListLoader } from "@/core/components/list_loader";
import { ListErrorItem } from "@/core/components/list_error_item";

export const ListVehiclesSupport = () => {
  const dictionaries = getDictionaries();
  const { state } = React.useContext(VehiclesSupportContext);

  const { isFetching: isFetchingGetVehicleMy } = useGetVehicleMy();
  const isLoading = isFetchingGetVehicleMy;

  if (isLoading) {
    return (
      <div
        className={clsx(
          "grid grid-rows-1 grid-cols-1 place-content-center place-items-center gap-[1rem]",
          "w-full h-[400px]"
        )}
      >
        <ListLoader message={dictionaries.list.loading.message} />
      </div>
    );
  }

  if (!state.list.data.length) {
    return (
      <div
        className={clsx(
          "grid grid-rows-1 grid-cols-1 place-content-center place-items-center gap-[1rem]",
          "w-full h-[400px]"
        )}
      >
        <ListErrorItem message={dictionaries.list.empty_data.message} />
      </div>
    );
  }
  return (
    <div
      className={clsx(
        "grid grid-rows-1 grid-cols-1 place-content-start place-items-start gap-[1rem]",
        "w-full"
      )}
    >
      {state.list.data.map((item, itemIndex) => (
        <CardVehiclesSupport key={itemIndex} {...item} />
      ))}
    </div>
  );
};

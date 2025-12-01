import * as React from "react";
import clsx from "clsx";

import { ListUserBlockActionEnum, ListUserBlockContext } from "../../context";
import { LoadingState } from "@/core/components/loading_state";
import { EmptyState } from "@/core/components/empty_state";
import { getDictionaries } from "../../i18n";
import { ItemListUserBlock } from "../../components/item";

export const DataTableListUserBlock = () => {
  const { state, dispatch } = React.useContext(ListUserBlockContext);

  const dictionaries = getDictionaries();

  if (state.items.loading.is_fetching) {
    return (
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start",
          "w-full"
        )}
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
          <LoadingState />
        </div>
      </div>
    );
  }

  if (!state.items.items.length) {
    return (
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start",
          "w-full"
        )}
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
          <EmptyState {...dictionaries.items.empty} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start",
        "w-full"
      )}
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
        {state.items.items.map((item, index) => (
          <ItemListUserBlock key={index} />
        ))}
      </div>
    </div>
  );
};

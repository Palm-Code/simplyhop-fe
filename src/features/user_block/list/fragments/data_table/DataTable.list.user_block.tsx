import * as React from "react";
import clsx from "clsx";

import { ListUserBlockActionEnum, ListUserBlockContext } from "../../context";
import { LoadingState } from "@/core/components/loading_state";
import { EmptyState } from "@/core/components/empty_state";
import { getDictionaries } from "../../i18n";
import { ItemListUserBlock } from "../../components/item";
import { formatDisplayName } from "@/core/utils/name/functions";
import { User } from "@/core/models/data";

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
            "bg-[white] dark:bg-[#232323]",
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
            "bg-[white] dark:bg-[#232323]",
            "rounded-2xl"
          )}
        >
          <EmptyState {...dictionaries.items.empty} />
        </div>
      </div>
    );
  }

  const handleClickUnblock = (data: User) => {
    dispatch({
      type: ListUserBlockActionEnum.SetUnblockConfirmationData,
      payload: {
        ...state.unblock_confirmation,
        is_open: true,
        id: data.id,
      },
    });
  };

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
          "bg-[white] dark:bg-[#232323]",
          "rounded-2xl"
        )}
      >
        {state.items.items.map((item, index) => (
          <ItemListUserBlock
            key={index}
            avatar={{
              src: item.blocked_user.avatar ?? "",
            }}
            name={formatDisplayName({
              first_name: item.blocked_user.first_name,
              email: item.blocked_user.email,
            })}
            description={
              "Alle Fahrten zusammen storniert, einschließlich zukünftiger Angebote."
            }
            cta={{
              children: "Entsperren",
              onClick: () => handleClickUnblock(item.blocked_user),
            }}
          />
        ))}
      </div>
    </div>
  );
};

"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { usePostAuthLogout } from "../../react_query/hooks";
import { MoonLoader } from "@/core/components/moon_loader";

export const LogoutAccountSupport = () => {
  const dictionaries = getDictionaries();
  const { mutate: postAuthLogout, isPending: isPendingPostAuthLogout } =
    usePostAuthLogout();
  const handleClickLogout = () => {
    postAuthLogout();
  };

  const isLogoutDisabled = isPendingPostAuthLogout;
  const isLogoutLoading = isPendingPostAuthLogout;
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start",
        "w-full"
      )}
    >
      <button
        aria-label={dictionaries.cta.logout.children}
        name={dictionaries.cta.logout.children}
        className={clsx(
          "grid grid-flow-col grid-rows-1 grid-cols-none place-content-center place-items-center gap-[0.5rem]",
          "w-full h-full",
          "text-[1rem] text-[#DA2323] font-medium",
          "cursor-pointer"
        )}
        disabled={isLogoutDisabled}
        onClick={handleClickLogout}
      >
        {isLogoutLoading && <MoonLoader size={20} color={"#DA2323"} />}
        {dictionaries.cta.logout.children}
      </button>
    </div>
  );
};

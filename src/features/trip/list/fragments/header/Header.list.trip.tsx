'use client'
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { UserContext } from "@/core/modules/app/context";

export const HeaderListTrip = () => {
  const dictionaries = getDictionaries();
  const { state: userState } = React.useContext(UserContext);
  if (userState.profile?.role === "employee") {
    return (
      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-between justify-items-start gap-[0.5rem]",
          "w-full"
        )}
      >
        <h1
          className={clsx(
            "text-[#232323] dark:text-white text-[1.5rem] font-bold"
          )}
        >
          {dictionaries.header.title}
        </h1>
      </div>
    );
  }
  return null;
};

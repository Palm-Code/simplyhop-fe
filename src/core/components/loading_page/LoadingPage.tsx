"use client";
import * as React from "react";
import clsx from "clsx";
import { MoonLoader } from "../moon_loader";
import { ThemeContext } from "@/core/modules/app/context/theme/Theme.context";

export const LoadingPage = () => {
  const { isDarkMode } = React.useContext(ThemeContext);
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center",
        "w-full h-screen"
      )}
    >
      {isDarkMode ? (
        <MoonLoader size={48} color={"#33CC33"} />
      ) : (
        <MoonLoader size={48} color={"#249124"} />
      )}
    </div>
  );
};

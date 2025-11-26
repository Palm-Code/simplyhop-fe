import * as React from "react";
import clsx from "clsx";
import { MoonLoader } from "../moon_loader";
import { ThemeContext } from "@/core/modules/app/context/theme/Theme.context";

export const LoadingState = () => {
  const { isDarkMode } = React.useContext(ThemeContext);
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center gap-2",
        "w-full min-h-[406px]"
      )}
    >
      {isDarkMode ? (
        <MoonLoader size={40} color={"#33CC33"} />
      ) : (
        <MoonLoader size={40} color={"#249124"} />
      )}
    </div>
  );
};

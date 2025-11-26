import * as React from "react";
import clsx from "clsx";

export interface TravelPathItemProps {
  variant?: "primary" | "secondary";
  mode?: "vertical" | "horizontal";
}

export const TravelPathItem = ({
  variant = "primary",
  mode = "horizontal",
}: TravelPathItemProps) => {
  if (mode === "vertical") {
    return (
      <div
        className={clsx(
          "grid grid-cols-1 items-start justify-start justify-items-start",
          "w-full h-full",
          "py-[3px]",
          "relative"
        )}
      >
        <div
          className={clsx(
            "flex items-center justify-center",
            "w-3 h-3 p-[3px] relative z-1",
            variant === "primary"
              ? "bg-[#249124] dark:bg-icon-primary-subdued"
              : "bg-[#333FFF]",
            "rounded-[50%]"
          )}
        >
          <div
            className={clsx(
              "flex items-center justify-center",
              "w-full h-full",
              "bg-[white]",
              "rounded-[50%]"
            )}
          />
        </div>

        <div
          className={clsx(
            "w-[1px] h-[90%] absolute inset-0 left-1/2 -translate-x-1/2 z-0",
            "bg-[#EEF0EB]"
          )}
        />

        <div
          className={clsx(
            "flex items-center justify-center mt-auto",
            "w-3 h-3 relative z-[1]",
            variant === "primary"
              ? "bg-[#249124] dark:bg-icon-primary-subdued"
              : "bg-[#333FFF]",
            "rounded-[50%]"
          )}
        />
      </div>
    );
  }
  return (
    <div
      className={clsx(
        "max-lg:hidden grid grid-cols-[6px_1fr_6px] items-center content-center justify-start justify-items-start",
        "w-full",
        "relative"
      )}
    >
      <div
        className={clsx(
          "flex items-center justify-center",
          "w-[0.375rem] h-[0.375rem]",
          variant === "primary"
            ? "bg-[#249124] dark:bg-icon-primary-subdued"
            : "bg-[#333FFF]",
          "rounded-[50%]"
        )}
      >
        <div
          className={clsx(
            "flex items-center justify-center",
            "w-[3px] h-[3px]",
            "bg-white",
            "rounded-[50%]"
          )}
        />
      </div>

      <div className={clsx("w-[68px] h-[1px]", "bg-[#EEF0EB]")} />

      <div
        className={clsx(
          "flex items-center justify-center",
          "w-[0.375rem] h-[0.375rem]",
          variant === "primary"
            ? "bg-[#249124] dark:bg-icon-primary-subdued"
            : "bg-[#333FFF]",
          "rounded-[50%]"
        )}
      />
    </div>
  );
};

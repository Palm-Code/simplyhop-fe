import * as React from "react";
import clsx from "clsx";

export interface TravelTimeItemProps {
  time?: string;
  variant?: "primary" | "secondary";
}

export const TravelTimeItem = ({
  time = "",
  variant = "primary",
}: TravelTimeItemProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start"
      )}
    >
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
            variant === "primary" ? "bg-[#249124] dark:bg-icon-primary-subdued" : "bg-[#333FFF]",
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
            "bg-[#249124] dark:bg-icon-primary-subdued",
            "rounded-[50%]"
          )}
        />
      </div>

      <div
        className={clsx(
          "flex items-center justify-center gap-[0.25rem]",
          "w-full"
        )}
      >
        <p
          className={clsx(
            "text-[0.75rem] text-[#8C8D89] dark:text-white font-normal text-center whitespace-nowrap"
          )}
        >
          {time}
        </p>
      </div>
    </div>
  );
};

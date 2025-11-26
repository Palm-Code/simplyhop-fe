import * as React from "react";
import clsx from "clsx";
import Image from "next/image";
import { Button } from "../button";

export interface EmptyStateProps {
  message?: string;
  description?: string;
  cta?: {
    label: string;
    onClick?: () => void;
  };
}

export const EmptyState = ({ message, description, cta }: EmptyStateProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center gap-2",
        "w-full min-h-[406px]"
      )}
    >
      <Image
        src={"/images/general/empty_data.svg"}
        width={120}
        height={120}
        className={clsx("w-[120px] h-[120px]", "block dark:hidden")}
        alt={"empty-section"}
      />
      <Image
        src={"/images/general/empty_data_dark.svg"}
        width={120}
        height={120}
        className={clsx("w-[120px] h-[120px]", "hidden dark:block")}
        alt={"empty-section"}
      />
      <p
        className={clsx(
          "text-[#232323] dark:text-[white] text-[0.875rem] font-semibold text-center"
        )}
      >
        {message}
      </p>
      {description && (
        <p
          className={clsx(
            "text-[#979797] dark:text-[#C3C3C3] text-[0.875rem] font-normal text-center"
          )}
        >
          {description}
        </p>
      )}

      {cta && <Button onClick={cta.onClick}>{cta.label}</Button>}
    </div>
  );
};

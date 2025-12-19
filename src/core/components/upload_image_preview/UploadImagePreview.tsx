import * as React from "react";
import clsx from "clsx";
import SVGIcon from "@/core/icons";

export interface UploadImagePreviewProps {
  id?: string;
  src?: string;
  cta?: {
    disabled: boolean;
    onDelete?: () => void;
  };
}

export const UploadImagePreview = ({
  id = "",
  src,
  cta = {
    disabled: false,
    onDelete: () => {},
  },
}: UploadImagePreviewProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center gap-[0.5rem]",
        "relative",
        "border border-[#F1F1F1] dark:border-[#464646]",
        "rounded-[0.625rem]"
      )}
    >
      <img
        className={clsx(
          "w-25 h-25",
          "border border-[#F1F1F1] dark:border-[#464646]",
          "object-cover object-center",
          "rounded-[0.625rem]"
        )}
        src={src}
        alt={`image-${id}`}
      />
      <button
        aria-label={"Löschen"}
        name={"Löschen"}
        disabled={cta.disabled}
        className={clsx(
          "cursor-pointer",
          "flex items-center justify-center",
          "w-4 h-4",
          "rounded-full",
          "bg-[#F0F0F0] dark:bg-[#767676]",
          "absolute top-1 right-1"
        )}
        onClick={cta.onDelete}
      >
        <SVGIcon
          name="X"
          className={clsx("w-3 h-3", "text-[#767676] dark:text-[#C3C3C3]")}
        />
      </button>
    </div>
  );
};

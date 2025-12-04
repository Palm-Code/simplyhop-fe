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
        "grid grid-cols-1 place-content-center place-items-center gap-[0.5rem]"
      )}
    >
      <img
        className={clsx(
          "w-[100px] h-[100px]",
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
        className={clsx("cursor-pointer")}
        onClick={cta.onDelete}
      >
        <SVGIcon
          name="Trash"
          className={clsx("w-[1rem] h-[1rem]", "text-[#C50707]")}
        />
      </button>
    </div>
  );
};

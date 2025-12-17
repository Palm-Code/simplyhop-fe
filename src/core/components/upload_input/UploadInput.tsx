import * as React from "react";
import clsx from "clsx";
import { useRef } from "react";
import SVGIcon from "@/core/icons";

export interface UploadInputProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
  message?: string;
  description?: string;
  multiple?: boolean;
}

export const UploadInput = ({
  onDrop = () => {},
  onChange = () => {},
  message = "",
  description = "",
  multiple = true,
}: UploadInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    onChange(e);

    // if (e.currentTarget.files !== null && e.currentTarget.files!.length < 3) {
    //   if (onErrorMinFile) {
    //     onErrorMinFile();
    //     return;
    //   }
    // }

    // if (e.currentTarget.files !== null && e.currentTarget.files!.length > 12) {
    //   if (onErrorMaxFile) {
    //     onErrorMaxFile();
    //     return;
    //   }
    // }

    // if (
    //   e.currentTarget.files !== null &&
    //   e.currentTarget.files.length >= 3 &&
    //   e.currentTarget.files.length <= 12
    // ) {
    //   //looping to check one by one file size & return error if their is files with limit size
    //   for (let i = 0; i <= e.currentTarget.files.length - 1; i++) {
    //     const fsize = e.currentTarget.files.item(i)!.size;
    //     const file = Math.round(fsize / 1024);
    //     // Max size of the file 2MB
    //     if (file >= 2096) {
    //       if (onErrorMaxFileSize) {
    //         onErrorMaxFileSize();
    //         return;
    //       }
    //     }
    //   }
    //   // if not contain max file size uploading
    //   if (onUpload) {
    //     onUpload(e.currentTarget.files);
    //   }
    //   e.preventDefault();
    // }

    // e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDrop(e);

    // if (e.dataTransfer.files !== null && e.dataTransfer.files!.length < 3) {
    //   if (onErrorMinFile) {
    //     onErrorMinFile();
    //     return;
    //   }
    // }

    // if (e.dataTransfer.files !== null && e.dataTransfer.files!.length > 12) {
    //   if (onErrorMaxFile) {
    //     onErrorMaxFile();
    //     return;
    //   }
    // }

    // if (
    //   e.dataTransfer.files !== null &&
    //   e.dataTransfer.files.length >= 3 &&
    //   e.dataTransfer.files.length <= 12
    // ) {
    //   //looping to check one by one file size & return error if their is files with limit size
    //   for (let i = 0; i <= e.dataTransfer.files.length - 1; i++) {
    //     const fsize = e.dataTransfer.files.item(i)!.size;
    //     const file = Math.round(fsize / 1024);
    //     // Max size of the file
    //     if (file >= 2096) {
    //       if (onErrorMaxFileSize) {
    //         onErrorMaxFileSize();
    //         return;
    //       }
    //     }
    //   }
    //   // if not contain max file size uploading
    //   if (onUpload) {
    //     onUpload(e.dataTransfer.files);
    //   }
    //   e.preventDefault();
    // }
  };

  const handleClickUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef?.current?.click();
  };
  return (
    <div className={clsx("grid grid-cols-1 gap-y-[0.5rem]", "w-full")}>
      <div
        className={clsx(
          "relative",
          "grid grid-cols-1 place-content-center place-items-center gap-y-[0.5rem]",
          "border-[#CED4DA] dark:border-[#464646] border border-dashed",
          "w-full rounded-[0.5rem] p-[1.75rem]"
        )}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* overlay button */}
        <button
          aria-label={"Hochladen"}
          name={"Hochladen"}
          className={clsx(
            "absolute",
            "bottom-0 left-0 right-0 top-0",
            "bg-white opacity-0",
            "z-10",
            "cursor-pointer"
          )}
          onClick={handleClickUpload}
        />

        <input
          ref={inputRef}
          type="file"
          id="`inputFile`"
          className={clsx("sr-only")}
          multiple={multiple}
          accept={"image/jpeg, image/jpg, image/png, .pdf"}
          onChange={handleChangeUpload}
        />

        <div
          className={clsx(
            "grid grid-cols-1 lg:grid-cols-[2rem_1fr] place-content-center place-items-center gap-[0.25rem]"
          )}
        >
          <SVGIcon name="PictureUpload" />

          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-y-[0.25rem]"
            )}
          >
            <p
              className={clsx(
                "text-[black] dark:text-white text-[0.875rem] font-normal text-center lg:text-left"
              )}
            >
              {message}
            </p>
            <p
              className={clsx(
                "text-[#5B5B5B] dark:text-[#C3C3C3] text-[0.625rem] font-normal text-center lg:text-left"
              )}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

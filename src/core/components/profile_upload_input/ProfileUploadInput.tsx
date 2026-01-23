import * as React from "react";
import clsx from "clsx";
import { useRef } from "react";
import SVGIcon from "@/core/icons";
import { Avatar } from "../avatar";

export interface ProfileUploadInputProps {
  src?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const ProfileUploadInput = ({
  src = "",
  onDrop = () => {},
  onChange = () => {},
}: ProfileUploadInputProps) => {
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
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center gap-y-[0.5rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "relative",
          "grid grid-cols-1 place-content-center place-items-center gap-y-[0.5rem]",
          !src.length
            ? "border-[#CED4DA] border border-dashed"
            : "border-[2px] border-[#DFDFDF]",
          "w-[120px] h-[120px] rounded-[50%]"
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

        {!!src.length && (
          <Avatar src={src} className={clsx("w-[120px] h-[120px]")} />
        )}

        <input
          ref={inputRef}
          type="file"
          id="`inputFile`"
          className={clsx("sr-only")}
          multiple={true}
          accept={"image/jpeg, image/jpg, image/png, .pdf"}
          autoComplete="off"
          onChange={handleChangeUpload}
        />

        {!!src.length && (
          <div
            className={clsx(
              "absolute",
              "bottom-[-0.375rem] right-[-0.375rem]",
              "z-[10]",
              "w-[2.5rem] h-[2.5rem]",
              "rounded-[50%]",
              "flex items-center justify-center",
              "bg-[#F6F6F6]"
            )}
          >
            <SVGIcon
              name="Camera"
              className={clsx("w-[1.25rem] h-[1.25rem]", "text-[#5B5B5B]")}
            />
          </div>
        )}

        {!src.length && (
          <div
            className={clsx(
              "grid grid-cols-1 lg:grid-flow-col place-content-center place-items-center gap-[0.25rem]"
            )}
          >
            <SVGIcon
              name="Camera"
              className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#33CC33]")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

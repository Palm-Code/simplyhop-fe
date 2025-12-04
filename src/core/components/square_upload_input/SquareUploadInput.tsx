import * as React from "react";
import clsx from "clsx";
import { useRef } from "react";

export interface SquareUploadInputProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

export const SquareUploadInput = ({
  onChange = () => {},
  label = "",
}: SquareUploadInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    onChange(e);
  };

  const handleClickUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef?.current?.click();
  };
  return (
    <div
      className={clsx(
        "relative",
        "grid grid-cols-1 place-content-center place-items-center gap-y-[0.5rem]",
        "border-[#33CC33] border border-dashed",
        "w-[100px] h-[100px]",
        "rounded-[0.5rem]"
      )}
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
        multiple={true}
        accept={"image/jpeg, image/jpg, image/png, .pdf"}
        onChange={handleChangeUpload}
      />

      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-y-[0.25rem]"
        )}
      >
        <span
          className={clsx(
            "text-[#249124] dark:text-[#33CC33] text-center text-[0.625rem] font-normal"
          )}
          dangerouslySetInnerHTML={{ __html: label }}
        />
      </div>
    </div>
  );
};

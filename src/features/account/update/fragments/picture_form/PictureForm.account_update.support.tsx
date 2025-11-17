"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import {
  AccountUpdateSupportActionEnum,
  AccountUpdateSupportContext,
} from "../../context";
import { ProfileUploadInput } from "@/core/components/profile_upload_input";

export const PictureFormAccountUpdateSupport = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(AccountUpdateSupportContext);
  const handleChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: AccountUpdateSupportActionEnum.SetFormData,
      payload: {
        ...state.form,
        pictures: {
          ...state.form.pictures,
          files: !e.currentTarget.files
            ? []
            : !e.currentTarget.files.length
            ? []
            : Array.from(e.currentTarget.files).map((item) => item),
        },
      },
    });
  };

  const handleDropUpload = (e: React.DragEvent<HTMLDivElement>) => {
    dispatch({
      type: AccountUpdateSupportActionEnum.SetFormData,
      payload: {
        ...state.form,
        pictures: {
          ...state.form.pictures,
          files: !e.dataTransfer.files
            ? []
            : !e.dataTransfer.files.length
            ? []
            : Array.from(e.dataTransfer.files).map((item) => item),
        },
      },
    });
  };

  // const handleDeletePicture = (dataIndex: number) => {
  //   dispatch({
  //     type: AccountUpdateSupportActionEnum.SetFormData,
  //     payload: {
  //       ...state.form,
  //       pictures: {
  //         ...state.form.pictures,
  //         files: state.form.pictures.files.filter(
  //           (_, index) => index !== dataIndex
  //         ),
  //       },
  //     },
  //   });
  // };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.75rem]",
        "w-full"
      )}
    >
      {/* form */}

      <ProfileUploadInput
        src={
          typeof state.form.pictures.files === "string"
            ? state.form.pictures.files
            : !state.form.pictures.files.length
            ? ""
            : URL.createObjectURL(state.form.pictures.files[0])
        }
        onChange={handleChangeUpload}
        onDrop={handleDropUpload}
      />

      <div
        className={clsx(
          "grid grid-cols-1 place-content-center place-items-center gap-[0.25rem]",
          "w-full"
        )}
      >
        <p className={clsx("text-[0.875rem] text-[#232323CC] font-medium")}>
          {dictionaries.form.input.pictures.title}
        </p>
        <p className={clsx("text-[0.75rem] text-[#606060] font-normal")}>
          {dictionaries.form.input.pictures.description}
        </p>
      </div>
    </div>
  );
};

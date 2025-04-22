import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { UploadInput } from "@/core/components/upload_input";
import {
  VehicleCreateSupportActionEnum,
  VehicleCreateSupportContext,
} from "../../context";
import { UploadImagePreview } from "@/core/components/upload_image_preview/UploadImagePreview";
import { SquareUploadInput } from "@/core/components/square_upload_input";

export const PictureVehicleInformationFormVehicleCreateSupport = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(VehicleCreateSupportContext);
  const handleChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: VehicleCreateSupportActionEnum.SetVehicleInformationData,
      payload: {
        ...state.vehicle_information,
        pictures: {
          ...state.vehicle_information.pictures,
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
      type: VehicleCreateSupportActionEnum.SetVehicleInformationData,
      payload: {
        ...state.vehicle_information,
        pictures: {
          ...state.vehicle_information.pictures,
          files: !e.dataTransfer.files
            ? []
            : !e.dataTransfer.files.length
            ? []
            : Array.from(e.dataTransfer.files).map((item) => item),
        },
      },
    });
  };

  const handleChangeAddUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = !e.currentTarget.files
      ? []
      : !e.currentTarget.files.length
      ? []
      : Array.from(e.currentTarget.files).map((item) => item);
    dispatch({
      type: VehicleCreateSupportActionEnum.SetVehicleInformationData,
      payload: {
        ...state.vehicle_information,
        pictures: {
          ...state.vehicle_information.pictures,
          files: [...state.vehicle_information.pictures.files, ...newFiles],
        },
      },
    });
  };

  const handleDeletePicture = (dataIndex: number) => {
    dispatch({
      type: VehicleCreateSupportActionEnum.SetVehicleInformationData,
      payload: {
        ...state.vehicle_information,
        pictures: {
          ...state.vehicle_information.pictures,
          files: state.vehicle_information.pictures.files.filter(
            (_, index) => index !== dataIndex
          ),
        },
      },
    });
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.75rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[0.25rem]",
          "w-full"
        )}
      >
        <p className={clsx("text-[0.875rem] text-[#232323CC] font-medium")}>
          {dictionaries.vehicle_information.pictures.title}
        </p>
        <p className={clsx("text-[0.75rem] text-[#606060] font-normal")}>
          {dictionaries.vehicle_information.pictures.description}
        </p>
      </div>

      {/* form */}
      {!state.vehicle_information.pictures.files.length ? (
        <UploadInput
          message={dictionaries.vehicle_information.pictures.form.message}
          description={
            dictionaries.vehicle_information.pictures.form.description
          }
          onChange={handleChangeUpload}
          onDrop={handleDropUpload}
        />
      ) : (
        <div
          className={clsx(
            "flex items-start justify-start gap-[0.75rem] flex-wrap",
            "w-full"
          )}
        >
          {state.vehicle_information.pictures.files.map((item, itemIndex) => (
            <UploadImagePreview
              key={itemIndex}
              id={String(itemIndex)}
              blob={item}
              onDelete={() => handleDeletePicture(itemIndex)}
            />
          ))}
          <SquareUploadInput
            label={
              dictionaries.vehicle_information.pictures.square_input.form.label
            }
            onChange={handleChangeAddUpload}
          />
        </div>
      )}
    </div>
  );
};

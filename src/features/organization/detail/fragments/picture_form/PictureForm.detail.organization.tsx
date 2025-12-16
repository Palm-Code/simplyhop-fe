import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { UploadInput } from "@/core/components/upload_input";
import {
  DetailOrganizationActionEnum,
  DetailOrganizationContext,
} from "../../context";
import { UploadImagePreview } from "@/core/components/upload_image_preview/UploadImagePreview";

export const PictureFormDetailOrganization = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(DetailOrganizationContext);
  const handleChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: DetailOrganizationActionEnum.SetCompanyDataData,
      payload: {
        ...state.company_data,
        form: {
          ...state.company_data.form,
          pictures: {
            ...state.company_data.form.pictures,
            files: !e.currentTarget.files
              ? []
              : !e.currentTarget.files.length
              ? []
              : Array.from(e.currentTarget.files).map((item) => item),
          },
        },
      },
    });
  };

  const handleDropUpload = (e: React.DragEvent<HTMLDivElement>) => {
    dispatch({
      type: DetailOrganizationActionEnum.SetCompanyDataData,
      payload: {
        ...state.company_data,
        form: {
          ...state.company_data.form,
          pictures: {
            ...state.company_data.form.pictures,
            files: !e.dataTransfer.files
              ? []
              : !e.dataTransfer.files.length
              ? []
              : Array.from(e.dataTransfer.files).map((item) => item),
          },
        },
      },
    });
  };

  const handleDeletePicture = (dataIndex: number) => {
    dispatch({
      type: DetailOrganizationActionEnum.SetCompanyDataData,
      payload: {
        ...state.company_data,
        form: {
          ...state.company_data.form,
          pictures: {
            ...state.company_data.form.pictures,
            files: state.company_data.form.pictures.files.filter(
              (_, index) => index !== dataIndex
            ),
          },
        },
      },
    });
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-3",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-1",
          "w-full"
        )}
      >
        <p
          className={clsx(
            "text-[0.875rem] text-[#292929] dark:text-white font-bold"
          )}
        >
          {dictionaries.company_data.form.input.pictures.title}
        </p>
      </div>

      {/* form */}
      {!state.company_data.form.pictures.files.length ? (
        <UploadInput
          message={dictionaries.company_data.form.input.pictures.form.message}
          description={
            dictionaries.company_data.form.input.pictures.form.description
          }
          multiple={false}
          onChange={handleChangeUpload}
          onDrop={handleDropUpload}
        />
      ) : (
        <div
          className={clsx(
            "flex items-start justify-start gap-3 flex-wrap",
            "w-full"
          )}
        >
          {state.company_data.form.pictures.files.map((item, itemIndex) => (
            <UploadImagePreview
              key={itemIndex}
              id={String(itemIndex)}
              src={
                item instanceof File
                  ? window.URL.createObjectURL(item as Blob)
                  : item.image_url
              }
              cta={{
                disabled: false,
                onDelete: () => handleDeletePicture(itemIndex),
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

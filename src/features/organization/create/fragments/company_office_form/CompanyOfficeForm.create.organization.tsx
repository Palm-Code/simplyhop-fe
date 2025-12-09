"use client";
import * as React from "react";
import clsx from "clsx";
import {
  CreateOrganizationActionEnum,
  CreateOrganizationContext,
} from "../../context";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { Textfield } from "@/core/components/textfield";
import SVGIcon from "@/core/icons";
import { getError } from "@/core/utils/form";

export const CompanyOfficeFormCreateOrganization = () => {
  const dictionaries = getDictionaries();
  const globalDictionaries = getGlobalDictionaries();
  const { state, dispatch } = React.useContext(CreateOrganizationContext);

  const handleChangeAddressName = (
    e: React.ChangeEvent<HTMLInputElement>,
    dataIndex: number
  ) => {
    dispatch({
      type: CreateOrganizationActionEnum.SetCompanyOfficeData,
      payload: {
        ...state.company_office,
        form: state.company_office.form.map((item, itemIndex) => {
          return {
            ...item,
            address_name: {
              ...item.address_name,
              value:
                dataIndex === itemIndex
                  ? e.currentTarget.value
                  : item.address_name.value,
            },
          };
        }),
      },
    });
  };

  const handleChangeAddress1 = (
    e: React.ChangeEvent<HTMLInputElement>,
    dataIndex: number
  ) => {
    dispatch({
      type: CreateOrganizationActionEnum.SetCompanyOfficeData,
      payload: {
        ...state.company_office,
        form: state.company_office.form.map((item, itemIndex) => {
          return {
            ...item,
            address_1: {
              ...item.address_1,
              value:
                dataIndex === itemIndex
                  ? e.currentTarget.value
                  : item.address_1.value,
            },
          };
        }),
      },
    });
  };

  const handleChangeAddress2 = (
    e: React.ChangeEvent<HTMLInputElement>,
    dataIndex: number
  ) => {
    dispatch({
      type: CreateOrganizationActionEnum.SetCompanyOfficeData,
      payload: {
        ...state.company_office,
        form: state.company_office.form.map((item, itemIndex) => {
          return {
            ...item,
            address_2: {
              ...item.address_2,
              value:
                dataIndex === itemIndex
                  ? e.currentTarget.value
                  : item.address_2.value,
            },
          };
        }),
      },
    });
  };

  const handleChangeZipCode = (
    e: React.ChangeEvent<HTMLInputElement>,
    dataIndex: number
  ) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.zip_code.validations.items,
      value: e.currentTarget.value,
      type: "required",
    });
    dispatch({
      type: CreateOrganizationActionEnum.SetCompanyOfficeData,
      payload: {
        ...state.company_office,
        form: state.company_office.form.map((item, itemIndex) => {
          return {
            ...item,
            zip_code: {
              ...item.zip_code,
              value:
                dataIndex === itemIndex
                  ? e.currentTarget.value
                  : item.zip_code.value,
              error: dataIndex === itemIndex ? errorItem : item.city.error,
            },
          };
        }),
      },
    });
  };

  const handleChangeCity = (
    e: React.ChangeEvent<HTMLInputElement>,
    dataIndex: number
  ) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.city.validations.items,
      value: e.currentTarget.value,
      type: "required",
    });
    dispatch({
      type: CreateOrganizationActionEnum.SetCompanyOfficeData,
      payload: {
        ...state.company_office,
        form: state.company_office.form.map((item, itemIndex) => {
          return {
            ...item,
            city: {
              ...item.city,
              value:
                dataIndex === itemIndex
                  ? e.currentTarget.value
                  : item.city.value,
              error: dataIndex === itemIndex ? errorItem : item.city.error,
            },
          };
        }),
      },
    });
  };

  const handleClickAdd = () => {
    dispatch({
      type: CreateOrganizationActionEnum.SetCompanyOfficeData,
      payload: {
        ...state.company_office,
        form: [
          ...state.company_office.form,
          {
            address_name: {
              value: "",
              error: null,
            },
            address_1: {
              value: "",
              error: null,
            },
            address_2: {
              value: "",
              error: null,
            },
            zip_code: {
              value: "",
              error: null,
            },
            city: {
              value: "",
              error: null,
            },
          },
        ],
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
      <h2
        className={clsx("text-[1rem] text-[#292929] dark:text-white font-bold")}
      >
        {dictionaries.company_office.title}
      </h2>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-6",
          "w-full"
        )}
      >
        {state.company_office.form.map((form, formIndex) => {
          return (
            <div
              key={formIndex}
              className={clsx(
                "grid grid-cols-1 items-center content-center justify-items-start justify-start gap-[0.75rem]",
                "w-full",
                "py-4 px-4",
                "bg-[#FAFAFA] dark:bg-[#232323]"
              )}
            >
              {/* address_name */}
              <Textfield
                labelProps={{
                  ...dictionaries.company_office.form.input.address_name
                    .labelProps,
                }}
                inputProps={{
                  ...dictionaries.company_office.form.input.address_name
                    .inputProps,
                  value: form.address_name.value,
                  onChange: (e) => handleChangeAddressName(e, formIndex),
                }}
                error={form.address_name.error?.name}
                helperText={
                  dictionaries.company_office.form.input.address_name.inputProps
                    .helperText
                }
              />
              {/* address_1 */}
              <Textfield
                labelProps={{
                  ...dictionaries.company_office.form.input.address_1
                    .labelProps,
                }}
                inputProps={{
                  ...dictionaries.company_office.form.input.address_1
                    .inputProps,
                  value: form.address_1.value,
                  onChange: (e) => handleChangeAddress1(e, formIndex),
                }}
                error={form.address_1.error?.name}
              />
              {/* address_2 */}
              <Textfield
                labelProps={{
                  ...dictionaries.company_office.form.input.address_2
                    .labelProps,
                }}
                inputProps={{
                  ...dictionaries.company_office.form.input.address_2
                    .inputProps,
                  value: form.address_2.value,
                  onChange: (e) => handleChangeAddress2(e, formIndex),
                }}
                error={form.address_2.error?.name}
              />
              <div
                className={clsx(
                  "grid grid-cols-2 place-content-start place-items-start gap-3",
                  "w-full"
                )}
              >
                {/* zip_code */}
                <Textfield
                  labelProps={{
                    ...dictionaries.company_office.form.input.zip_code
                      .labelProps,
                  }}
                  inputProps={{
                    ...dictionaries.company_office.form.input.zip_code
                      .inputProps,
                    value: form.zip_code.value,
                    onChange: (e) => handleChangeZipCode(e, formIndex),
                  }}
                  error={form.zip_code.error?.name}
                />
                {/* city */}
                <Textfield
                  labelProps={{
                    ...dictionaries.company_office.form.input.city.labelProps,
                  }}
                  inputProps={{
                    ...dictionaries.company_office.form.input.city.inputProps,
                    value: form.city.value,
                    onChange: (e) => handleChangeCity(e, formIndex),
                  }}
                  error={form.city.error?.name}
                />
              </div>
            </div>
          );
        })}

        <button
          className={clsx(
            "flex items-center justify-center",
            "px-3 py-3",
            "w-full",
            "cursor-pointer",
            "text-[#249124] dark:text-[#33CC33] text-base font-semibold"
          )}
          onClick={handleClickAdd}
        >
          <SVGIcon name="Plus" className={clsx("w-4-h-4")} />
          {dictionaries.company_office.cta.add.children}
        </button>
      </div>
    </div>
  );
};

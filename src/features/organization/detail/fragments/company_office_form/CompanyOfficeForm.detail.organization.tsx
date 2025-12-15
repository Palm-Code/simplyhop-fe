"use client";
import * as React from "react";
import clsx from "clsx";
import {
  DetailOrganizationActionEnum,
  DetailOrganizationContext,
} from "../../context";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { Textfield } from "@/core/components/textfield";
import SVGIcon from "@/core/icons";
import { getError } from "@/core/utils/form";
import { Button } from "@/core/components/button";
import { PinPointInput } from "@/core/components/pin_point_input";

export const CompanyOfficeFormDetailOrganization = () => {
  const dictionaries = getDictionaries();
  const globalDictionaries = getGlobalDictionaries();
  const { state, dispatch } = React.useContext(DetailOrganizationContext);

  const handleChangeAddressName = (
    e: React.ChangeEvent<HTMLInputElement>,
    dataIndex: number
  ) => {
    dispatch({
      type: DetailOrganizationActionEnum.SetCompanyOfficeData,
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
      type: DetailOrganizationActionEnum.SetCompanyOfficeData,
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
      type: DetailOrganizationActionEnum.SetCompanyOfficeData,
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
      type: DetailOrganizationActionEnum.SetCompanyOfficeData,
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
      type: DetailOrganizationActionEnum.SetCompanyOfficeData,
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
      type: DetailOrganizationActionEnum.SetCompanyOfficeData,
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
            mode: "initial",
            pin_point: {
              value: null,
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
          if (form.mode === "view") {
            const title = form.address_name.value;
            const message = !form.address_2.value.length
              ? form.address_1.value
              : `${form.address_1.value} ${form.address_2.value}`;
            const description = `Standort markieren: ${form.pin_point.value?.location_1}`;
            const handleClickEdit = () => {
              dispatch({
                type: DetailOrganizationActionEnum.SetCompanyOfficeData,
                payload: {
                  ...state.company_office,
                  form: state.company_office.form.map((item, index) => {
                    return {
                      ...item,
                      mode: index === formIndex ? "edit" : item.mode,
                    };
                  }),
                },
              });
            };
            const handleClickDelete = () => {
              dispatch({
                type: DetailOrganizationActionEnum.SetPinPointDeleteConfirmationData,
                payload: {
                  ...state.pin_point_delete_confirmation,
                  is_open: true,
                  index: formIndex,
                },
              });
            };
            return (
              <div
                key={formIndex}
                className={clsx(
                  "flex items-start justify-between gap-4",
                  "w-full",
                  "px-4 py-4",
                  "bg-[#FAFAFA] dark:bg-[#232323]",
                  "rounded-lg"
                )}
              >
                <div
                  className={clsx(
                    "grid grid-cols-1 place-content-start place-items-start gap-2",
                    "w-full"
                  )}
                >
                  <p
                    className={clsx(
                      "text-sm text-[#232323] dark:text-white font-semibold"
                    )}
                  >
                    {title}
                  </p>
                  <p
                    className={clsx(
                      "text-sm text-[#5B5B5B] dark:text-[#DADADA] font-normal"
                    )}
                  >
                    {message}
                  </p>
                  <div
                    className={clsx(
                      "flex items-center justify-start gap-2",
                      "w-full"
                    )}
                  >
                    <SVGIcon
                      name="MapPin"
                      className={clsx(
                        "w-4 h-4",
                        "text-[#767676] dark:text-[#DADADA]"
                      )}
                    />
                    <p
                      className={clsx(
                        "text-sm text-[#5B5B5B] dark:text-[#DADADA] font-normal"
                      )}
                    >
                      {description}
                    </p>
                  </div>
                </div>

                <div className={clsx("flex items-start justify-end gap-4")}>
                  <button
                    className={clsx("cursor-pointer")}
                    onClick={handleClickEdit}
                  >
                    <SVGIcon
                      name="Pencil"
                      className={clsx(
                        "w-4 h-4",
                        "text-[#249124] dark:text-[#249124]"
                      )}
                    />
                  </button>
                  <button
                    className={clsx("cursor-pointer")}
                    onClick={handleClickDelete}
                  >
                    <SVGIcon
                      name="X"
                      className={clsx(
                        "w-4 h-4",
                        "text-[#C50707] dark:text-[#C50707]"
                      )}
                    />
                  </button>
                </div>
              </div>
            );
          }

          const handleClickPinPoint = () => {
            dispatch({
              type: DetailOrganizationActionEnum.SetPinPointData,
              payload: {
                ...state.pin_point,
                is_open: true,
                index: formIndex,
              },
            });
          };

          const handleClickSave = () => {
            dispatch({
              type: DetailOrganizationActionEnum.SetCompanyOfficeData,
              payload: {
                ...state.company_office,
                form: state.company_office.form.map((item, index) => {
                  return {
                    ...item,
                    mode: index === formIndex ? "view" : item.mode,
                  };
                }),
              },
            });
          };
          const handleClickCancel = () => {
            dispatch({
              type: DetailOrganizationActionEnum.SetCompanyOfficeData,
              payload: {
                ...state.company_office,
                form: state.company_office.form.map((item, index) => {
                  return {
                    ...item,
                    mode: index === formIndex ? "view" : item.mode,
                  };
                }),
              },
            });
          };

          const isSaveDisabled =
            !form.address_1.value.length &&
            !form.address_name.value.length &&
            !!form.address_name.error &&
            !form.city.value.length &&
            !!form.city.error &&
            !form.zip_code.value.length &&
            !!form.zip_code.error &&
            !form.pin_point.value;
          return (
            <div
              key={formIndex}
              className={clsx(
                "grid grid-cols-1 items-center content-center justify-items-start justify-start gap-3",
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

              <PinPointInput
                {...dictionaries.company_office.form.input.pin_point}
                value={
                  !form.pin_point.value
                    ? undefined
                    : `${form.pin_point?.value?.location_1} ${form.pin_point?.value?.location_2}`
                }
                cta={{
                  ...dictionaries.company_office.form.input.pin_point.cta,
                  onClick: handleClickPinPoint,
                }}
              />

              <div
                className={clsx(
                  "grid place-content-start place-items-start gap-4",
                  "w-full",
                  form.mode === "edit" ? "grid-cols-2" : "grid-cols-1"
                )}
              >
                {form.mode === "edit" && (
                  <button
                    className={clsx(
                      "flex items-center justify-center",
                      "w-full h-full",
                      "text-[#B30606] dark:text-[#B30606] text-base font-semibold",
                      "cursor-pointer"
                    )}
                    onClick={handleClickCancel}
                  >
                    {dictionaries.company_office.cta.cancel.children}
                  </button>
                )}

                <Button
                  aria-label={dictionaries.cta.save.children}
                  name={dictionaries.cta.save.children}
                  disabled={isSaveDisabled}
                  className={clsx("py-3!")}
                  onClick={handleClickSave}
                >
                  {dictionaries.company_office.cta.save.children}
                </Button>
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

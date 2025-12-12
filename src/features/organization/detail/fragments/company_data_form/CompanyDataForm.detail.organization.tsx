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
import { getError } from "@/core/utils/form";
import { CompanyCodeInput } from "@/core/components/company_code_input";

export const CompanyDataFormDetailOrganization = () => {
  const dictionaries = getDictionaries();
  const globalDictionaries = getGlobalDictionaries();
  const { state, dispatch } = React.useContext(DetailOrganizationContext);

  const handleChangeDomain = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.domain.validations.items,
      value: e.currentTarget.value,
      type: "required",
    });
    dispatch({
      type: DetailOrganizationActionEnum.SetCompanyDataData,
      payload: {
        ...state.company_data,
        form: {
          ...state.company_data.form,
          domain: {
            ...state.company_data.form.domain,
            value: e.currentTarget.value,
            error: errorItem,
          },
        },
      },
    });
  };

  const handleChangeAdminEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.email.validations.items,
      value: e.currentTarget.value,
      type: "required",
    });
    dispatch({
      type: DetailOrganizationActionEnum.SetCompanyDataData,
      payload: {
        ...state.company_data,
        form: {
          ...state.company_data.form,
          admin_email: {
            ...state.company_data.form.admin_email,
            value: e.currentTarget.value,
            error: errorItem,
          },
        },
      },
    });
  };

  const handleChangeCompanyName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.company_name.validations.items,
      value: e.currentTarget.value,
      type: "required",
    });
    dispatch({
      type: DetailOrganizationActionEnum.SetCompanyDataData,
      payload: {
        ...state.company_data,
        form: {
          ...state.company_data.form,
          company_name: {
            ...state.company_data.form.company_name,
            value: e.currentTarget.value,
            error: errorItem,
          },
        },
      },
    });
  };

  const handleChangeTelephone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.telephone.validations.items,
      value: e.currentTarget.value,
      type: "required",
    });
    dispatch({
      type: DetailOrganizationActionEnum.SetCompanyDataData,
      payload: {
        ...state.company_data,
        form: {
          ...state.company_data.form,
          telephone: {
            ...state.company_data.form.telephone,
            value: e.currentTarget.value,
            error: errorItem,
          },
        },
      },
    });
  };

  const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.first_name.validations.items,
      value: e.currentTarget.value,
      type: "required",
    });
    dispatch({
      type: DetailOrganizationActionEnum.SetCompanyDataData,
      payload: {
        ...state.company_data,
        form: {
          ...state.company_data.form,
          responsible_person: {
            ...state.company_data.form.responsible_person,
            first_name: {
              ...state.company_data.form.responsible_person.first_name,
              value: e.currentTarget.value,
              error: errorItem,
            },
          },
        },
      },
    });
  };

  const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.last_name.validations.items,
      value: e.currentTarget.value,
      type: "required",
    });
    dispatch({
      type: DetailOrganizationActionEnum.SetCompanyDataData,
      payload: {
        ...state.company_data,
        form: {
          ...state.company_data.form,
          responsible_person: {
            ...state.company_data.form.responsible_person,
            last_name: {
              ...state.company_data.form.responsible_person.last_name,
              value: e.currentTarget.value,
              error: errorItem,
            },
          },
        },
      },
    });
  };

  const handleChangeAddress1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: DetailOrganizationActionEnum.SetCompanyDataData,
      payload: {
        ...state.company_data,
        form: {
          ...state.company_data.form,
          address: {
            ...state.company_data.form.address,
            address_1: {
              ...state.company_data.form.address.address_1,
              value: e.currentTarget.value,
            },
          },
        },
      },
    });
  };

  const handleChangeAddress2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: DetailOrganizationActionEnum.SetCompanyDataData,
      payload: {
        ...state.company_data,
        form: {
          ...state.company_data.form,
          address: {
            ...state.company_data.form.address,
            address_2: {
              ...state.company_data.form.address.address_2,
              value: e.currentTarget.value,
            },
          },
        },
      },
    });
  };

  const handleChangeZipCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.zip_code.validations.items,
      value: e.currentTarget.value,
      type: "required",
    });
    dispatch({
      type: DetailOrganizationActionEnum.SetCompanyDataData,
      payload: {
        ...state.company_data,
        form: {
          ...state.company_data.form,
          address: {
            ...state.company_data.form.address,
            zip_code: {
              ...state.company_data.form.address.zip_code,
              value: e.currentTarget.value,
              error: errorItem,
            },
          },
        },
      },
    });
  };

  const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.city.validations.items,
      value: e.currentTarget.value,
      type: "required",
    });
    dispatch({
      type: DetailOrganizationActionEnum.SetCompanyDataData,
      payload: {
        ...state.company_data,
        form: {
          ...state.company_data.form,
          address: {
            ...state.company_data.form.address,
            city: {
              ...state.company_data.form.address.city,
              value: e.currentTarget.value,
              error: errorItem,
            },
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
      <h2
        className={clsx("text-[1rem] text-[#292929] dark:text-white font-bold")}
      >
        {dictionaries.company_data.title}
      </h2>
      <div
        className={clsx(
          "grid grid-cols-1 items-center content-center justify-items-start justify-start gap-3",
          "w-full",
          "py-2"
        )}
      >
        <>
          {/* company_name */}
          <Textfield
            labelProps={{
              ...dictionaries.company_data.form.input.company_name.labelProps,
            }}
            inputProps={{
              ...dictionaries.company_data.form.input.company_name.inputProps,
              value: state.company_data.form.company_name.value,
              onChange: handleChangeCompanyName,
            }}
            error={state.company_data.form.company_name.error?.name}
          />

          {!!state.company_data.form.domain.value.length && (
            <>
              {/* domain */}
              <Textfield
                labelProps={{
                  ...dictionaries.company_data.form.input.domain.labelProps,
                }}
                inputProps={{
                  ...dictionaries.company_data.form.input.domain.inputProps,
                  value: state.company_data.form.domain.value,
                  onChange: handleChangeDomain,
                }}
                error={state.company_data.form.domain.error?.name}
              />
            </>
          )}
          {!!state.company_data.form.company_code.value.length && (
            <>
              {/* company code */}
              <CompanyCodeInput
                {...dictionaries.company_data.form.input.company_code}
                value={state.company_data.form.company_code.value}
              />
            </>
          )}
          {/* admin_email */}
          <Textfield
            labelProps={{
              ...dictionaries.company_data.form.input.admin_email.labelProps,
            }}
            inputProps={{
              ...dictionaries.company_data.form.input.admin_email.inputProps,
              value: state.company_data.form.admin_email.value,
              onChange: handleChangeAdminEmail,
            }}
            error={state.company_data.form.admin_email.error?.name}
          />

          {/* telephone */}
          <Textfield
            labelProps={{
              ...dictionaries.company_data.form.input.telephone.labelProps,
            }}
            inputProps={{
              ...dictionaries.company_data.form.input.telephone.inputProps,
              value: state.company_data.form.telephone.value,
              onChange: handleChangeTelephone,
            }}
            error={state.company_data.form.telephone.error?.name}
          />

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
              {dictionaries.company_data.form.input.responsible_person.title}
            </p>
            <div
              className={clsx(
                "grid grid-cols-2 place-content-start place-items-start gap-3",
                "w-full"
              )}
            >
              {/* first_name */}
              <Textfield
                labelProps={{
                  ...dictionaries.company_data.form.input.responsible_person
                    .first_name.labelProps,
                }}
                inputProps={{
                  ...dictionaries.company_data.form.input.responsible_person
                    .first_name.inputProps,
                  value:
                    state.company_data.form.responsible_person.first_name.value,
                  onChange: handleChangeFirstName,
                }}
                error={
                  state.company_data.form.responsible_person.first_name.error
                    ?.name
                }
              />
              {/* last_name */}
              <Textfield
                labelProps={{
                  ...dictionaries.company_data.form.input.responsible_person
                    .last_name.labelProps,
                }}
                inputProps={{
                  ...dictionaries.company_data.form.input.responsible_person
                    .last_name.inputProps,
                  value:
                    state.company_data.form.responsible_person.last_name.value,
                  onChange: handleChangeLastName,
                }}
                error={
                  state.company_data.form.responsible_person.last_name.error
                    ?.name
                }
              />
            </div>
          </div>

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
              {dictionaries.company_data.form.input.address.title}
            </p>

            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-3",
                "w-full"
              )}
            >
              {/* address_1 */}
              <Textfield
                labelProps={{
                  ...dictionaries.company_data.form.input.address.address_1
                    .labelProps,
                }}
                inputProps={{
                  ...dictionaries.company_data.form.input.address.address_1
                    .inputProps,
                  value: state.company_data.form.address.address_1.value,
                  onChange: handleChangeAddress1,
                }}
                error={state.company_data.form.address.address_1.error?.name}
              />
              {/* address_2 */}
              <Textfield
                labelProps={{
                  ...dictionaries.company_data.form.input.address.address_2
                    .labelProps,
                }}
                inputProps={{
                  ...dictionaries.company_data.form.input.address.address_2
                    .inputProps,
                  value: state.company_data.form.address.address_2.value,
                  onChange: handleChangeAddress2,
                }}
                error={state.company_data.form.address.address_2.error?.name}
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
                    ...dictionaries.company_data.form.input.address.zip_code
                      .labelProps,
                  }}
                  inputProps={{
                    ...dictionaries.company_data.form.input.address.zip_code
                      .inputProps,
                    value: state.company_data.form.address.zip_code.value,
                    onChange: handleChangeZipCode,
                  }}
                  error={state.company_data.form.address.zip_code.error?.name}
                />
                {/* city */}
                <Textfield
                  labelProps={{
                    ...dictionaries.company_data.form.input.address.city
                      .labelProps,
                  }}
                  inputProps={{
                    ...dictionaries.company_data.form.input.address.city
                      .inputProps,
                    value: state.company_data.form.address.city.value,
                    onChange: handleChangeCity,
                  }}
                  error={state.company_data.form.address.city.error?.name}
                />
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

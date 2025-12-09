"use client";
import * as React from "react";
import clsx from "clsx";
import {
  CreateOrganizationActionEnum,
  CreateOrganizationContext,
} from "../../context";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { CompanyTypeDropdown } from "../../components/company_type_dropdown";
import { Textfield } from "@/core/components/textfield";
import { getError } from "@/core/utils/form";
import { CompanyCodeInput } from "../../components/company_code_input/CompanyCodeInput";

export const CompanyDataFormCreateOrganization = () => {
  const dictionaries = getDictionaries();
  const globalDictionaries = getGlobalDictionaries();
  const { state, dispatch } = React.useContext(CreateOrganizationContext);

  const handleSelectCompanyType = (data: {
    id: string;
    name: string;
    description: string;
  }) => {
    dispatch({
      type: CreateOrganizationActionEnum.SetCompanyDataData,
      payload: {
        ...state.company_data,
        form: {
          ...state.company_data.form,
          company_type: {
            ...state.company_data.form.company_type,
            selected: data,
          },
        },
      },
    });
  };

  const handleChangeDomain = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.domain.validations.items,
      value: e.currentTarget.value,
      type: "required",
    });
    dispatch({
      type: CreateOrganizationActionEnum.SetCompanyDataData,
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

  const handleClickGenerateCompanyCode = () => {
    //
  };

  const handleChangeAdminEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.email.validations.items,
      value: e.currentTarget.value,
      type: "required",
    });
    dispatch({
      type: CreateOrganizationActionEnum.SetCompanyDataData,
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
      type: CreateOrganizationActionEnum.SetCompanyDataData,
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
      type: CreateOrganizationActionEnum.SetCompanyDataData,
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
      type: CreateOrganizationActionEnum.SetCompanyDataData,
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
      type: CreateOrganizationActionEnum.SetCompanyDataData,
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
          "grid grid-cols-1 items-center content-center justify-items-start justify-start gap-[0.75rem]",
          "w-full",
          "py-[0.5rem]"
        )}
      >
        <CompanyTypeDropdown
          label={dictionaries.company_data.form.input.company_type.label}
          selected={state.company_data.form.company_type.selected}
          items={dictionaries.company_data.form.input.company_type.items}
          onSelect={handleSelectCompanyType}
        />
        {!!state.company_data.form.company_type.selected && (
          <>
            {state.company_data.form.company_type.selected.id === "domain" && (
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
            {state.company_data.form.company_type.selected.id ===
              "company_code" && (
              <>
                {/* company code */}
                <CompanyCodeInput
                  {...dictionaries.company_data.form.input.company_code}
                  value={state.company_data.form.company_code.value}
                  cta={{
                    ...dictionaries.company_data.form.input.company_code.cta,
                    onClick: handleClickGenerateCompanyCode,
                  }}
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
                      state.company_data.form.responsible_person.first_name
                        .value,
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
                      state.company_data.form.responsible_person.last_name
                        .value,
                    onChange: handleChangeLastName,
                  }}
                  error={
                    state.company_data.form.responsible_person.last_name.error
                      ?.name
                  }
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

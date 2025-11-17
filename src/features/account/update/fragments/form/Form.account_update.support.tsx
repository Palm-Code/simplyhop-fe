"use client";
import * as React from "react";
import clsx from "clsx";
import { Textfield } from "@/core/components/textfield";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { Textareafield } from "@/core/components/textareafield";
import {
  AccountUpdateSupportActionEnum,
  AccountUpdateSupportContext,
} from "../../context";
import { UserContext } from "@/core/modules/app/context";
import { getError } from "@/core/utils/form";
import { Dropdownfield } from "@/core/components/dropdownfield";

export const FormAccountUpdateSupport = () => {
  const globalDictionaries = getGlobalDictionaries();
  const dictionaries = getDictionaries();
  const { state: userState } = React.useContext(UserContext);
  const { state, dispatch } = React.useContext(AccountUpdateSupportContext);

  React.useEffect(() => {
    dispatch({
      type: AccountUpdateSupportActionEnum.SetFormData,
      payload: {
        ...state.form,

        first_name: {
          ...state.form.first_name,
          value: userState.profile?.first_name ?? "",
        },
        last_name: {
          ...state.form.last_name,
          value: userState.profile?.last_name ?? "",
        },
        city: {
          ...state.form.city,
          value: userState.profile?.city ?? "",
        },
        phonenumber: {
          ...state.form.phonenumber,
          value: userState.profile?.phonenumber ?? "",
        },
        about_me: {
          ...state.form.about_me,
          value: userState.profile?.about_me ?? "",
        },
        gender: {
          ...state.form.gender,
          selected:
            globalDictionaries.personal_information.gender.options.items.find(
              (item) => item.id === userState.profile?.gender
            ) ?? null,
        },
        pictures: {
          ...state.form.pictures,
          files: userState.profile?.avatar ?? [],
        },
      },
    });
  }, [
    userState.profile?.first_name,
    userState.profile?.last_name,
    userState.profile?.city,
    userState.profile?.phonenumber,
    userState.profile?.about_me,
    userState.profile?.gender,
    userState.profile?.avatar,
  ]);

  const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.first_name.validations.items,
      value: e.currentTarget.value,
      type: "optional",
    });
    dispatch({
      type: AccountUpdateSupportActionEnum.SetFormData,
      payload: {
        ...state.form,

        first_name: {
          ...state.form.first_name,
          value: e.currentTarget.value,
          error: errorItem,
        },
      },
    });
  };

  const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.last_name.validations.items,
      value: e.currentTarget.value,
      type: "optional",
    });
    dispatch({
      type: AccountUpdateSupportActionEnum.SetFormData,
      payload: {
        ...state.form,

        last_name: {
          ...state.form.last_name,
          value: e.currentTarget.value,
          error: errorItem,
        },
      },
    });
  };

  const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.city.validations.items,
      value: e.currentTarget.value,
      type: "optional",
    });
    dispatch({
      type: AccountUpdateSupportActionEnum.SetFormData,
      payload: {
        ...state.form,
        city: {
          ...state.form.city,
          value: e.currentTarget.value,
          error: errorItem,
        },
      },
    });
  };

  const handleChangePhonenumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Filter input to only allow + and numeric characters (0-9)
    const filteredValue = e.currentTarget.value.replace(/[^+0-9]/g, '');
    
    const errorItem = getError({
      errorItems: globalDictionaries.form.phonenumber.validations.items,
      value: filteredValue,
      type: "optional",
    });
    dispatch({
      type: AccountUpdateSupportActionEnum.SetFormData,
      payload: {
        ...state.form,
        phonenumber: {
          ...state.form.phonenumber,
          value: filteredValue,
          error: errorItem,
        },
      },
    });
  };

  const handleSelectGender = (data: { id: string; name: string }) => {
    dispatch({
      type: AccountUpdateSupportActionEnum.SetFormData,
      payload: {
        ...state.form,
        gender: {
          ...state.form.gender,
          selected: data,
        },
      },
    });
  };

  const handleChangeAboutMe = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: AccountUpdateSupportActionEnum.SetFormData,
      payload: {
        ...state.form,
        about_me: {
          ...state.form.about_me,
          value: e.currentTarget.value,
        },
      },
    });
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <Textfield
        labelProps={{ ...dictionaries.form.input.email.labelProps }}
        inputProps={{
          ...dictionaries.form.input.email.inputProps,
          value: userState.profile?.email,
        }}
        disabled
      />
      <div
        className={clsx(
          "grid grid-cols-2 place-content-start place-items-start gap-[1rem]",
          "w-full"
        )}
      >
        <Textfield
          labelProps={{ ...dictionaries.form.input.first_name.labelProps }}
          inputProps={{
            ...dictionaries.form.input.first_name.inputProps,
            value: state.form.first_name.value,
            onChange: handleChangeFirstName,
          }}
          error={state.form.first_name.error?.name}
        />
        <Textfield
          labelProps={{ ...dictionaries.form.input.last_name.labelProps }}
          inputProps={{
            ...dictionaries.form.input.last_name.inputProps,
            value: state.form.last_name.value,
            onChange: handleChangeLastName,
          }}
          error={state.form.last_name.error?.name}
        />
      </div>
      <Dropdownfield
        labelProps={{
          ...dictionaries.form.input.gender.labelProps,
        }}
        inputProps={{
          ...dictionaries.form.input.gender.inputProps,
        }}
        selected={state.form.gender.selected}
        items={globalDictionaries.personal_information.gender.options.items}
        onSelect={handleSelectGender}
      />
      <div
        className={clsx(
          "grid grid-cols-1 md:grid-cols-2 place-content-start place-items-start gap-[0.75rem]",
          "w-full"
        )}
      >
        <Textfield
          labelProps={{ ...dictionaries.form.input.city.labelProps }}
          inputProps={{
            ...dictionaries.form.input.city.inputProps,
            value: state.form.city.value,
            onChange: handleChangeCity,
          }}
          error={state.form.city.error?.name}
        />
        <Textfield
          labelProps={{ ...dictionaries.form.input.phonenumber.labelProps }}
          inputProps={{
            ...dictionaries.form.input.phonenumber.inputProps,
            value: state.form.phonenumber.value,
            onChange: handleChangePhonenumber,
          }}
          error={state.form.phonenumber.error?.name}
        />
      </div>

      <Textareafield
        labelProps={{ ...dictionaries.form.input.about_me.labelProps }}
        inputProps={{
          ...dictionaries.form.input.about_me.inputProps,
          value: state.form.about_me.value,
          onChange: handleChangeAboutMe,
        }}
      />
    </div>
  );
};

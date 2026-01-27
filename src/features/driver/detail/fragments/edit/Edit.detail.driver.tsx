"use client";
import * as React from "react";
import clsx from "clsx";
import { Textfield } from "@/core/components/textfield";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { Textareafield } from "@/core/components/textareafield";
import { DetailDriverActionEnum, DetailDriverContext } from "../../context";
import { UserContext } from "@/core/modules/app/context";
import { getError } from "@/core/utils/form";
import { Dropdownfield } from "@/core/components/dropdownfield";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import SVGIcon from "@/core/icons";
import { Button } from "@/core/components/button";
import { usePatchUserProfile } from "../../react_query/hooks";
import { MoonLoader } from "@/core/components/moon_loader";
import { Avatar } from "@/core/components/avatar";
import { queryClient } from "@/core/utils/react_query";
import { DetailDriverReactQueryKey } from "../../react_query/keys";
import { GetUserProfileIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/user_profile";
import { useParams } from "next/navigation";

export const EditDetailDriver = () => {
  const { isLg } = useTailwindBreakpoint();
  const globalDictionaries = getGlobalDictionaries();
  const dictionaries = getDictionaries();
  const { state: userState } = React.useContext(UserContext);
  const { state, dispatch } = React.useContext(DetailDriverContext);
  const { driver_id } = useParams();

  const { mutateAsync: patchUserProfile, isPending: isPendingPathUserProfile } =
    usePatchUserProfile();

  const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.first_name.validations.items,
      value: e.currentTarget.value,
      type: "optional",
    });
    dispatch({
      type: DetailDriverActionEnum.SetEditData,
      payload: {
        ...state.edit,
        form: {
          ...state.edit.form,
          first_name: {
            ...state.edit.form.first_name,
            value: e.currentTarget.value,
            error: errorItem,
          },
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
      type: DetailDriverActionEnum.SetEditData,
      payload: {
        ...state.edit,

        form: {
          ...state.edit.form,
          last_name: {
            ...state.edit.form.last_name,
            value: e.currentTarget.value,
            error: errorItem,
          },
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
      type: DetailDriverActionEnum.SetEditData,
      payload: {
        ...state.edit,
        form: {
          ...state.edit.form,
          city: {
            ...state.edit.form.city,
            value: e.currentTarget.value,
            error: errorItem,
          },
        },
      },
    });
  };

  const handleChangePhonenumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Filter input to only allow + and numeric characters (0-9)
    const filteredValue = e.currentTarget.value.replace(/[^+0-9]/g, "");

    const errorItem = getError({
      errorItems: globalDictionaries.form.phonenumber.validations.items,
      value: filteredValue,
      type: "optional",
    });
    dispatch({
      type: DetailDriverActionEnum.SetEditData,
      payload: {
        ...state.edit,
        form: {
          ...state.edit.form,
          phonenumber: {
            ...state.edit.form.phonenumber,
            value: filteredValue,
            error: errorItem,
          },
        },
      },
    });
  };

  const handleSelectGender = (data: { id: string; name: string }) => {
    dispatch({
      type: DetailDriverActionEnum.SetEditData,
      payload: {
        ...state.edit,
        form: {
          ...state.edit.form,
          gender: {
            ...state.edit.form.gender,
            selected: data,
          },
        },
      },
    });
  };

  const handleChangeAboutMe = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: DetailDriverActionEnum.SetEditData,
      payload: {
        ...state.edit,
        form: {
          ...state.edit.form,
          about_me: {
            ...state.edit.form.about_me,
            value: e.currentTarget.value,
          },
        },
      },
    });
  };

  const isOpen = state.edit.is_open;
  const onClose = () => {
    dispatch({
      type: DetailDriverActionEnum.SetEditData,
      payload: {
        ...state.edit,
        is_open: false,
      },
    });
  };

  const handleClickSave = async () => {
    const res = await patchUserProfile();
    if (!res) return;
    dispatch({
      type: DetailDriverActionEnum.SetEditData,
      payload: {
        ...state.edit,
        is_open: false,
      },
    });
    const payload: GetUserProfileIdPayloadRequestInterface = {
      path: {
        id: String(driver_id ?? "0"),
      },
      params: {
        include: "organization",
      },
    };
    queryClient.invalidateQueries({
      queryKey: DetailDriverReactQueryKey.GetUserProfileId(payload),
    });
  };

  const handleClickDeactivate = () => {
    dispatch({
      type: DetailDriverActionEnum.SetDeleteAccountConfirmationData,
      payload: {
        ...state.delete_account_confirmation,
        is_open: true,
      },
    });
  };

  const isPersonalFormValid =
    !!state.edit.form.first_name.value.length &&
    !state.edit.form.first_name.error &&
    !!state.edit.form.last_name.value.length &&
    !state.edit.form.last_name.error &&
    !!state.edit.form.gender.selected &&
    !state.edit.form.gender.error &&
    !!state.edit.form.city.value.length &&
    !state.edit.form.city.error &&
    !!state.edit.form.phonenumber.value.length &&
    !state.edit.form.phonenumber.error;

  const isSubmitDisabled = !isPersonalFormValid || isPendingPathUserProfile;
  const isSubmitLoading = isPendingPathUserProfile;

  return (
    <AdaptiveModal
      variant={isLg ? "modal" : "page_sheet"}
      className={clsx(
        "!max-w-[100vw] lg:!max-w-[584px]",
        "h-[100vh] lg:!h-fit",
        "!rounded-[0px] lg:!rounded-[0.625rem]",
        "overflow-hidden",
      )}
      open={isOpen}
      onClose={onClose}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[1rem]",
          "px-[0rem] sm:px-[2rem] py-[2rem]",
          "w-full h-full",
        )}
      >
        {/* header */}
        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]",
            "w-full",
            "px-[2rem] sm:px-[0rem]",
          )}
        >
          <button
            aria-label={"Zurück"}
            name={"Zurück"}
            className={clsx("cursor-pointer")}
            onClick={onClose}
          >
            <SVGIcon
              name="X"
              className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#5B5B5B]")}
            />
          </button>
          <h2
            className={clsx(
              "text-[#292929] dark:text-white text-[1.125rem] lg:text-[1.5rem] font-bold",
            )}
          >
            {dictionaries.edit.title}
          </h2>
        </div>
        {/* body */}
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
            "w-full",
            "px-4 py-4",
            "bg-[#F0F0F0] dark:bg-[#292929]",
            "rounded-[0.25rem]",
          )}
        >
          <div className={clsx("flex items-center justify-center", "w-full")}>
            <Avatar
              src={state.user.data?.avatar}
              variant="avatar"
              className={clsx("w-[3rem] h-[3rem]")}
            />
          </div>
          <Textfield
            labelProps={{ ...dictionaries.edit.form.input.email.labelProps }}
            inputProps={{
              ...dictionaries.edit.form.input.email.inputProps,
              value: userState.profile?.email,
            }}
            disabled
          />
          <div
            className={clsx(
              "grid grid-cols-2 place-content-start place-items-start gap-[1rem]",
              "w-full",
            )}
          >
            <Textfield
              labelProps={{
                ...dictionaries.edit.form.input.first_name.labelProps,
              }}
              inputProps={{
                ...dictionaries.edit.form.input.first_name.inputProps,
                value: state.edit.form.first_name.value,
                onChange: handleChangeFirstName,
              }}
              error={state.edit.form.first_name.error?.name}
            />
            <Textfield
              labelProps={{
                ...dictionaries.edit.form.input.last_name.labelProps,
              }}
              inputProps={{
                ...dictionaries.edit.form.input.last_name.inputProps,
                value: state.edit.form.last_name.value,
                onChange: handleChangeLastName,
              }}
              error={state.edit.form.last_name.error?.name}
            />
          </div>
          <Dropdownfield
            labelProps={{
              ...dictionaries.edit.form.input.gender.labelProps,
            }}
            inputProps={{
              ...dictionaries.edit.form.input.gender.inputProps,
            }}
            selected={state.edit.form.gender.selected}
            items={globalDictionaries.personal_information.gender.options.items}
            onSelect={handleSelectGender}
          />
          <div
            className={clsx(
              "grid grid-cols-1 md:grid-cols-2 place-content-start place-items-start gap-[0.75rem]",
              "w-full",
            )}
          >
            <Textfield
              labelProps={{ ...dictionaries.edit.form.input.city.labelProps }}
              inputProps={{
                ...dictionaries.edit.form.input.city.inputProps,
                value: state.edit.form.city.value,
                onChange: handleChangeCity,
              }}
              error={state.edit.form.city.error?.name}
            />
            <Textfield
              labelProps={{
                ...dictionaries.edit.form.input.phonenumber.labelProps,
              }}
              inputProps={{
                ...dictionaries.edit.form.input.phonenumber.inputProps,
                value: state.edit.form.phonenumber.value,
                onChange: handleChangePhonenumber,
              }}
              error={state.edit.form.phonenumber.error?.name}
            />
          </div>

          <Textareafield
            labelProps={{ ...dictionaries.edit.form.input.about_me.labelProps }}
            inputProps={{
              ...dictionaries.edit.form.input.about_me.inputProps,
              value: state.edit.form.about_me.value,
              onChange: handleChangeAboutMe,
            }}
          />
        </div>

        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[1rem]",
            "w-full",
            "py-[1rem]",
          )}
        >
          <Button
            aria-label={dictionaries.edit.cta.save.children}
            name={dictionaries.edit.cta.save.children}
            disabled={isSubmitDisabled}
            isLoading={isSubmitLoading}
            className={clsx("w-full")}
            onClick={handleClickSave}
          >
            {isSubmitLoading && <MoonLoader size={20} color={"white"} />}
            {dictionaries.edit.cta.save.children}
          </Button>
          <button
            aria-label={dictionaries.edit.cta.deactivate.children}
            name={dictionaries.edit.cta.deactivate.children}
            className={clsx(
              "grid grid-rows-1 grid-cols-1 place-content-center place-items-center",
              "w-full h-full",
              "text-[1rem] text-[#DA2323] font-medium",
              "cursor-pointer",
            )}
            onClick={handleClickDeactivate}
          >
            {dictionaries.edit.cta.deactivate.children}
          </button>
        </div>
      </div>
    </AdaptiveModal>
  );
};

"use client";
import * as React from "react";
import clsx from "clsx";
import { Textfield } from "@/core/components/textfield";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import {
  DetailOrganizationActionEnum,
  DetailOrganizationContext,
} from "../../context";
import { UserContext } from "@/core/modules/app/context";
import { getError } from "@/core/utils/form";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import SVGIcon from "@/core/icons";
import { Button } from "@/core/components/button";
import { usePutOrganizationProfile } from "../../react_query/hooks";
import { MoonLoader } from "@/core/components/moon_loader";
import { Avatar } from "@/core/components/avatar";
import { queryClient } from "@/core/utils/react_query";
import { DetailOrganizationReactQueryKey } from "../../react_query/keys";
import { GetUserProfileIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/user_profile";
import { useParams } from "next/navigation";

export const EditDetailOrganization = () => {
  const { isLg } = useTailwindBreakpoint();
  const globalDictionaries = getGlobalDictionaries();
  const dictionaries = getDictionaries();
  const { state: userState } = React.useContext(UserContext);
  const { state, dispatch } = React.useContext(DetailOrganizationContext);
  const { driver_id } = useParams();

  const { mutateAsync: putUserProfile, isPending: isPendingPutUserProfile } =
    usePutOrganizationProfile();

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorItem = getError({
      errorItems: globalDictionaries.form.first_name.validations.items,
      value: e.currentTarget.value,
      type: "optional",
    });
    dispatch({
      type: DetailOrganizationActionEnum.SetEditData,
      payload: {
        ...state.edit,
        form: {
          ...state.edit.form,
          name: {
            ...state.edit.form.name,
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
      type: DetailOrganizationActionEnum.SetEditData,
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
      type: DetailOrganizationActionEnum.SetEditData,
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

  const handleChangeResponsiblePersonFirstName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const errorItem = getError({
      errorItems:
        globalDictionaries.form.responsible_person_name.validations.items,
      value: e.currentTarget.value,
      type: "optional",
    });
    dispatch({
      type: DetailOrganizationActionEnum.SetEditData,
      payload: {
        ...state.edit,
        form: {
          ...state.edit.form,
          responsible_person: {
            ...state.edit.form.responsible_person,
            first_name: {
              ...state.edit.form.responsible_person.first_name,
              value: e.currentTarget.value,
              error: errorItem,
            },
          },
        },
      },
    });
  };

  const handleChangeResponsiblePersonLastName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const errorItem = getError({
      errorItems:
        globalDictionaries.form.responsible_person_name.validations.items,
      value: e.currentTarget.value,
      type: "optional",
    });
    dispatch({
      type: DetailOrganizationActionEnum.SetEditData,
      payload: {
        ...state.edit,
        form: {
          ...state.edit.form,
          responsible_person: {
            ...state.edit.form.responsible_person,
            last_name: {
              ...state.edit.form.responsible_person.last_name,
              value: e.currentTarget.value,
              error: errorItem,
            },
          },
        },
      },
    });
  };

  const isOpen = state.edit.is_open;
  const onClose = () => {
    dispatch({
      type: DetailOrganizationActionEnum.SetEditData,
      payload: {
        ...state.edit,
        is_open: false,
      },
    });
  };

  const handleClickSave = async () => {
    const res = await putUserProfile();
    if (!res) return;
    const payload: GetUserProfileIdPayloadRequestInterface = {
      path: {
        id: String(driver_id ?? "0"),
      },
    };
    queryClient.invalidateQueries({
      queryKey:
        DetailOrganizationReactQueryKey.GetDashboardSuperAdminPerOrganizationId(
          payload
        ),
    });
  };

  const handleClickDeactivate = () => {
    dispatch({
      type: DetailOrganizationActionEnum.SetDeleteAccountConfirmationData,
      payload: {
        ...state.delete_account_confirmation,
        is_open: true,
      },
    });
  };

  const isSubmitDisabled =
    !!state.edit.form.email.error ||
    !!state.edit.form.name.error ||
    !!state.edit.form.city.error ||
    !!state.edit.form.phonenumber.error ||
    !!state.edit.form.responsible_person.first_name.error ||
    !!state.edit.form.responsible_person.last_name.error ||
    isPendingPutUserProfile;
  const isSubmitLoading = isPendingPutUserProfile;

  return (
    <AdaptiveModal
      variant={isLg ? "modal" : "page_sheet"}
      className={clsx(
        "!max-w-[100vw] lg:!max-w-[584px]",
        "h-[100vh] lg:!h-fit",
        "!rounded-[0px] lg:!rounded-[0.625rem]",
        "overflow-hidden"
      )}
      open={isOpen}
      onClose={onClose}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[1rem]",
          "px-[0rem] sm:px-[2rem] py-[2rem]",
          "w-full h-full"
        )}
      >
        {/* header */}
        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]",
            "w-full",
            "px-[2rem] sm:px-[0rem]"
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
              className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#5B5B5B] dark:text-[#767676]")}
            />
          </button>
          <h2
            className={clsx(
              "text-[#292929] dark:text-white text-[1.125rem] lg:text-[1.5rem] font-bold"
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
            "rounded-[0.25rem]"
          )}
        >
          <div className={clsx("flex items-center justify-center", "w-full")}>
            <Avatar
              src={state.profile.data?.organization.logo}
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

          <Textfield
            labelProps={{
              ...dictionaries.edit.form.input.name.labelProps,
            }}
            inputProps={{
              ...dictionaries.edit.form.input.name.inputProps,
              value: state.edit.form.name.value,
              onChange: handleChangeName,
            }}
            error={state.edit.form.name.error?.name}
          />

          <div
            className={clsx(
              "grid grid-cols-1 md:grid-cols-2 place-content-start place-items-start gap-[0.75rem]",
              "w-full"
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

          <div
            className={clsx(
              "grid grid-cols-1 md:grid-cols-2 place-content-start place-items-start gap-[0.75rem]",
              "w-full"
            )}
          >
            <Textfield
              labelProps={{
                ...dictionaries.edit.form.input.responsible_person.first_name
                  .labelProps,
              }}
              inputProps={{
                ...dictionaries.edit.form.input.responsible_person.first_name
                  .inputProps,
                value: state.edit.form.responsible_person.first_name.value,
                onChange: handleChangeResponsiblePersonFirstName,
              }}
              error={state.edit.form.responsible_person.first_name.error?.name}
            />

            <Textfield
              labelProps={{
                ...dictionaries.edit.form.input.responsible_person.last_name
                  .labelProps,
              }}
              inputProps={{
                ...dictionaries.edit.form.input.responsible_person.last_name
                  .inputProps,
                value: state.edit.form.responsible_person.last_name.value,
                onChange: handleChangeResponsiblePersonLastName,
              }}
              error={state.edit.form.responsible_person.last_name.error?.name}
            />
          </div>
        </div>

        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[1rem]",
            "w-full",
            "py-[1rem]"
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
              "cursor-pointer"
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

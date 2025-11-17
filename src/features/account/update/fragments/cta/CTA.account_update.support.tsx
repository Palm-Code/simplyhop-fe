"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import {
  AccountUpdateSupportActionEnum,
  AccountUpdateSupportContext,
} from "../../context";
import { Button } from "@/core/components/button";
import { usePostUserProfileCreate } from "../../react_query/hooks";
import { UserActionEnum, UserContext } from "@/core/modules/app/context";
import { MoonLoader } from "@/core/components/moon_loader";

export const CTAAccountUpdateSupport = () => {
  const dictionaries = getDictionaries();
  const { state: userState, dispatch: dispatchUser } =
    React.useContext(UserContext);
  const { state, dispatch } = React.useContext(AccountUpdateSupportContext);
  const {
    mutateAsync: postUserProfileCreate,
    isPending: isPendingPostUserProfileCreate,
  } = usePostUserProfileCreate();

  const isSubmitDisabled =
    !!state.form.first_name.error ||
    !!state.form.last_name.error ||
    !!state.form.city.error ||
    !!state.form.phonenumber.error ||
    isPendingPostUserProfileCreate;
  const isSubmitLoading = isPendingPostUserProfileCreate;

  const handleClickSave = async () => {
    const res = await postUserProfileCreate();

    if (!res) return;

    if (userState.profile) {
      dispatchUser({
        type: UserActionEnum.SetProfileData,
        payload: {
          ...userState.profile,
          first_name: state.form.first_name.value,
          last_name: state.form.last_name.value,
          city: state.form.city.value,
          phonenumber: state.form.phonenumber.value,
          about_me: state.form.about_me.value,
          gender: state.form.gender.selected?.id ?? null,
          is_able_to_ride: res.data.can_share_ride,
        },
      });
    }
    dispatch({
      type: AccountUpdateSupportActionEnum.SetNotificationData,
      payload: {
        ...state.notification,
        is_open: true,
      },
    });
  };

  const handleClickDeactivate = () => {
    dispatch({
      type: AccountUpdateSupportActionEnum.SetDeactivateData,
      payload: {
        ...state.deactivate,
        is_open: true,
      },
    });
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-1 lg:grid-cols-2 items-start content-start justify-center justify-items-center gap-[1rem]",
        "w-full",
        "py-[1rem]"
      )}
    >
      <button
        aria-label={dictionaries.cta.deactivate.children}
        name={dictionaries.cta.deactivate.children}
        className={clsx(
          "grid grid-rows-1 grid-cols-1 place-content-center place-items-center",
          "w-full h-full",
          "text-[1rem] text-[#DA2323] font-medium",
          "cursor-pointer"
        )}
        onClick={handleClickDeactivate}
      >
        {dictionaries.cta.deactivate.children}
      </button>
      <Button
        aria-label={dictionaries.cta.save.children}
        name={dictionaries.cta.save.children}
        disabled={isSubmitDisabled}
        isLoading={isSubmitLoading}
        className={clsx("w-full")}
        onClick={handleClickSave}
      >
        {isSubmitLoading && <MoonLoader size={20} color={"white"} />}
        {dictionaries.cta.save.children}
      </Button>
    </div>
  );
};

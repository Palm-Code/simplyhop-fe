import { Button } from "@/core/components/button";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import {
  VehicleUpdateSupportActionEnum,
  VehicleUpdateSupportContext,
} from "../../context";
import { usePostVehicleUpdate } from "../../react_query/hooks";
import { MoonLoader } from "@/core/components/moon_loader";
import { UserContext } from "@/core/modules/app/context";

export const CTAVehicleUpdateSupport = () => {
  const dictionaries = getDictionaries();
  const { refetch: refetchUser } = React.useContext(UserContext);
  const { state, dispatch } = React.useContext(VehicleUpdateSupportContext);

  const {
    mutateAsync: postVehicleUpdate,
    isPending: isPendingPostVehicleUpdate,
  } = usePostVehicleUpdate();

  const handleClickDelete = () => {
    dispatch({
      type: VehicleUpdateSupportActionEnum.SetDeleteNotificationData,
      payload: {
        ...state.delete_notification,
        is_open: true,
      },
    });
  };

  const handleClickSave = async () => {
    await postVehicleUpdate();
    refetchUser();

    dispatch({
      type: VehicleUpdateSupportActionEnum.SetNotificationData,
      payload: {
        ...state.notification,
        is_open: true,
      },
    });
  };

  const isSaveDisabled = isPendingPostVehicleUpdate;
  const isSaveLoading = isPendingPostVehicleUpdate;
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-end justify-items-end gap-[1rem]",
        "w-full"
      )}
    >
      <button
        aria-label={dictionaries.cta.delete.children}
        name={dictionaries.cta.delete.children}
        className={clsx(
          "grid grid-rows-1 grid-cols-1 place-content-center place-items-center",
          "w-full h-full",
          "text-[1rem] text-[#DA2323] font-medium",
          "cursor-pointer",
          "px-[1rem] py-[1rem]"
        )}
        onClick={handleClickDelete}
      >
        {dictionaries.cta.delete.children}
      </button>

      <Button
        aria-label={dictionaries.cta.save.children}
        name={dictionaries.cta.save.children}
        disabled={isSaveDisabled}
        isLoading={isSaveLoading}
        className={clsx("px-[1rem] py-[1rem]")}
        onClick={handleClickSave}
      >
        {isSaveLoading && <MoonLoader size={20} color={"white"} />}
        {dictionaries.cta.save.children}
      </Button>
    </div>
  );
};

import { Button } from "@/core/components/button";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import {
  VehicleCreateSupportActionEnum,
  VehicleCreateSupportContext,
} from "../../context";
import { usePostVehicleCreateMy } from "../../react_query/hooks";
import { MoonLoader } from "@/core/components/moon_loader";
import { UserContext } from "@/core/modules/app/context";

export const CTAVehicleCreateSupport = () => {
  const dictionaries = getDictionaries();
  const { refetch: refetchUser } = React.useContext(UserContext);
  const { state, dispatch } = React.useContext(VehicleCreateSupportContext);

  const {
    mutateAsync: postVehicleCreateMy,
    isPending: isPendingPostVehicleCreateMy,
  } = usePostVehicleCreateMy();
  const handleClickSave = async () => {
    await postVehicleCreateMy();
    refetchUser();

    dispatch({
      type: VehicleCreateSupportActionEnum.SetNotificationData,
      payload: {
        ...state.notification,
        is_open: true,
      },
    });
  };

  const isSaveDisabled = isPendingPostVehicleCreateMy;
  const isSaveLoading = isPendingPostVehicleCreateMy;
  return (
    <Button
      aria-label={dictionaries.cta.save.children}
      name={dictionaries.cta.save.children}
      disabled={isSaveDisabled}
      isLoading={isSaveLoading}
      className={clsx("py-[1rem]")}
      onClick={handleClickSave}
    >
      {isSaveLoading && <MoonLoader size={20} color={"white"} />}
      {dictionaries.cta.save.children}
    </Button>
  );
};

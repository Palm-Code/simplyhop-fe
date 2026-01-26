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

  const isVehicleFormValid =
    !!state.vehicle_information.general.form.car_brand.selected &&
    !!state.vehicle_information.general.form.car_category.selected &&
    !!state.vehicle_information.general.form.car_model.value.length &&
    !!state.vehicle_information.general.form.license_plate.value.length &&
    !!state.vehicle_information.capacity.passenger_seats.form.available_seat
      .selected &&
    !!state.vehicle_information.capacity.passenger_seats.form.available_car_seat
      .selected &&
    !!state.vehicle_information.capacity.luggage.form.luggage.selected &&
    (state.vehicle_information.capacity.luggage.form.luggage.selected?.id !==
    "0"
      ? !!state.vehicle_information.capacity.luggage.form.luggage_size.selected
      : true) &&
    !!state.vehicle_information.trip.form.smoking.selected &&
    !!state.vehicle_information.trip.form.music.selected &&
    !!state.vehicle_information.trip.form.pet.selected;

  const isSaveDisabled = !isVehicleFormValid || isPendingPostVehicleCreateMy;
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

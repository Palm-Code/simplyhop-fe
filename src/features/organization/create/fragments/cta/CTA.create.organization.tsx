import { Button } from "@/core/components/button";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import {
  CreateOrganizationActionEnum,
  CreateOrganizationContext,
} from "../../context";

import { MoonLoader } from "@/core/components/moon_loader";
import { usePostOrganizationCreate } from "../../react_query/hooks";

export const CTACreateOrganization = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(CreateOrganizationContext);

  const {
    mutateAsync: postOrganizationCreate,
    isPending: isPendingPostOrganizationCreate,
  } = usePostOrganizationCreate();

  const handleClickSave = async () => {
    const res = await postOrganizationCreate();
    if (!res) return;
    dispatch({
      type: CreateOrganizationActionEnum.SetNotificationData,
      payload: {
        ...state.notification,
        is_open: true,
      },
    });
  };

  // const isPersonalFormValid =
  //   !!state.personal_information.form.first_name.value.length &&
  //   !state.personal_information.form.first_name.error &&
  //   !!state.personal_information.form.last_name.value.length &&
  //   !state.personal_information.form.last_name.error &&
  //   !!state.personal_information.form.gender.selected &&
  //   !state.personal_information.form.gender.error &&
  //   !!state.personal_information.form.city.value.length &&
  //   !state.personal_information.form.city.error &&
  //   !!state.personal_information.form.phonenumber.value.length &&
  //   !state.personal_information.form.phonenumber.error;

  // const isVehicleFormValid =
  //   state.ride_plan.form.offer_trip.selected?.id === "no"
  //     ? true
  //     : !!state.vehicle_information.general.form.car_brand.selected &&
  //       !!state.vehicle_information.general.form.car_category.selected &&
  //       !!state.vehicle_information.general.form.car_model.value.length &&
  //       !!state.vehicle_information.general.form.license_plate.value.length &&
  //       !!state.vehicle_information.capacity.passenger_seats.form.available_seat
  //         .selected &&
  //       !!state.vehicle_information.capacity.passenger_seats.form
  //         .available_car_seat.selected &&
  //       !!state.vehicle_information.capacity.luggage.form.luggage.selected &&
  //       !!state.vehicle_information.capacity.luggage.form.luggage_size
  //         .selected &&
  //       !!state.vehicle_information.trip.form.smoking.selected &&
  //       !!state.vehicle_information.trip.form.music.selected &&
  //       !!state.vehicle_information.trip.form.pet.selected;

  // const isSaveDisabled =
  //   !isPersonalFormValid ||
  //   !isVehicleFormValid ||
  //   isPendingPostUserProfileCreate ||
  //   isPendingPostVehicleCreateMy;
  // const isSaveLoading =
  //   isPendingPostUserProfileCreate || isPendingPostVehicleCreateMy;
  const isSaveDisabled = isPendingPostOrganizationCreate;
  const isSaveLoading = isPendingPostOrganizationCreate;
  return (
    <Button
      aria-label={dictionaries.cta.save.children}
      name={dictionaries.cta.save.children}
      disabled={isSaveDisabled}
      isLoading={isSaveLoading}
      className={clsx("py-3")}
      onClick={handleClickSave}
    >
      {isSaveLoading && <MoonLoader size={20} color={"white"} />}
      {dictionaries.cta.save.children}
    </Button>
  );
};

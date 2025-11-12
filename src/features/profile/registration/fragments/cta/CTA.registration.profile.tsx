import { Button } from "@/core/components/button";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import {
  RegistrationProfileActionEnum,
  RegistrationProfileContext,
} from "../../context";
import {
  usePostUserProfileCreate,
  usePostVehicleCreateMy,
} from "../../react_query/hooks";
import { MoonLoader } from "@/core/components/moon_loader";
import { UserActionEnum, UserContext } from "@/core/modules/app/context";

export const CTARegistrationProfile = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(RegistrationProfileContext);
  const { dispatch: dispatchUser } = React.useContext(UserContext);
  const {
    mutateAsync: postUserProfileCreate,
    isPending: isPendingPostUserProfileCreate,
  } = usePostUserProfileCreate();
  const {
    mutateAsync: postVehicleCreateMy,
    isPending: isPendingPostVehicleCreateMy,
  } = usePostVehicleCreateMy();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("new_user");
    }
  }, []);

  const handleClickSave = async () => {
    const user = await postUserProfileCreate();
    if (!user) return;

    if (state.ride_plan.form.offer_trip.selected?.id === "yes") {
      const vehicle = await postVehicleCreateMy();
      if (!vehicle) return;
      if (user.data.is_profile_complete && !!vehicle.data) {
        localStorage.setItem("new_user", "true");
      }
    }

    if (
      state.ride_plan.form.offer_trip.selected?.id === "no" &&
      user.data.is_profile_complete
    ) {
      localStorage.setItem("new_user", "true");
    }

    dispatchUser({
      type: UserActionEnum.SetProfileData,
      payload: {
        id: user.data.id,
        first_name: user.data?.first_name ?? "",
        last_name: user.data?.last_name ?? "",
        avatar: user.data.avatar,
        email: user.data.email,
        phonenumber: user.data?.mobile ?? "",
        city: user.data?.city ?? "",
        about_me: user.data?.profile?.bio ?? "",
        is_driver: user.data?.is_driver === 1 ? true : false,
        gender: user.data?.gender ?? null,
        is_able_to_ride: user.data.can_share_ride,
        is_super_admin: user.data.is_super_admin,
        role: user.data.role,
      },
    });

    dispatch({
      type: RegistrationProfileActionEnum.SetNotificationData,
      payload: {
        ...state.notification,
        is_open: true,
      },
    });
  };

  const isPersonalFormValid =
    !!state.personal_information.form.first_name.value.length &&
    !state.personal_information.form.first_name.error &&
    !!state.personal_information.form.last_name.value.length &&
    !state.personal_information.form.last_name.error &&
    !!state.personal_information.form.gender.selected &&
    !state.personal_information.form.gender.error &&
    !!state.personal_information.form.city.value.length &&
    !state.personal_information.form.city.error &&
    !!state.personal_information.form.phonenumber.value.length &&
    !state.personal_information.form.phonenumber.error;

  const isVehicleFormValid =
    state.ride_plan.form.offer_trip.selected?.id === "no"
      ? true
      : !!state.vehicle_information.general.form.car_brand.selected &&
        !!state.vehicle_information.general.form.car_category.selected &&
        !!state.vehicle_information.general.form.car_model.value.length &&
        !!state.vehicle_information.general.form.license_plate.value.length &&
        !!state.vehicle_information.capacity.passenger_seats.form.available_seat
          .selected &&
        !!state.vehicle_information.capacity.passenger_seats.form
          .available_car_seat.selected &&
        !!state.vehicle_information.capacity.luggage.form.luggage.selected &&
        !!state.vehicle_information.capacity.luggage.form.luggage_size
          .selected &&
        !!state.vehicle_information.trip.form.smoking.selected &&
        !!state.vehicle_information.trip.form.music.selected &&
        !!state.vehicle_information.trip.form.pet.selected;

  const isSaveDisabled =
    !isPersonalFormValid ||
    !isVehicleFormValid ||
    isPendingPostUserProfileCreate ||
    isPendingPostVehicleCreateMy;
  const isSaveLoading =
    isPendingPostUserProfileCreate || isPendingPostVehicleCreateMy;
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

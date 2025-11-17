"use client";
import * as React from "react";
import clsx from "clsx";
import {
  VehiclesSupportActionEnum,
  VehiclesSupportContext,
} from "../../context";
import { getDictionaries } from "../../i18n";
import { DropdownSelect } from "@/core/components/dropdown_select";
import { UserActionEnum, UserContext } from "@/core/modules/app/context";
import { usePostUserProfileCreate } from "../../react_query/hooks";

export const RidePlanFormVehiclesSupport = () => {
  const dictionaries = getDictionaries();
  const { state: userState, dispatch: dispatchUser } =
    React.useContext(UserContext);
  const { state, dispatch } = React.useContext(VehiclesSupportContext);
  const { mutateAsync: postUserProfileCreate } = usePostUserProfileCreate();
  React.useEffect(() => {
    dispatch({
      type: VehiclesSupportActionEnum.SetRidePlanData,
      payload: {
        ...state.ride_plan,
        form: {
          ...state.ride_plan.form,
          offer_trip: {
            ...state.ride_plan.form.offer_trip,
            selected:
              dictionaries.ride_plan.form.input.offer_trip.items.find((item) =>
                userState.profile?.is_driver
                  ? item.id === "yes"
                  : item.id === "no"
              ) ?? null,
          },
        },
      },
    });
  }, [
    dictionaries.ride_plan.form.input.offer_trip.items,
    userState.profile?.is_driver,
  ]);

  const handleSelectOfferTrip = async (data: { id: string; name: string }) => {
    const res = await postUserProfileCreate(data);
    if (!res.data) return;
    if (!userState.profile) return;

    dispatchUser({
      type: UserActionEnum.SetProfileData,
      payload: {
        ...userState.profile,
        is_driver: res.data.is_driver === 1,
        is_able_to_ride: res.data.can_share_ride,
      },
    });

    dispatch({
      type: VehiclesSupportActionEnum.SetRidePlanData,
      payload: {
        ...state.ride_plan,
        form: {
          ...state.ride_plan.form,
          offer_trip: {
            ...state.ride_plan.form.offer_trip,
            selected: data,
          },
        },
      },
    });
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-1 lg:grid-cols-[1fr_444px] items-center content-center justify-items-start justify-start gap-[0.75rem]",
        "w-full",
        "py-[0.5rem]"
      )}
    >
      <p className={clsx("text-[#292929] text-[1rem] font-semibold")}>
        {dictionaries.ride_plan.form.input.offer_trip.label}
      </p>

      <DropdownSelect
        selected={state.ride_plan.form.offer_trip.selected}
        items={dictionaries.ride_plan.form.input.offer_trip.items}
        onSelect={handleSelectOfferTrip}
      />
    </div>
  );
};

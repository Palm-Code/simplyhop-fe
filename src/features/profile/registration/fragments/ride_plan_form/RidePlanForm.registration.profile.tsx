"use client";
import * as React from "react";
import clsx from "clsx";
import {
  RegistrationProfileActionEnum,
  RegistrationProfileContext,
} from "../../context";
import { getDictionaries } from "../../i18n";
import { DropdownSelect } from "@/core/components/dropdown_select";

export const RidePlanFormRegistrationProfile = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(RegistrationProfileContext);

  React.useEffect(() => {
    dispatch({
      type: RegistrationProfileActionEnum.SetRidePlanData,
      payload: {
        ...state.ride_plan,
        form: {
          ...state.ride_plan.form,
          offer_trip: {
            ...state.ride_plan.form.offer_trip,
            selected:
              dictionaries.ride_plan.form.input.offer_trip.items.find(
                (item) => item.id === "no"
              ) ?? null,
          },
        },
      },
    });
  }, [dictionaries.ride_plan.form.input.offer_trip.items]);

  const handleSelectOfferTrip = (data: { id: string; name: string }) => {
    dispatch({
      type: RegistrationProfileActionEnum.SetRidePlanData,
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
        "grid grid-cols-1 lg:grid-cols-[274px_1fr] items-center content-center justify-items-start justify-start gap-[0.75rem]",
        "w-full",
        "py-[0.5rem]"
      )}
    >
      <p
        className={clsx(
          "text-[#292929] dark:text-white text-[1rem] font-semibold"
        )}
      >
        {dictionaries.ride_plan.form.input.offer_trip.label}
        {dictionaries.ride_plan.form.input.offer_trip.required && (
          <span className={clsx("text-[#FF0066]")}>{"*"}</span>
        )}
      </p>

      <DropdownSelect
        selected={state.ride_plan.form.offer_trip.selected}
        items={dictionaries.ride_plan.form.input.offer_trip.items}
        onSelect={handleSelectOfferTrip}
      />
    </div>
  );
};

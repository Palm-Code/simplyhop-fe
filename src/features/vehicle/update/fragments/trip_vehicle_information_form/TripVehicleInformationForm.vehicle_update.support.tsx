import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { Dropdownfield } from "@/core/components/dropdownfield";
import {
  VehicleUpdateSupportActionEnum,
  VehicleUpdateSupportContext,
} from "../../context";

export const TripVehicleInformationFormVehicleUpdateSupport = () => {
  const dictionaries = getDictionaries();
  const globalDictionaries = getGlobalDictionaries();
  const { state, dispatch } = React.useContext(VehicleUpdateSupportContext);

  const handleSelectSmoking = (data: { id: string; name: string }) => {
    dispatch({
      type: VehicleUpdateSupportActionEnum.SetVehicleInformationData,
      payload: {
        ...state.vehicle_information,
        trip: {
          ...state.vehicle_information.trip,
          form: {
            ...state.vehicle_information.trip.form,
            smoking: {
              ...state.vehicle_information.trip.form.smoking,
              selected: data,
            },
          },
        },
      },
    });
  };

  const handleSelectMusic = (data: { id: string; name: string }) => {
    dispatch({
      type: VehicleUpdateSupportActionEnum.SetVehicleInformationData,
      payload: {
        ...state.vehicle_information,
        trip: {
          ...state.vehicle_information.trip,
          form: {
            ...state.vehicle_information.trip.form,
            music: {
              ...state.vehicle_information.trip.form.music,
              selected: data,
            },
          },
        },
      },
    });
  };

  const handleSelectPet = (data: { id: string; name: string }) => {
    dispatch({
      type: VehicleUpdateSupportActionEnum.SetVehicleInformationData,
      payload: {
        ...state.vehicle_information,
        trip: {
          ...state.vehicle_information.trip,
          form: {
            ...state.vehicle_information.trip.form,
            pet: {
              ...state.vehicle_information.trip.form.pet,
              selected: data,
            },
          },
        },
      },
    });
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.75rem]",
        "w-full"
      )}
    >
      <div className={clsx("py-[0.5rem]")}>
        <p className={clsx("text-[0.875rem] text-[#232323CC] font-medium")}>
          {dictionaries.vehicle_information.trip.title}
        </p>
      </div>

      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[0.75rem]",
          "w-full"
        )}
      >
        <Dropdownfield
          labelProps={{
            ...dictionaries.vehicle_information.trip.form.input.smoking
              .labelProps,
          }}
          inputProps={{
            ...dictionaries.vehicle_information.trip.form.input.smoking
              .inputProps,
          }}
          selected={state.vehicle_information.trip.form.smoking.selected}
          items={
            globalDictionaries.vehicle.smoking.type.options.items
          }
          onSelect={handleSelectSmoking}
        />
        <Dropdownfield
          labelProps={{
            ...dictionaries.vehicle_information.trip.form.input.music
              .labelProps,
          }}
          inputProps={{
            ...dictionaries.vehicle_information.trip.form.input.music
              .inputProps,
          }}
          selected={state.vehicle_information.trip.form.music.selected}
          items={globalDictionaries.vehicle.music.type.options.items}
          onSelect={handleSelectMusic}
        />
        <Dropdownfield
          labelProps={{
            ...dictionaries.vehicle_information.trip.form.input.pet.labelProps,
          }}
          inputProps={{
            ...dictionaries.vehicle_information.trip.form.input.pet.inputProps,
          }}
          selected={state.vehicle_information.trip.form.pet.selected}
          items={globalDictionaries.vehicle.pets.type.options.items}
          onSelect={handleSelectPet}
        />
      </div>
    </div>
  );
};

import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { Dropdownfield } from "@/core/components/dropdownfield";
import {
  VehicleUpdateSupportActionEnum,
  VehicleUpdateSupportContext,
} from "../../context";

export const CapacityVehicleInformationFormVehicleUpdateSupport = () => {
  const dictionaries = getDictionaries();
  const globalDictionaries = getGlobalDictionaries();
  const { state, dispatch } = React.useContext(VehicleUpdateSupportContext);

  const handleSelectAvailableSeat = (data: { id: string; name: string }) => {
    dispatch({
      type: VehicleUpdateSupportActionEnum.SetVehicleInformationData,
      payload: {
        ...state.vehicle_information,
        capacity: {
          ...state.vehicle_information.capacity,
          passenger_seats: {
            ...state.vehicle_information.capacity.passenger_seats,
            form: {
              ...state.vehicle_information.capacity.passenger_seats.form,
              available_seat: {
                ...state.vehicle_information.capacity.passenger_seats.form
                  .available_seat,
                selected: data,
              },
            },
          },
        },
      },
    });
  };

  const handleSelectAvailableCarSeat = (data: { id: string; name: string }) => {
    dispatch({
      type: VehicleUpdateSupportActionEnum.SetVehicleInformationData,
      payload: {
        ...state.vehicle_information,
        capacity: {
          ...state.vehicle_information.capacity,
          passenger_seats: {
            ...state.vehicle_information.capacity.passenger_seats,
            form: {
              ...state.vehicle_information.capacity.passenger_seats.form,
              available_car_seat: {
                ...state.vehicle_information.capacity.passenger_seats.form
                  .available_car_seat,
                selected: data,
              },
            },
          },
        },
      },
    });
  };

  const handleSelectLuggage = (data: { id: string; name: string }) => {
    dispatch({
      type: VehicleUpdateSupportActionEnum.SetVehicleInformationData,
      payload: {
        ...state.vehicle_information,
        capacity: {
          ...state.vehicle_information.capacity,
          luggage: {
            ...state.vehicle_information.capacity.luggage,
            form: {
              ...state.vehicle_information.capacity.luggage.form,
              luggage: {
                ...state.vehicle_information.capacity.luggage.form.luggage,
                selected: data,
              },
              luggage_size: {
                ...state.vehicle_information.capacity.luggage.form.luggage_size,
                selected:
                  data.id === "0"
                    ? null
                    : state.vehicle_information.capacity.luggage.form
                        .luggage_size.selected,
              },
            },
          },
        },
      },
    });
  };

  const handleSelectLuggageSize = (data: { id: string; name: string }) => {
    dispatch({
      type: VehicleUpdateSupportActionEnum.SetVehicleInformationData,
      payload: {
        ...state.vehicle_information,
        capacity: {
          ...state.vehicle_information.capacity,
          luggage: {
            ...state.vehicle_information.capacity.luggage,
            form: {
              ...state.vehicle_information.capacity.luggage.form,
              luggage_size: {
                ...state.vehicle_information.capacity.luggage.form.luggage_size,
                selected: data,
              },
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
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[0.25rem]",
          "w-full"
        )}
      >
        <p className={clsx("text-[0.875rem] text-[#232323CC] font-medium")}>
          {dictionaries.vehicle_information.capacity.title}
        </p>
        <p className={clsx("text-[0.75rem] text-[#606060] font-normal")}>
          {dictionaries.vehicle_information.capacity.description}
        </p>
      </div>

      {/* NOTES: passenger seats */}
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
          "w-full"
        )}
      >
        <p className={clsx("text-[0.875rem] text-[#232323CC] font-medium")}>
          {dictionaries.vehicle_information.capacity.passenger_seats.title}
        </p>

        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[0.75rem]",
            "w-full"
          )}
        >
          <Dropdownfield
            labelProps={{
              ...dictionaries.vehicle_information.capacity.passenger_seats.form
                .input.available_seat.labelProps,
            }}
            inputProps={{
              ...dictionaries.vehicle_information.capacity.passenger_seats.form
                .input.available_seat.inputProps,
            }}
            selected={
              state.vehicle_information.capacity.passenger_seats.form
                .available_seat.selected
            }
            items={Array.from({ length: 6 }, (_, i) => String(i + 1)).map(
              (item) => {
                return { id: item, name: item };
              }
            )}
            onSelect={handleSelectAvailableSeat}
          />
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[0.75rem]",
              "w-full"
            )}
          >
            <Dropdownfield
              labelProps={{
                ...dictionaries.vehicle_information.capacity.passenger_seats
                  .form.input.available_car_seat.labelProps,
              }}
              inputProps={{
                ...dictionaries.vehicle_information.capacity.passenger_seats
                  .form.input.available_car_seat.inputProps,
              }}
              selected={
                state.vehicle_information.capacity.passenger_seats.form
                  .available_car_seat.selected
              }
              items={Array.from({ length: 5 }, (_, i) => String(i)).map(
                (item) => {
                  return { id: item, name: item };
                }
              )}
              onSelect={handleSelectAvailableCarSeat}
            />
          </div>
        </div>
      </div>

      {/* NOTES:luggage */}
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
          "w-full"
        )}
      >
        <p className={clsx("text-[0.875rem] text-[#232323CC] font-medium")}>
          {dictionaries.vehicle_information.capacity.luggage.title}
        </p>

        <div
          className={clsx(
            "grid grid-cols-1 lg:grid-cols-2 place-content-start place-items-start gap-[0.75rem]",
            "w-full"
          )}
        >
          <Dropdownfield
            labelProps={{
              ...dictionaries.vehicle_information.capacity.luggage.form.input
                .luggage.labelProps,
            }}
            inputProps={{
              ...dictionaries.vehicle_information.capacity.luggage.form.input
                .luggage.inputProps,
            }}
            selected={
              state.vehicle_information.capacity.luggage.form.luggage.selected
            }
            items={Array.from({ length: 5 }, (_, i) => String(i)).map(
              (item) => {
                return { id: item, name: item };
              }
            )}
            onSelect={handleSelectLuggage}
          />

          <Dropdownfield
            labelProps={{
              ...dictionaries.vehicle_information.capacity.luggage.form.input
                .luggage_size.labelProps,
            }}
            inputProps={{
              ...dictionaries.vehicle_information.capacity.luggage.form.input
                .luggage_size.inputProps,
            }}
            disabled={
              state.vehicle_information.capacity.luggage.form.luggage.selected
                ?.id === "0"
            }
            selected={
              state.vehicle_information.capacity.luggage.form.luggage_size
                .selected
            }
            items={globalDictionaries.vehicle.luggage.type.options}
            onSelect={handleSelectLuggageSize}
          />
        </div>
      </div>

      {/*  */}
    </div>
  );
};

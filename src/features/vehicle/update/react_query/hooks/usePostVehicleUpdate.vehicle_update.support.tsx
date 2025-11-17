import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { VehicleUpdateSupportReactQueryKey } from "../keys";
import {
  PostVehicleUpdateBodyRequestInterface,
  PostVehicleUpdateErrorResponseInterface,
  PostVehicleUpdatePayloadRequestInterface,
  PostVehicleUpdateSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/vehicle";
import { VehicleUpdateSupportContext } from "../../context";
import { fetchPostVehicleUpdate } from "@/core/services/rest/simplyhop/vehicle";
import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import { useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export const usePostVehicleUpdate = () => {
  const { state } = React.useContext(VehicleUpdateSupportContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const { id } = useParams();

  const mutation = useMutation<
    PostVehicleUpdateSuccessResponseInterface,
    PostVehicleUpdateErrorResponseInterface
  >({
    mutationKey: VehicleUpdateSupportReactQueryKey.PostVehicleUpdate(),
    mutationFn: () => {
      const bodyPayload: PostVehicleUpdateBodyRequestInterface = {
        _method: "PUT",
        category_id: !state.vehicle_information.general.form.car_category
          .selected
          ? 0
          : Number(
              state.vehicle_information.general.form.car_category.selected.id
            ), //sedan, suv
        brand_id: !state.vehicle_information.general.form.car_brand.selected
          ? 0
          : Number(
              state.vehicle_information.general.form.car_brand.selected.id
            ), // toyota
        model: state.vehicle_information.general.form.car_model.value, // mazda, agya
        color: state.vehicle_information.general.form.car_color.value,
        plate_license:
          state.vehicle_information.general.form.license_plate.value,
        numb_free_seats: !state.vehicle_information.capacity.passenger_seats
          .form.available_seat.selected
          ? 0
          : Number(
              state.vehicle_information.capacity.passenger_seats.form
                .available_seat.selected.id
            ),
        smoke_allowed: !state.vehicle_information.trip.form.smoking.selected
          ? false
          : state.vehicle_information.trip.form.smoking.selected.id === "true",
        pet_allowed: !state.vehicle_information.trip.form.pet.selected
          ? false
          : state.vehicle_information.trip.form.pet.selected.id === "true",
        music_availability: !state.vehicle_information.trip.form.music.selected
          ? false
          : state.vehicle_information.trip.form.music.selected.id === "true",
        numb_of_childseats: !state.vehicle_information.capacity.passenger_seats
          .form.available_car_seat.selected?.id
          ? 0
          : Number(
              state.vehicle_information.capacity.passenger_seats.form
                .available_car_seat.selected.id
            ),
        numb_of_luggages: !state.vehicle_information.capacity.luggage.form
          .luggage.selected?.id
          ? 0
          : Number(
              state.vehicle_information.capacity.luggage.form.luggage.selected
                ?.id
            ),
        size_of_luggages:
          state.vehicle_information.capacity.luggage.form.luggage_size.selected
            ?.id ?? "",
        "image[]": state.vehicle_information.pictures.files.filter(
          (item) => item instanceof File
        ),
      };
      const formData = new FormData();

      const cleanedObj = Object.fromEntries(
        Object.entries(bodyPayload).filter(([, value]) => value !== undefined)
      );

      for (const key of Object.keys(cleanedObj)) {
        if (key === "image[]" && Array.isArray(cleanedObj[key])) {
          cleanedObj[key].forEach((file: File) => {
            formData.append(key, file);
          });
        } else {
          formData.append(
            key,

            String((cleanedObj as { [key: string]: string })[key])
          );
        }
      }

      const payload: PostVehicleUpdatePayloadRequestInterface = {
        path: {
          id: String(id),
        },
        body: formData,
      };

      return fetchPostVehicleUpdate(payload);
    },
    onError(error) {
      dispatchGlobal({
        type: GlobalActionEnum.SetAlertData,
        payload: {
          ...globalState.alert,
          items: [
            ...globalState.alert.items,
            {
              id: uuidv4(),
              variant: "error",
              message: error.message,
            },
          ],
        },
      });
    },
  });
  return mutation;
};

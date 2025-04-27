import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { VehicleUpdateSupportReactQueryKey } from "../keys";

import {
  VehicleUpdateSupportContext,
  VehicleUpdateSupportActionEnum,
} from "../../context";

import {
  GetVehicleIdErrorResponseInterface,
  GetVehicleIdPayloadRequestInterface,
  GetVehicleIdSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/vehicle";
import { fetchGetVehicleId } from "@/core/services/rest/simplyhop/vehicle";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { useParams } from "next/navigation";

export const useGetVehicleId = () => {
  const globalDictionaries = getGlobalDictionaries();
  const { state, dispatch } = React.useContext(VehicleUpdateSupportContext);
  const params = useParams<{ id: string }>();
  const payload: GetVehicleIdPayloadRequestInterface = {
    path: {
      id: Number(String(params.id)),
    },
    params: {
      include: "brand",
    },
  };
  const query = useQuery<
    GetVehicleIdSuccessResponseInterface,
    GetVehicleIdErrorResponseInterface
  >({
    queryKey: VehicleUpdateSupportReactQueryKey.GetVehicleId(),
    queryFn: () => {
      return fetchGetVehicleId(payload);
    },
    enabled:
      !!params.id &&
      !!state.vehicle_information.general.form.car_brand.items.length &&
      !!state.vehicle_information.general.form.car_category.items.length,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: VehicleUpdateSupportActionEnum.SetVehicleInformationData,
        payload: {
          ...state.vehicle_information,
          general: {
            ...state.vehicle_information.general,
            form: {
              ...state.vehicle_information.general.form,
              car_brand: {
                ...state.vehicle_information.general.form.car_brand,
                selected: !data.data.brand
                  ? null
                  : state.vehicle_information.general.form.car_brand.items.find(
                      (carBrandItem) =>
                        carBrandItem.id === String(data.data.brand?.id)
                    ) ?? null,
                // items: [],
                // error: null,
              },
              car_category: {
                ...state.vehicle_information.general.form.car_category,
                selected: !data.data.category
                  ? null
                  : state.vehicle_information.general.form.car_category.items.find(
                      (carCategoryItem) =>
                        carCategoryItem.id === String(data.data.category?.id)
                    ) ?? null,
                // items: [],
                // error: null,
              },
              car_model: {
                ...state.vehicle_information.general.form.car_model,
                value: data.data?.model ?? "",
                // error: null,
              },
              car_color: {
                ...state.vehicle_information.general.form.car_color,
                value: data.data?.color ?? "",
                // error: null,
              },
              license_plate: {
                ...state.vehicle_information.general.form.license_plate,
                value: data.data?.plate_license ?? "",
                // error: null,
              },
            },
          },
          pictures: {
            ...state.vehicle_information.pictures,
            // files: [],
          },
          capacity: {
            ...state.vehicle_information.capacity,
            passenger_seats: {
              ...state.vehicle_information.capacity.passenger_seats,
              form: {
                ...state.vehicle_information.capacity.passenger_seats.form,
                available_seat: {
                  ...state.vehicle_information.capacity.passenger_seats.form
                    .available_seat,
                  selected: !data.data.numb_free_seats
                    ? null
                    : {
                        id: String(data.data.numb_free_seats),
                        name: String(data.data.numb_free_seats),
                      },
                  // selected: null,
                  // items: [],
                },
                available_child_seat: {
                  ...state.vehicle_information.capacity.passenger_seats.form
                    .available_child_seat,
                  selected:
                    globalDictionaries.vehicle.seat.child.options.find(
                      (item) =>
                        item.id === String(data.data.childseat_availability)
                    ) ?? null,
                  // selected: null,
                  // items: [],
                },
                available_car_seat: {
                  ...state.vehicle_information.capacity.passenger_seats.form
                    .available_car_seat,
                  selected: !data.data.numb_of_childseats
                    ? null
                    : {
                        id: String(data.data.numb_of_childseats),
                        name: String(data.data.numb_of_childseats),
                      },
                  // selected: null,
                  // items: [],
                },
              },
            },
            luggage: {
              ...state.vehicle_information.capacity.luggage,
              form: {
                ...state.vehicle_information.capacity.luggage.form,
                luggage: {
                  ...state.vehicle_information.capacity.luggage.form.luggage,
                  selected: !data.data.numb_of_luggages
                    ? null
                    : {
                        id: String(data.data.numb_of_luggages),
                        name: String(data.data.numb_of_luggages),
                      },
                  // selected: null,
                  // items: [],
                },
                luggage_size: {
                  ...state.vehicle_information.capacity.luggage.form
                    .luggage_size,
                  selected:
                    globalDictionaries.vehicle.luggage.type.options.find(
                      (item) => item.id === String(data.data.size_of_luggages)
                    ) ?? null,
                  // selected: null,
                  // items: [],
                },
              },
            },
          },
          trip: {
            ...state.vehicle_information.trip,
            form: {
              ...state.vehicle_information.trip.form,
              smoking: {
                ...state.vehicle_information.trip.form.smoking,
                selected:
                  globalDictionaries.vehicle.smoking.type.options.items.find(
                    (item) => item.id === String(data.data.smoke_allowed)
                  ) ?? null,
                // selected: null,
                // items: [],
              },
              music: {
                ...state.vehicle_information.trip.form.music,
                selected:
                  globalDictionaries.vehicle.music.type.options.items.find(
                    (item) => item.id === String(data.data.music_availability)
                  ) ?? null,
                // selected: null,
                // items: [],
              },
              pet: {
                ...state.vehicle_information.trip.form.pet,
                selected:
                  globalDictionaries.vehicle.pets.type.options.items.find(
                    (item) => item.id === String(data.data.pet_allowed)
                  ) ?? null,
                // selected: null,
                // items: [],
              },
            },
          },
        },
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { DetailDriverReactQueryKey } from "../keys";

import { DetailDriverContext, DetailDriverActionEnum } from "../../context";

import {
  GetVehicleListErrorResponseInterface,
  GetVehicleListPayloadRequestInterface,
  GetVehicleListSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/vehicle";
import { fetchGetVehicleList } from "@/core/services/rest/simplyhop/vehicle";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { SVGIconProps } from "@/core/icons";
import { useParams } from "next/navigation";

export const useGetVehicleList = () => {
  const globalDictionaries = getGlobalDictionaries();
  const { state, dispatch } = React.useContext(DetailDriverContext);
  const { id } = useParams();
  const payload: GetVehicleListPayloadRequestInterface = {
    params: {
      include: "brand",
      "filter[user_id]": String(id ?? "0"),
    },
  };
  const query = useQuery<
    GetVehicleListSuccessResponseInterface,
    GetVehicleListErrorResponseInterface
  >({
    queryKey: DetailDriverReactQueryKey.GetVehicleList(payload),
    queryFn: () => {
      return fetchGetVehicleList(payload);
    },
    enabled: !!id,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: DetailDriverActionEnum.SetVehicleDataData,
        payload: data.data.map((item) => {
          return {
            id: String(item.id),
            car: {
              image: {
                src: !item.image.length
                  ? "/images/general/car.png"
                  : item.image[0] ?? "/images/general/car.png",
                alt: "car",
                width: 145,
                height: 46,
              },
              identity: {
                name: !item.brand?.title
                  ? item.model ?? ""
                  : !item.model
                  ? item.brand?.title ?? ""
                  : `${item.brand?.title} ${item.model}`,
                number: item.plate_license,
              },
              facility: {
                top: [
                  ...(!!item.numb_free_seats
                    ? [
                        {
                          ...globalDictionaries.vehicle.seat.available,
                          icon: {
                            ...globalDictionaries.vehicle.seat.available.icon,
                            name: globalDictionaries.vehicle.seat.available.icon
                              .name as SVGIconProps["name"],
                          },
                          name: {
                            ...globalDictionaries.vehicle.seat.available.name,
                            label:
                              globalDictionaries.vehicle.seat.available.name.label.replaceAll(
                                "{{number}}",
                                item.numb_free_seats.toLocaleString("de-DE")
                              ),
                          },
                        },
                      ]
                    : [
                        {
                          ...globalDictionaries.vehicle.seat.empty,
                          icon: {
                            ...globalDictionaries.vehicle.seat.empty.icon,
                            name: globalDictionaries.vehicle.seat.empty.icon
                              .name as SVGIconProps["name"],
                          },
                        },
                      ]),
                  ...(!!item.numb_of_luggages
                    ? [
                        {
                          ...globalDictionaries.vehicle.luggage.available,
                          icon: {
                            ...globalDictionaries.vehicle.luggage.available
                              .icon,
                            name: globalDictionaries.vehicle.luggage.available
                              .icon.name as SVGIconProps["name"],
                          },
                          name: {
                            ...globalDictionaries.vehicle.luggage.available
                              .name,
                            label:
                              globalDictionaries.vehicle.luggage.available.name
                                .label,
                          },
                        },
                      ]
                    : [
                        {
                          ...globalDictionaries.vehicle.luggage.empty,
                          icon: {
                            ...globalDictionaries.vehicle.luggage.empty.icon,
                            name: globalDictionaries.vehicle.luggage.empty.icon
                              .name as SVGIconProps["name"],
                          },
                        },
                      ]),
                ],
                bottom: [
                  // Smoking
                  ...(!!item.smoke_allowed
                    ? [
                        {
                          ...globalDictionaries.vehicle.smoking.allowed,
                          icon: {
                            ...globalDictionaries.vehicle.smoking.allowed.icon,
                            name: globalDictionaries.vehicle.smoking.allowed
                              .icon.name as SVGIconProps["name"],
                          },
                        },
                      ]
                    : [
                        {
                          ...globalDictionaries.vehicle.smoking.prohibited,
                          icon: {
                            ...globalDictionaries.vehicle.smoking.prohibited
                              .icon,
                            name: globalDictionaries.vehicle.smoking.prohibited
                              .icon.name as SVGIconProps["name"],
                          },
                        },
                      ]),

                  // Music
                  ...(!!item.music_availability
                    ? [
                        {
                          ...globalDictionaries.vehicle.music.allowed,
                          icon: {
                            ...globalDictionaries.vehicle.music.allowed.icon,
                            name: globalDictionaries.vehicle.music.allowed.icon
                              .name as SVGIconProps["name"],
                          },
                        },
                      ]
                    : [
                        {
                          ...globalDictionaries.vehicle.music.prohibited,
                          icon: {
                            ...globalDictionaries.vehicle.music.prohibited.icon,
                            name: globalDictionaries.vehicle.music.prohibited
                              .icon.name as SVGIconProps["name"],
                          },
                        },
                      ]),

                  // Pet
                  ...(!!item.pet_allowed
                    ? [
                        {
                          ...globalDictionaries.vehicle.pets.allowed,
                          icon: {
                            ...globalDictionaries.vehicle.pets.allowed.icon,
                            name: globalDictionaries.vehicle.pets.allowed.icon
                              .name as SVGIconProps["name"],
                          },
                        },
                      ]
                    : [
                        {
                          ...globalDictionaries.vehicle.pets.prohibited,
                          icon: {
                            ...globalDictionaries.vehicle.pets.prohibited.icon,
                            name: globalDictionaries.vehicle.pets.prohibited
                              .icon.name as SVGIconProps["name"],
                          },
                        },
                      ]),
                ],
              },
            },
          };
        }),
      });
    }
  }, [query.data, query.isFetching]);

  React.useEffect(() => {
    dispatch({
      type: DetailDriverActionEnum.SetVehicleLoadingData,
      payload: {
        ...state.vehicle.loading,
        is_fetching: query.isFetching,
      },
    });
  }, [query.isFetching]);
  return query;
};

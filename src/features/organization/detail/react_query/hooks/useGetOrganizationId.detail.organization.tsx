import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  DetailOrganizationContext,
  DetailOrganizationActionEnum,
} from "../../context";

import { fetchGetOrganizationId } from "@/core/services/rest/simplyhop/organization";
import {
  GetOrganizationIdErrorResponseInterface,
  GetOrganizationIdPayloadRequestInterface,
  GetOrganizationIdSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/organization";
import { UserContext } from "@/core/modules/app/context";
import { DetailOrganizationReactQueryKey } from "../keys";
import { useParams } from "next/navigation";

export const useGetOrganizationId = () => {
  const { state, dispatch } = React.useContext(DetailOrganizationContext);
  const { state: userState } = React.useContext(UserContext);
  const { organization_id } = useParams();
  const payload: GetOrganizationIdPayloadRequestInterface = {
    path: {
      id: String(organization_id),
    },
    params: {
      include: "addresses",
    },
  };
  const query = useQuery<
    GetOrganizationIdSuccessResponseInterface,
    GetOrganizationIdErrorResponseInterface
  >({
    queryKey: DetailOrganizationReactQueryKey.GetOrganizationId(payload),
    queryFn: () => {
      return fetchGetOrganizationId(payload);
    },
    enabled: !!userState.profile?.is_super_admin && !!organization_id,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data.data;
      dispatch({
        type: DetailOrganizationActionEnum.SetCompanyDataData,
        payload: {
          ...state.company_data,
          form: {
            ...state.company_data.form,
            domain: {
              ...state.company_data.form.domain,
              value: data.domain ?? "",
            },
            company_code: {
              ...state.company_data.form.company_code,
              value: data.organization_code ?? "",
            },
            admin_email: {
              ...state.company_data.form.admin_email,
              value: data.email ?? "",
            },
            company_name: {
              ...state.company_data.form.company_name,
              value: data.name ?? "",
            },
            telephone: {
              ...state.company_data.form.telephone,
              value: data.phone ?? "",
            },
            responsible_person: {
              ...state.company_data.form.responsible_person,
              first_name: {
                ...state.company_data.form.responsible_person.first_name,
                value: data.responsible_person_first_name ?? "",
              },
              last_name: {
                ...state.company_data.form.responsible_person.last_name,
                value: data.responsible_person_last_name ?? "",
              },
            },
            address: {
              ...state.company_data.form.address,
              address_1: {
                ...state.company_data.form.address.address_1,
                value: data.address ?? "",
              },
              address_2: {
                ...state.company_data.form.address.address_2,
                value: data.address_line_2 ?? "",
              },
              zip_code: {
                ...state.company_data.form.address.zip_code,
                value: data.postal_code ?? "",
              },
              city: {
                ...state.company_data.form.address.city,
                value: data.city ?? "",
              },
            },
          },
        },
      });

      dispatch({
        type: DetailOrganizationActionEnum.SetCompanyOfficeData,

        payload: {
          ...state.company_office,
          form: !data.addresses?.length
            ? [
                {
                  address_name: {
                    value: "",
                    error: null,
                  },
                  address_1: {
                    value: "",
                    error: null,
                  },
                  address_2: {
                    value: "",
                    error: null,
                  },
                  zip_code: {
                    value: "",
                    error: null,
                  },
                  city: {
                    value: "",
                    error: null,
                  },
                  pin_point: {
                    value: null,
                  },
                  mode: "initial",
                },
              ]
            : data.addresses?.map((item) => {
                return {
                  address_name: {
                    value: item.name ?? "",
                    error: null,
                  },
                  address_1: {
                    value: item.address ?? "",
                    error: null,
                  },
                  address_2: {
                    value: item.address_line_2 ?? "",
                    error: null,
                  },
                  zip_code: {
                    value: item.postal_code ?? "",
                    error: null,
                  },
                  city: {
                    value: item.city ?? "",
                    error: null,
                  },
                  pin_point: {
                    value: {
                      lat: item.latitude ?? 0,
                      lng: item.longitude ?? 0,
                      location_1: item.location ?? "",
                      location_2: item.location_2 ?? "",
                    },
                  },
                  mode: "view",
                  id: item.id,
                };
              }) ?? [],
        },
      });
    }
  }, [query.data, query.isFetching]);

  // React.useEffect(() => {
  //   dispatch({
  //     type: DetailOrganizationActionEnum.SetDriverLoadingData,
  //     payload: {
  //       ...state.driver.loading,
  //       is_fetching: query.isFetching,
  //     },
  //   });
  // }, [query.isFetching]);

  return query;
};

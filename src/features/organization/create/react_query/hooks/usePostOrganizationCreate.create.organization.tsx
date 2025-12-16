import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { CreateOrganizationReactQueryKey } from "../keys";
import {
  PostOrganizationCreateBodyPayloadRequestInterface,
  PostOrganizationCreateErrorResponseInterface,
  PostOrganizationCreatePayloadRequestInterface,
  PostOrganizationCreateSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/organization";
import { CreateOrganizationContext } from "../../context";
import { fetchPostOrganizationCreate } from "@/core/services/rest/simplyhop/organization";
import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import { v4 as uuidv4 } from "uuid";

export const usePostOrganizationCreate = () => {
  const { state } = React.useContext(CreateOrganizationContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    PostOrganizationCreateSuccessResponseInterface,
    PostOrganizationCreateErrorResponseInterface
  >({
    mutationKey: CreateOrganizationReactQueryKey.PostOrganizationCreate(),
    mutationFn: () => {
      const bodyPayload: PostOrganizationCreateBodyPayloadRequestInterface = {
        organization_code:
          state.company_data.form.company_type.selected?.id === "company_code"
            ? state.company_data.form.company_code.value
            : undefined,
        domain:
          state.company_data.form.company_type.selected?.id === "domain"
            ? state.company_data.form.domain.value
            : undefined,
        name: state.company_data.form.company_name.value,
        responsible_person_first_name:
          state.company_data.form.responsible_person.first_name.value,
        responsible_person_last_name:
          state.company_data.form.responsible_person.last_name.value,
        email: state.company_data.form.admin_email.value,
        phone: state.company_data.form.telephone.value,
        address: state.company_data.form.address.address_1.value,
        address_line_2: !state.company_data.form.address.address_2.value.length
          ? undefined
          : state.company_data.form.address.address_2.value,
        city: state.company_data.form.address.city.value,
        postal_code: state.company_data.form.address.zip_code.value,
        logo: state.company_data.form.pictures.files.filter(
          (item) => item instanceof File
        )[0],
        addresses: state.company_office.form.map((item) => {
          return {
            postal_code: item.zip_code.value,
            location_2: !item.pin_point.value?.location_2.length
              ? undefined
              : item.pin_point.value?.location_2,
            city: item.city.value,
            latitude: item.pin_point.value?.lat ?? 0,
            longitude: item.pin_point.value?.lng ?? 0,
            address_line_2: !item.address_2.value.length
              ? undefined
              : item.address_2.value,
            address: item.address_1.value,
            location: item.pin_point.value?.location_1 ?? "",
          };
        }),
      };

      const formData = new FormData();

      const cleanedObj = Object.fromEntries(
        Object.entries(bodyPayload).filter(([, value]) => value !== undefined)
      );

      for (const [key, value] of Object.entries(cleanedObj)) {
        if (value instanceof File) {
          // Handle File objects (logo)
          formData.append(key, value);
        } else if (Array.isArray(value)) {
          // Handle array - either as JSON string or indexed keys
          formData.append(key, JSON.stringify(value));
        } else if (typeof value === "object" && value !== null) {
          // Handle nested objects
          formData.append(key, JSON.stringify(value));
        } else {
          // Handle primitive values
          formData.append(key, String(value));
        }
      }

      const payload: PostOrganizationCreatePayloadRequestInterface = {
        body: formData,
      };
      return fetchPostOrganizationCreate(payload);
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

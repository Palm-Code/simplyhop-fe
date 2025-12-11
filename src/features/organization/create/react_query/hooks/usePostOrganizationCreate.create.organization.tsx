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
        addresses: state.company_office.form.map((item) => {
          return {
            postal_code: item.zip_code.value,
            location_2: "Location 2",
            city: item.city.value,
            latitude: 52.520008,
            longitude: 13.404954,
            address_line_2: !item.address_2.value.length
              ? undefined
              : item.address_2.value,
            address: item.address_1.value,
            location: "Berlin Mitte",
          };
        }),
      };

      const formData = new FormData();

      const cleanedObj = Object.fromEntries(
        Object.entries(bodyPayload).filter(([, value]) => value !== undefined)
      );

      for (const key of Object.keys(cleanedObj)) {
        formData.append(
          key,
          String((cleanedObj as { [key: string]: string })[key])
        );
      }
      const payload: PostOrganizationCreatePayloadRequestInterface = {
        body: formData,
      };
      return fetchPostOrganizationCreate(payload);
    },
    onSuccess() {},
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

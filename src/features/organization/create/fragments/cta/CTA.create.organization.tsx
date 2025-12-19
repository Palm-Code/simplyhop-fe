import { Button } from "@/core/components/button";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import {
  CreateOrganizationActionEnum,
  CreateOrganizationContext,
} from "../../context";

import { MoonLoader } from "@/core/components/moon_loader";
import { usePostOrganizationCreate } from "../../react_query/hooks";

export const CTACreateOrganization = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(CreateOrganizationContext);

  const {
    mutateAsync: postOrganizationCreate,
    isPending: isPendingPostOrganizationCreate,
  } = usePostOrganizationCreate();

  const handleClickSave = async () => {
    const res = await postOrganizationCreate();
    if (!res) return;
    dispatch({
      type: CreateOrganizationActionEnum.SetNotificationData,
      payload: {
        ...state.notification,
        is_open: true,
      },
    });
  };

  const isCompanyDataValid =
    !state.company_data.form.admin_email.error &&
    !!state.company_data.form.admin_email.value.length &&
    !state.company_data.form.telephone.error &&
    !!state.company_data.form.telephone.value.length &&
    !state.company_data.form.responsible_person.first_name.error &&
    !!state.company_data.form.responsible_person.first_name.value.length &&
    !state.company_data.form.responsible_person.last_name.error &&
    !!state.company_data.form.responsible_person.last_name.value.length &&
    !state.company_data.form.company_name.error &&
    !!state.company_data.form.company_name.value.length &&
    !!state.company_data.form.company_type.selected &&
    state.company_data.form.company_type.selected.id === "domain"
      ? !!state.company_data.form.domain.value.length &&
        !state.company_data.form.domain.error
      : !!state.company_data.form.company_code.value.length;
  const completedCompanyOffice = state.company_office.form.filter(
    (item) => item.mode === "view"
  );
  const isCompanyOfficeValid =
    !!completedCompanyOffice.length &&
    completedCompanyOffice.reduce((acc, item) => {
      return (
        acc &&
        !!item.address_name.value.length &&
        !item.address_name.error &&
        !!item.address_1.value.length &&
        !item.address_1.error &&
        !!item.zip_code.value.length &&
        !item.zip_code.error &&
        !!item.city.value.length &&
        !item.city.error &&
        !!item.pin_point
      );
    }, true);
  const isSaveDisabled =
    !isCompanyDataValid ||
    !isCompanyOfficeValid ||
    isPendingPostOrganizationCreate;
  const isSaveLoading = isPendingPostOrganizationCreate;

  return (
    <Button
      aria-label={dictionaries.cta.save.children}
      name={dictionaries.cta.save.children}
      disabled={isSaveDisabled}
      isLoading={isSaveLoading}
      className={clsx("py-3")}
      onClick={handleClickSave}
    >
      {isSaveLoading && <MoonLoader size={20} color={"white"} />}
      {dictionaries.cta.save.children}
    </Button>
  );
};

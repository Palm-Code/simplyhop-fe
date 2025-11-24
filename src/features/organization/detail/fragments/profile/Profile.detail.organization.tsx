"use client";
import * as React from "react";
import {
  DetailOrganizationActionEnum,
  DetailOrganizationContext,
} from "../../context";
import { getDictionaries } from "../../i18n";
import { formatDisplayName } from "@/core/utils/name/functions";
import { OrganizationInformationCard } from "@/core/components/organization_information_card";

export const ProfileDetailOrganization = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(DetailOrganizationContext);
  const summaryItems = dictionaries.profile.summary.items.map((item) => {
    let value = "-";
    switch (item.id) {
      case "fahrten": {
        value =
          state.profile.data?.total_rides_completed?.toLocaleString("de-DE") ??
          "-";
        break;
      }
      case "ratings": {
        value =
          state.profile.data?.average_rating?.toLocaleString("de-DE") ?? "-";
        break;
      }
      default: {
        break;
      }
    }
    return {
      ...item,
      value: value,
    };
  });

  const detailItems = dictionaries.profile.detail.items.map((item) => {
    let value = "-";
    switch (item.id) {
      case "email": {
        value = state.profile.data?.organization.email ?? "-";
        break;
      }
      case "city": {
        value = "-";
        break;
      }
      case "phone": {
        value = state.profile.data?.organization.phone ?? "-";
        break;
      }
      default: {
        break;
      }
    }
    return {
      label: item.name,
      value: value,
    };
  });

  const handleClickEditOrganization = () => {
    dispatch({
      type: DetailOrganizationActionEnum.SetEditData,
      payload: {
        ...state.edit,
        is_open: true,
        form: {
          ...state.edit.form,
          email: {
            ...state.edit.form.email,
            value: state.profile.data?.organization.email ?? "",
          },
          name: {
            ...state.edit.form.name,
            value: state.profile.data?.organization.name ?? "",
          },
          phonenumber: {
            ...state.edit.form.phonenumber,
            value: state.profile.data?.organization.phone ?? "",
          },
          city: {
            ...state.edit.form.city,
            value: state.profile.data?.organization.city ?? "",
          },
          responsible_person_name: {
            ...state.edit.form.responsible_person_name,
            value:
              state.profile.data?.organization.responsible_person_name ?? "",
          },
        },
      },
    });
  };
  return (
    <OrganizationInformationCard
      summary={summaryItems}
      header={{
        avatar: {
          src: state.profile.data?.organization.logo,
        },
        displayName: formatDisplayName({
          first_name: state.profile.data?.organization.name,
          email: state.profile.data?.organization.email,
        }),
        cta: {
          text: dictionaries.profile.cta.edit.children,
          onClick: handleClickEditOrganization,
        },
      }}
      detail={detailItems}
    />
  );
};

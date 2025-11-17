"use client";
import * as React from "react";
import { DetailOrganizationContext } from "../../context";
import { getDictionaries } from "../../i18n";
import { formatDisplayName } from "@/core/utils/name/functions";
import { OrganizationInformationCard } from "@/core/components/organization_information_card";

export const ProfileDetailOrganization = () => {
  const dictionaries = getDictionaries();
  const { state } = React.useContext(DetailOrganizationContext);
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

  const handleClickEditOrganization = () => {};
  return (
    <OrganizationInformationCard
      summary={summaryItems}
      header={{
        avatar: {
          src: "",
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

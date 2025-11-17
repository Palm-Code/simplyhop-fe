'use client'
import * as React from "react";
import { DetailDriverContext } from "../../context";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { UserInformationCard } from "@/core/components/user_information_card";
import { formatDisplayName } from "@/core/utils/name/functions";
import { AppCollectionURL } from "@/core/utils/router/constants";

export const UserDetailDriver = () => {
  const globalDictionaries = getGlobalDictionaries();
  const dictionaries = getDictionaries();
  const { state } = React.useContext(DetailDriverContext);
  const summaryItems = !state.user.data?.is_driver
    ? []
    : dictionaries.user.summary.items.map((item) => {
        let value = "-";
        switch (item.id) {
          case "trips": {
            value =
              state.user.data?.total_trips?.toLocaleString("de-DE") ?? "-";
            break;
          }
          case "ratings": {
            value =
              state.user.data?.average_ride_rating?.toLocaleString("de-DE") ??
              "-";
            break;
          }
          case "passengers": {
            value =
              state.user.data?.total_passengers_count?.toLocaleString(
                "de-DE"
              ) ?? "-";
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
  return (
    <UserInformationCard
      summary={summaryItems}
      header={{
        avatar: {
          src: state.user.data?.avatar || undefined,
        },
        displayName: formatDisplayName({
          first_name: state.user.data?.first_name,
          email: state.user.data?.email,
        }),
        cta: {
          text: dictionaries.user.information.cta.edit.children,
          href: AppCollectionURL.private.support_account_edit(),
        },
      }}
      detail={{
        email: {
          label: dictionaries.user.information.email.name,
          value: !state.user.data?.email.length ? "-" : state.user.data.email,
        },
        firstName: {
          label: dictionaries.user.information.first_name.name,
          value: !state.user.data?.first_name.length
            ? "-"
            : state.user.data.first_name,
        },
        lastName: {
          label: dictionaries.user.information.last_name.name,
          value: !state.user.data?.last_name.length
            ? "-"
            : state.user.data.last_name,
        },
        gender: {
          label: dictionaries.user.information.gender.name,
          value: !state.user.data?.gender?.length
            ? "-"
            : globalDictionaries.personal_information.gender.options.items.find(
                (item) => item.id === state.user.data?.gender
              )?.name ?? "-",
        },
        city: {
          label: dictionaries.user.information.city.name,
          value: !state.user.data?.city?.length ? "-" : state.user.data.city,
        },
        phoneNumber: {
          label: dictionaries.user.information.phonenumber.name,
          value: !state.user.data?.mobile?.length
            ? "-"
            : state.user.data.mobile,
        },
        aboutMe: {
          label: dictionaries.user.information.about_me.name,
          value: !state.user.data?.profile?.bio.length
            ? "-"
            : state.user.data.profile.bio,
        },
      }}
    />
  );
};

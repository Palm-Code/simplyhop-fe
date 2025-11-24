"use client";
import * as React from "react";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import { UserContext } from "@/core/modules/app/context";
import { formatDisplayName } from "@/core/utils/name/functions";
import { UserInformationCard } from "@/core/components/user_information_card";
import { useRouter } from "next/navigation";

export const InformationAccountSupport = () => {
  const router = useRouter();
  const globalDictionaries = getGlobalDictionaries();
  const dictionaries = getDictionaries();

  const { state: userState } = React.useContext(UserContext);
  const summaryItems = !userState.profile?.is_driver
    ? []
    : dictionaries.summary.items.map((item) => {
        let value = "-";
        switch (item.id) {
          case "trips": {
            value =
              userState.profile?.total_trips?.toLocaleString("de-DE") ?? "-";
            break;
          }
          case "ratings": {
            value =
              userState.profile?.average_ride_rating?.toLocaleString("de-DE") ??
              "-";
            break;
          }
          case "passengers": {
            value =
              userState.profile?.total_passengers_count?.toLocaleString(
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
          src: userState.profile?.avatar || undefined,
        },
        displayName: formatDisplayName({
          first_name: userState.profile?.first_name,
          email: userState.profile?.email,
        }),
        cta: {
          text: dictionaries.information.cta.edit.children,
          onClick: () =>
            router.push(AppCollectionURL.private.support_account_edit()),
        },
      }}
      detail={{
        email: {
          label: dictionaries.information.email.name,
          value: !userState.profile?.email.length
            ? "-"
            : userState.profile.email,
        },
        firstName: {
          label: dictionaries.information.first_name.name,
          value: !userState.profile?.first_name.length
            ? "-"
            : userState.profile.first_name,
        },
        lastName: {
          label: dictionaries.information.last_name.name,
          value: !userState.profile?.last_name.length
            ? "-"
            : userState.profile.last_name,
        },
        gender: {
          label: dictionaries.information.gender.name,
          value: !userState.profile?.gender?.length
            ? "-"
            : globalDictionaries.personal_information.gender.options.items.find(
                (item) => item.id === userState.profile?.gender
              )?.name ?? "-",
        },
        city: {
          label: dictionaries.information.city.name,
          value: !userState.profile?.city.length ? "-" : userState.profile.city,
        },
        phoneNumber: {
          label: dictionaries.information.phonenumber.name,
          value: !userState.profile?.phonenumber.length
            ? "-"
            : userState.profile.phonenumber,
        },
        aboutMe: {
          label: dictionaries.information.about_me.name,
          value: !userState.profile?.about_me.length
            ? "-"
            : userState.profile.about_me,
        },
      }}
    />
  );
};

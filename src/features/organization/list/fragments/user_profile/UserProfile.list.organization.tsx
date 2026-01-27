"use client";
import * as React from "react";
import {
  ListOrganizationActionEnum,
  ListOrganizationContext,
} from "../../context";
import { getDictionaries } from "../../i18n";
import { formatDisplayName } from "@/core/utils/name/functions";
import { AppCollectionURL } from "@/core/utils/router/constants";
import { useRouter } from "next/navigation";
import { OrganizationProfileModal } from "@/core/components/organization_profile_modal";

export const UserProfileListOrganization = () => {
  const dictionaries = getDictionaries();
  const router = useRouter();
  const { state, dispatch } = React.useContext(ListOrganizationContext);
  const isOpen = state.user_profile.is_open;
  const handleClose = () => {
    dispatch({
      type: ListOrganizationActionEnum.SetUserProfileData,
      payload: {
        ...state.user_profile,
        user_id: null,
        data: null,
        is_open: false,
      },
    });
  };

  const handleClickDeleteOrganization = () => {
    dispatch({
      type: ListOrganizationActionEnum.SetDeleteAccountConfirmationData,
      payload: {
        ...state.delete_account_confirmation,
        is_open: true,
      },
    });
  };

  const summaryItems = dictionaries.user_profile.summary.items.map((item) => {
    let value = "-";
    switch (item.id) {
      case "trips": {
        value =
          state.user_profile.data?.total_rides_completed?.toLocaleString(
            "de-DE",
          ) ?? "-";
        break;
      }
      case "ratings": {
        value =
          state.user_profile.data?.average_rating?.toLocaleString("de-DE") ??
          "-";
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

  const detailItems = dictionaries.user_profile.detail.items.map((item) => {
    let value = "-";

    switch (item.id) {
      case "email": {
        value = state.user_profile.data?.organization.email ?? "-";
        break;
      }
      case "city": {
        value = state.user_profile.data?.organization.city ?? "-";
        break;
      }
      case "phone": {
        value = state.user_profile.data?.organization.phone ?? "-";
        break;
      }
      case "pic": {
        value =
          !state.user_profile.data?.organization.responsible_person_first_name
            ?.length &&
          !state.user_profile.data?.organization.responsible_person_last_name
            ?.length
            ? "-"
            : formatDisplayName({
                first_name: !state.user_profile.data?.organization
                  .responsible_person_last_name
                  ? (state.user_profile.data?.organization
                      .responsible_person_first_name ?? "")
                  : `${state.user_profile.data?.organization.responsible_person_first_name} ${state.user_profile.data?.organization.responsible_person_last_name}`,
                email: state.user_profile.data?.organization.email,
              });
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

  const statisticItems = dictionaries.user_profile.statistic.items.map(
    (item) => {
      let value = "-";
      let href: undefined | string = undefined;
      switch (item.id) {
        case "fahrer": {
          value =
            state.user_profile.data?.total_driver?.toLocaleString("de-DE") ??
            "-";
          href = AppCollectionURL.private.driver();
          break;
        }
        case "fahrten": {
          value =
            state.user_profile.data?.total_rides_completed?.toLocaleString(
              "de-DE",
            ) ?? "-";
          href = AppCollectionURL.private.dashboardTrip();
          break;
        }
        case "kilometer": {
          value =
            state.user_profile.data?.total_rides_km?.toLocaleString("de-DE") ??
            "-";
          break;
        }
        case "co2": {
          value =
            state.user_profile.data?.total_rides_carbon?.toLocaleString(
              "de-DE",
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
        href: href,
      };
    },
  );

  const cta = dictionaries.user_profile.cta.items.map((item) => {
    return {
      ...item,
      onClick: handleClickDeleteOrganization,
    };
  });

  const handleClickOpen = () => {
    router.push(
      AppCollectionURL.private.organizationDetail({
        id: state.user_profile.user_id ?? "",
      }),
    );
  };

  return (
    <OrganizationProfileModal
      isOpen={isOpen}
      onClose={handleClose}
      title={dictionaries.user_profile.title}
      cta={{
        open: {
          label: dictionaries.user_profile.cta.open.label,
          onClick: handleClickOpen,
        },
      }}
      user={{
        avatar: {
          src: "",
        },
        name: formatDisplayName({
          first_name: state.user_profile.data?.organization.name,
          email: state.user_profile.data?.organization.email,
        }),
        phone: state.user_profile.data?.organization.phone ?? "-",
        summary: summaryItems,
        detail: detailItems,
        statistic: statisticItems,
        cta: cta,
      }}
    />
  );
};

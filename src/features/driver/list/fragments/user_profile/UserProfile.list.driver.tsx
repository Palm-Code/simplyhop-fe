"use client";
import * as React from "react";
import { ListDriverActionEnum, ListDriverContext } from "../../context";
import { getDictionaries } from "../../i18n";
import { UserProfileModal } from "@/core/components/user_profile_modal/UserProfileModal";
import { formatDisplayName } from "@/core/utils/name/functions";
import { AppCollectionURL } from "@/core/utils/router/constants";
import { useParams, useRouter } from "next/navigation";
import { UserContext } from "@/core/modules/app/context";

export const UserProfileListDriver = () => {
  const dictionaries = getDictionaries();
  const { organization_id } = useParams();
  const router = useRouter();
  const { state, dispatch } = React.useContext(ListDriverContext);
  const { state: userState } = React.useContext(UserContext);
  const isOpen = state.user_profile.is_open;
  const handleClose = () => {
    dispatch({
      type: ListDriverActionEnum.SetUserProfileData,
      payload: {
        ...state.user_profile,
        data: null,
        is_open: false,
      },
    });
  };

  const handleClickDeleteChat = () => {
    dispatch({
      type: ListDriverActionEnum.SetDeleteChatConfirmationData,
      payload: {
        ...state.delete_chat_confirmation,
        is_open: true,
      },
    });
  };

  const handleClickDeleteAccount = () => {
    dispatch({
      type: ListDriverActionEnum.SetDeleteAccountConfirmationData,
      payload: {
        ...state.delete_account_confirmation,
        is_open: true,
      },
    });
  };

  const handleClickBlockList = () => {
    dispatch({
      type: ListDriverActionEnum.SetBlockedUserData,
      payload: {
        ...state.blocked_user,

        user_id: state.user_profile.user_id,
        is_open: true,
      },
    });
    handleClose();
  };

  const summaryItems = !state.user_profile.data?.is_driver
    ? []
    : dictionaries.user_profile.summary.items.map((item) => {
        let value = "-";
        switch (item.id) {
          case "trips": {
            value =
              state.user_profile.data?.total_trips?.toLocaleString("de-DE") ??
              "-";
            break;
          }
          case "ratings": {
            value =
              state.user_profile.data?.average_ride_rating?.toLocaleString(
                "de-DE"
              ) ?? "-";
            break;
          }
          case "passengers": {
            value =
              state.user_profile.data?.total_passengers_count?.toLocaleString(
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

  const detailItems = dictionaries.user_profile.detail.items.map((item) => {
    let value = "-";
    switch (item.id) {
      case "email": {
        value = state.user_profile.data?.email ?? "-";
        break;
      }
      case "company_address": {
        value =
          !state.user_profile.data?.organization?.address?.length &&
          !state.user_profile.data?.organization?.address_line_2?.length
            ? "-"
            : !state.user_profile.data?.organization?.address_line_2?.length
            ? state.user_profile.data?.organization?.address ?? ""
            : !state.user_profile.data?.organization?.address?.length
            ? state.user_profile.data?.organization?.address_line_2 ?? ""
            : `${state.user_profile.data?.organization?.address} ${state.user_profile.data?.organization?.address_line_2}`;
        break;
      }
      case "gender": {
        value = state.user_profile.data?.gender ?? "-";
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

  const cta = userState.profile?.is_super_admin
    ? dictionaries.user_profile.cta.super_admin.items.map((item) => {
        return {
          ...item,
          onClick: handleClickBlockList,
        };
      })
    : dictionaries.user_profile.cta.organizational_admin.items.map((item) => {
        return {
          ...item,
          onClick:
            item.id === "delete_chat"
              ? handleClickDeleteChat
              : item.id === "block_list"
              ? handleClickBlockList
              : handleClickDeleteAccount,
        };
      });

  const handleClickOpen = () => {
    if (!!organization_id) {
      router.push(
        AppCollectionURL.private.driverOrganizationDetail({
          organization_id: String(organization_id),
          driver_id: state.user_profile.user_id ?? "",
        })
      );
    } else {
      router.push(
        AppCollectionURL.private.driverDetail({
          id: state.user_profile.user_id ?? "",
        })
      );
    }
  };

  return (
    <UserProfileModal
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
          src: state.user_profile.data?.avatar,
        },
        name: formatDisplayName({
          first_name: !state.user_profile.data?.last_name
            ? state.user_profile.data?.first_name
            : `${state.user_profile.data.first_name} ${state.user_profile.data.last_name}`,
          email: state.user_profile.data?.email,
        }),
        phone: "-",
        summary: summaryItems,
        detail: detailItems,
        cta: cta,
      }}
    />
  );
};

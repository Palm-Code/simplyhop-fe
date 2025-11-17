"use client";
import * as React from "react";
import { ChatTripActionEnum, ChatTripContext } from "../../context";
import { getDictionaries } from "../../i18n";
import { UserProfileModal } from "@/core/components/user_profile_modal/UserProfileModal";

export const UserProfileTripChat = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(ChatTripContext);
  const isOpen = state.user_profile.is_open;
  const handleClose = () => {
    dispatch({
      type: ChatTripActionEnum.SetUserProfileData,
      payload: {
        ...state.user_profile,
        data: null,
        is_open: false,
      },
    });
  };

  const handleClickDeleteChat = () => {
    dispatch({
      type: ChatTripActionEnum.SetDeleteChatConfirmationData,
      payload: {
        ...state.delete_chat_confirmation,
        is_open: true,
      },
    });
  };

  const handleClickBlock = () => {
    dispatch({
      type: ChatTripActionEnum.SetDeleteChatConfirmationData,
      payload: {
        ...state.block_confirmation,
        is_open: true,
      },
    });
  };

  const summaryItems =
    state.user_profile.data?.type === "passenger"
      ? []
      : dictionaries.user_profile.summary.items.map((item) => {
          let value = "-";
          switch (item.id) {
            case "trips": {
              value =
                state.user_profile.data?.statistic.trip?.toLocaleString(
                  "de-DE"
                ) ?? "-";
              break;
            }
            case "ratings": {
              value =
                state.user_profile.data?.statistic.ratings?.toLocaleString(
                  "de-DE"
                ) ?? "-";
              break;
            }
            case "passengers": {
              value =
                state.user_profile.data?.statistic.passengers?.toLocaleString(
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
      case "city": {
        value = state.user_profile.data?.place ?? "-";
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

  const cta = dictionaries.user_profile.cta.items.map((item) => {
    return {
      ...item,
      onClick:
        item.id === "delete_chat" ? handleClickDeleteChat : handleClickBlock,
    };
  });

  return (
    <UserProfileModal
      isOpen={isOpen}
      onClose={handleClose}
      title={dictionaries.user_profile.title}
      user={{
        avatar: state.room.header.avatar,
        name: state.room.header.name,
        phone: "-",
        summary: summaryItems,
        detail: detailItems,
        cta: cta,
      }}
    />
  );
};

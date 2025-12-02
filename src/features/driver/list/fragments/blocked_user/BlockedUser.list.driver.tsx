import * as React from "react";
import { BlockedUserModal } from "../../components/blocked_user_modal";
import { ListDriverActionEnum, ListDriverContext } from "../../context";
import { formatDisplayName } from "@/core/utils/name/functions";

export const BlockedUserListDriver = () => {
  const { state, dispatch } = React.useContext(ListDriverContext);

  const isOpen = state.blocked_user.is_open;

  const blockedUser = state.blocked_user.items.map((item) => {
    return {
      avatar: {
        src: item.blocked_user.avatar ?? "",
      },
      name: formatDisplayName({
        first_name: item.blocked_user.first_name,
        email: item.blocked_user.email,
      }),
    };
  });

  const handleClose = () => {
    dispatch({
      type: ListDriverActionEnum.SetBlockedUserData,
      payload: {
        ...state.blocked_user,
        items: [],
        user_id: null,
        is_open: false,
      },
    });
  };
  return (
    <BlockedUserModal
      isOpen={isOpen}
      blocked_user={blockedUser}
      onClose={handleClose}
    />
  );
};

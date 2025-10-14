import {
  ChatTripActionEnum,
  ChatTripActions,
  ChatTripList,
  ChatTripRoom,
  ChatTripOffer,
  ChatTripCompletedRide,
  ChatTripDriverProfile,
  ChatTripBlockConfirmation,
  ChatTripUnblockConfirmation,
  ChatTripDeleteChatConfirmation,
} from "./Chat.trip.types";

// List
export const ChatTripListReducers = (
  state: ChatTripList,
  action: ChatTripActions
) => {
  switch (action.type) {
    case ChatTripActionEnum.SetListData:
      return action.payload;
    case ChatTripActionEnum.SetListMessageItems: {
      return {
        ...state,
        message: {
          ...state.message,
          items: action.payload,
        },
      };
    }
    case ChatTripActionEnum.SetListMessagePaginationCurrent: {
      return {
        ...state,
        message: {
          ...state.message,
          pagination: {
            ...state.message.pagination,
            current: action.payload,
          },
        },
      };
    }
    case ChatTripActionEnum.SetListMessagePaginationLast: {
      return {
        ...state,
        message: {
          ...state.message,
          pagination: {
            ...state.message.pagination,
            last: action.payload,
          },
        },
      };
    }

    default:
      return state;
  }
};

// Room
export const ChatTripRoomReducers = (
  state: ChatTripRoom,
  action: ChatTripActions
) => {
  switch (action.type) {
    case ChatTripActionEnum.SetRoomData:
      return action.payload;
    case ChatTripActionEnum.SetRoomBookingStatus: {
      return {
        ...state,
        booking: {
          ...state.booking,
          status: action.payload,
        },
      };
    }

    case ChatTripActionEnum.SetRoomMessageItems: {
      return {
        ...state,
        message: {
          ...state.message,
          items: action.payload,
        },
      };
    }
    case ChatTripActionEnum.SetRoomMessagePaginationCurrent: {
      return {
        ...state,
        message: {
          ...state.message,
          pagination: {
            ...state.message.pagination,
            current: action.payload,
          },
        },
      };
    }
    case ChatTripActionEnum.SetRoomMessagePaginationLast: {
      return {
        ...state,
        message: {
          ...state.message,
          pagination: {
            ...state.message.pagination,
            last: action.payload,
          },
        },
      };
    }
    case ChatTripActionEnum.SetRoomMessagePaginationIsRefetch: {
      return {
        ...state,
        message: {
          ...state.message,
          pagination: {
            ...state.message.pagination,
            is_refetch: action.payload,
          },
        },
      };
    }
    case ChatTripActionEnum.SetRoomMessagePaginationCounter: {
      return {
        ...state,
        message: {
          ...state.message,
          pagination: {
            ...state.message.pagination,
            counter: action.payload,
          },
        },
      };
    }
    case ChatTripActionEnum.SetRoomMessageIsBlocked: {
      return {
        ...state,
        is_blocked: action.payload,
      };
    }
    case ChatTripActionEnum.SetRoomMessageIsRated: {
      return {
        ...state,
        is_rated: action.payload,
      };
    }
    case ChatTripActionEnum.SetRoomMessageRating: {
      return {
        ...state,
        rating: action.payload,
      };
    }

    default:
      return state;
  }
};

// Offer
export const ChatTripOfferReducers = (
  state: ChatTripOffer,
  action: ChatTripActions
) => {
  switch (action.type) {
    case ChatTripActionEnum.SetOfferData:
      return action.payload;

    default:
      return state;
  }
};

// CompletedRide
export const ChatTripCompletedRideReducers = (
  state: ChatTripCompletedRide,
  action: ChatTripActions
) => {
  switch (action.type) {
    case ChatTripActionEnum.SetCompletedRideData:
      return action.payload;

    default:
      return state;
  }
};

// DriverProfile
export const ChatTripDriverProfileReducers = (
  state: ChatTripDriverProfile,
  action: ChatTripActions
) => {
  switch (action.type) {
    case ChatTripActionEnum.SetDriverProfileData:
      return action.payload;

    default:
      return state;
  }
};

// BlockConfirmation
export const ChatTripBlockConfirmationReducers = (
  state: ChatTripBlockConfirmation,
  action: ChatTripActions
) => {
  switch (action.type) {
    case ChatTripActionEnum.SetBlockConfirmationData:
      return action.payload;

    default:
      return state;
  }
};

// UnblockConfirmation
export const ChatTripUnblockConfirmationReducers = (
  state: ChatTripUnblockConfirmation,
  action: ChatTripActions
) => {
  switch (action.type) {
    case ChatTripActionEnum.SetUnblockConfirmationData:
      return action.payload;

    default:
      return state;
  }
};

// DeleteChatConfirmation
export const ChatTripDeleteChatConfirmationReducers = (
  state: ChatTripDeleteChatConfirmation,
  action: ChatTripActions
) => {
  switch (action.type) {
    case ChatTripActionEnum.SetDeleteChatConfirmationData:
      return action.payload;

    default:
      return state;
  }
};

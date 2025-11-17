import {
  DetailDriverActionEnum,
  DetailDriverActions,
  DetailDriverUser,
} from "./Detail.driver.types";

// User
export const DetailDriverUserReducers = (
  state: DetailDriverUser,
  action: DetailDriverActions
) => {
  switch (action.type) {
    case DetailDriverActionEnum.SetUserData:
      return action.payload;

    default:
      return state;
  }
};

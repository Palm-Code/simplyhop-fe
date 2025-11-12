import {
  DashboardSupportActionEnum,
  DashboardSupportActions,
  DashboardSupportInformation,
} from "./Dashboard.support.types";

// Information
export const DashboardSupportInformationReducers = (
  state: DashboardSupportInformation,
  action: DashboardSupportActions
) => {
  switch (action.type) {
    case DashboardSupportActionEnum.SetInformationData:
      return action.payload;

    default:
      return state;
  }
};

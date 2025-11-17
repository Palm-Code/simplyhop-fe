import { CardVehiclesSupportProps } from "../components/card";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// State Collection Types
export interface VehiclesSupportInitialStateType {
  list: VehiclesSupportList;
  ride_plan: VehiclesSupportRidePlan;
}

// State Collection Types consist of:
export interface VehiclesSupportList {
  data: CardVehiclesSupportProps[];
}

export interface VehiclesSupportRidePlan {
  form: {
    offer_trip: {
      selected: null | { id: string; name: string };
    };
  };
}

export enum VehiclesSupportActionEnum {
  // List
  SetListData = "SetListData",
  // RidePlan
  SetRidePlanData = "SetRidePlanData",
}

// Action Collection Types
export type VehiclesSupportActions =
  | VehiclesSupportListActions
  | VehiclesSupportRidePlanActions;

// Action Collection Types consist of:
// List
type VehiclesSupportListPayload = {
  [VehiclesSupportActionEnum.SetListData]: VehiclesSupportList;
};

export type VehiclesSupportListActions =
  ActionMap<VehiclesSupportListPayload>[keyof ActionMap<VehiclesSupportListPayload>];

// RidePlan
type VehiclesSupportRidePlanPayload = {
  [VehiclesSupportActionEnum.SetRidePlanData]: VehiclesSupportRidePlan;
};

export type VehiclesSupportRidePlanActions =
  ActionMap<VehiclesSupportRidePlanPayload>[keyof ActionMap<VehiclesSupportRidePlanPayload>];

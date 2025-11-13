import {
  GetDashboardMySuccessDataResponseInterface,
  GetDashboardOrganizationSummarySuccessDataResponseInterface,
  GetDashboardSuperAdminSummarySuccessDataResponseInterface,
} from "@/core/models/rest/simplyhop/dashboard";

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
export interface DashboardSupportInitialStateType {
  summary: DashboardSupportSummary;
}

// State Collection Types consist of:
export type DashboardSupportSummary = {
  personal: GetDashboardMySuccessDataResponseInterface | null;
  organization_admin: GetDashboardOrganizationSummarySuccessDataResponseInterface | null;
  super_admin: GetDashboardSuperAdminSummarySuccessDataResponseInterface | null;
};

export enum DashboardSupportActionEnum {
  // Summary
  SetSummaryData = "SetSummaryData",
  SetSummaryPersonalData = "SetSummaryPersonalData",
  SetSummaryOrganizationAdminData = "SetSummaryOrganizationAdminData",
  SetSummarySuperAdminData = "SetSummarySuperAdminData",
}

// Action Collection Types
export type DashboardSupportActions = DashboardSupportSummaryActions;

// Action Collection Types consist of:
// Summary
type DashboardSupportSummaryPayload = {
  [DashboardSupportActionEnum.SetSummaryData]: DashboardSupportSummary;
  [DashboardSupportActionEnum.SetSummaryPersonalData]: DashboardSupportSummary["personal"];
  [DashboardSupportActionEnum.SetSummaryOrganizationAdminData]: DashboardSupportSummary["organization_admin"];
  [DashboardSupportActionEnum.SetSummarySuperAdminData]: DashboardSupportSummary["super_admin"];
};

export type DashboardSupportSummaryActions =
  ActionMap<DashboardSupportSummaryPayload>[keyof ActionMap<DashboardSupportSummaryPayload>];

export const AppCollectionURL = {
  public: {
    login: (params?: string) => (!params ? "/" : `/?${params}`),
    register: (params?: string) =>
      !params ? "/register" : `/register?${params}`,
    forgot_password: () => `/forgot-password`,
  },
  private: {
    chat: (params?: string) => (!params ? "/chat" : `/chat?${params}`),
    trip: () => "/mitfahrt-suchen",
    tripResult: (params?: string) =>
      !params ? `/mitfahrt-suchen/result` : `/mitfahrt-suchen/result?${params}`,
    ride: () => "/mitfahrt-anbieten",
    myList: (params?: string) =>
      !params ? `/meine-fahrten` : `/meine-fahrten?${params}`,
    myListArchive: (params?: string) =>
      !params ? `/meine-fahrten/archive` : `/meine-fahrten/archive?${params}`,
    profile_registration: () => "/profile-registration",
    support_vehicles: () => `/support/fahrzeuginformationen/`,
    support_vehicle_create: () => `/support/fahrzeuginformationen/create`,
    support_vehicle_detail: (id: string) =>
      `/support/fahrzeuginformationen/detail/${id}`,
    support_account: () => "/support/konto",
    support_account_edit: () => "/support/konto/edit",
    support_payment: () => "/support/abonnement",
    support_dashboard: () => "/support/dashboard",
    driver: () => "/support/fahrer",
    driverDetail: (path: { id: string }) => `/support/fahrer/detail/${path.id}`,
    dashboardTrip: () => "/support/fahrten",
    organization: () => "/support/organisation",
    organizationDetail: (path: { id: string }) =>
      `/support/organisation/detail/${path.id}`,
    driverOrganizationDetail: (path: {
      organization_id: string;
      driver_id: string;
    }) =>
      `/support/fahrer/organisation/${path.organization_id}/detail/${path.driver_id}`,
  },
};

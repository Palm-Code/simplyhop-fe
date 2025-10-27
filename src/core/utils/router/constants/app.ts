export const AppCollectionURL = {
  public: {
    login: (params?: string) => (!params ? "/" : `/?${params}`),
    register: (params?: string) =>
      !params ? "/register" : `/register?${params}`,
    forgot_password: () => `/forgot-password`,
  },
  private: {
    chat: (params?: string) => (!params ? "/chat" : `/chat?${params}`),
    trip: () => "/mitfahrt-suchen/result",
    tripResult: (params?: string) =>
      !params ? `/mitfahrt-suchen/result` : `/mitfahrt-suchen/result?${params}`,
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
  },
};

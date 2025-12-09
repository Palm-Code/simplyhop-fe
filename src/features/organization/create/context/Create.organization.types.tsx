import { FormError } from "@/core/utils/form";

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
export interface CreateOrganizationInitialStateType {
  company_data: CreateOrganizationCompanyData;
  personal_information: CreateOrganizationPersonalInformation;
  ride_plan: CreateOrganizationRidePlan;
  vehicle_information: CreateOrganizationVehicleInformation;
  notification: CreateOrganizationNotification;
}

// State Collection Types consist of:
export interface CreateOrganizationCompanyData {
  form: {
    company_type: {
      selected: null | { id: string; name: string; description: string };
    };
    domain: {
      value: string;
      error: FormError;
    };
    company_code: {
      value: string;
      error: FormError;
    };
    admin_email: {
      value: string;
      error: FormError;
    };
    company_name: {
      value: string;
      error: FormError;
    };
    telephone: {
      value: string;
      error: FormError;
    };
    responsible_person: {
      first_name: {
        value: string;
        error: FormError;
      };
      last_name: {
        value: string;
        error: FormError;
      };
    };
  };
}
export interface CreateOrganizationPersonalInformation {
  form: {
    email: {
      value: string;
      error: FormError;
    };
    first_name: {
      value: string;
      error: FormError;
    };
    last_name: {
      value: string;
      error: FormError;
    };
    city: {
      value: string;
      error: FormError;
    };
    phonenumber: {
      value: string;
      error: FormError;
    };
    about_me: {
      value: string;
      error: FormError;
    };
    gender: {
      selected: null | { id: string; name: string };
      error: FormError;
    };
  };
}

export interface CreateOrganizationRidePlan {
  form: {
    offer_trip: {
      selected: null | { id: string; name: string };
    };
  };
}

export interface CreateOrganizationVehicleInformation {
  general: {
    form: {
      car_brand: {
        selected: null | { id: string; name: string };
        items: { id: string; name: string }[];
        error: FormError;
        query: string;
      };
      car_category: {
        selected: null | { id: string; name: string };
        items: { id: string; name: string }[];
        error: FormError;
        query: string;
      };
      car_model: {
        value: string;
        error: FormError;
      };
      car_color: {
        value: string;
        error: FormError;
      };
      license_plate: {
        value: string;
        error: FormError;
      };
    };
  };
  pictures: {
    files: ({ id: string; image_url: string } | File)[];
  };
  capacity: {
    passenger_seats: {
      form: {
        available_seat: {
          selected: null | { id: string; name: string };
          items: { id: string; name: string }[];
        };
        available_car_seat: {
          selected: null | { id: string; name: string };
          items: { id: string; name: string }[];
        };
      };
    };
    luggage: {
      form: {
        luggage: {
          selected: null | { id: string; name: string };
          items: { id: string; name: string }[];
        };
        luggage_size: {
          selected: null | { id: string; name: string };
          items: { id: string; name: string }[];
        };
      };
    };
  };
  trip: {
    form: {
      smoking: {
        selected: null | { id: string; name: string };
        items: { id: string; name: string }[];
      };
      music: {
        selected: null | { id: string; name: string };
        items: { id: string; name: string }[];
      };
      pet: {
        selected: null | { id: string; name: string };
        items: { id: string; name: string }[];
      };
    };
  };
}

export interface CreateOrganizationNotification {
  is_open: boolean;
}

export enum CreateOrganizationActionEnum {
  // CompanyData
  SetCompanyDataData = "SetCompanyDataData",
  // PersonalInformation
  SetPersonalInformationData = "SetPersonalInformationData",
  // RidePlan
  SetRidePlanData = "SetRidePlanData",
  // VehicleInformation
  SetVehicleInformationData = "SetVehicleInformationData",
  // Notification
  SetNotificationData = "SetNotificationData",
}

// Action Collection Types
export type CreateOrganizationActions =
  | CreateOrganizationCompanyDataActions
  | CreateOrganizationPersonalInformationActions
  | CreateOrganizationRidePlanActions
  | CreateOrganizationVehicleInformationActions
  | CreateOrganizationNotificationActions;

// Action Collection Types consist of:
// CompanyData
type CreateOrganizationCompanyDataPayload = {
  [CreateOrganizationActionEnum.SetCompanyDataData]: CreateOrganizationCompanyData;
};

export type CreateOrganizationCompanyDataActions =
  ActionMap<CreateOrganizationCompanyDataPayload>[keyof ActionMap<CreateOrganizationCompanyDataPayload>];

// PersonalInformation
type CreateOrganizationPersonalInformationPayload = {
  [CreateOrganizationActionEnum.SetPersonalInformationData]: CreateOrganizationPersonalInformation;
};

export type CreateOrganizationPersonalInformationActions =
  ActionMap<CreateOrganizationPersonalInformationPayload>[keyof ActionMap<CreateOrganizationPersonalInformationPayload>];

// RidePlan
type CreateOrganizationRidePlanPayload = {
  [CreateOrganizationActionEnum.SetRidePlanData]: CreateOrganizationRidePlan;
};

export type CreateOrganizationRidePlanActions =
  ActionMap<CreateOrganizationRidePlanPayload>[keyof ActionMap<CreateOrganizationRidePlanPayload>];

// VehicleInformation
type CreateOrganizationVehicleInformationPayload = {
  [CreateOrganizationActionEnum.SetVehicleInformationData]: CreateOrganizationVehicleInformation;
};

export type CreateOrganizationVehicleInformationActions =
  ActionMap<CreateOrganizationVehicleInformationPayload>[keyof ActionMap<CreateOrganizationVehicleInformationPayload>];

// Notification
type CreateOrganizationNotificationPayload = {
  [CreateOrganizationActionEnum.SetNotificationData]: CreateOrganizationNotification;
};

export type CreateOrganizationNotificationActions =
  ActionMap<CreateOrganizationNotificationPayload>[keyof ActionMap<CreateOrganizationNotificationPayload>];

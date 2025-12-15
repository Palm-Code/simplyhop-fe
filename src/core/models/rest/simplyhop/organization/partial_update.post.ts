import { User } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface PostOrganizationPartialUpdateRequestInterface
  extends NextApiRequest {
  payload: PostOrganizationPartialUpdatePayloadRequestInterface;
}

export interface PostOrganizationPartialUpdatePayloadRequestInterface {
  path: PostOrganizationPartialUpdatePathPayloadRequestInterface;
  body: FormData;
}
export interface PostOrganizationPartialUpdatePathPayloadRequestInterface {
  id: string;
}

export interface PostOrganizationPartialUpdateBodyPayloadRequestInterface {
  // name?: string;
  // responsible_person_first_name?: string;
  // responsible_person_last_name?: string;
  // domain?: string;

  // phone?: string;
  // // unused for temp
  // email?: string;
  // logo?: string;
  // is_active?: boolean;
  name: string;
  responsible_person_first_name?: string;
  responsible_person_last_name?: string;
  email: string;
  domain?: string;
  organization_code?: string;
  phone?: string;
  city?: string;
  address?: string;
  address_line_2?: string;
  postal_code?: string;
  addresses?: {
    postal_code: string; //"10115";
    location_2?: string; //"Location 2";
    city: string; //"Berlin";
    latitude: number; //52.520008;
    is_primary?: boolean; // false;
    longitude: number; // 13.404954;
    address_line_2?: string; // "Etage 2";
    address: string; //"Musterstraße 123";
    location: string; //"Berlin Mitte"
    id?: number;
  }[];
}

export type PostOrganizationPartialUpdateResponseInterface = NextApiResponse<
  | PostOrganizationPartialUpdateSuccessResponseInterface
  | PostOrganizationPartialUpdateErrorResponseInterface
>;

export interface PostOrganizationPartialUpdateSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: User;

  redirect: null;
}

export interface PostOrganizationPartialUpdateErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

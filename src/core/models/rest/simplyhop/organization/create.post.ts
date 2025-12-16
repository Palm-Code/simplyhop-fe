import { User } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface PostOrganizationCreateRequestInterface extends NextApiRequest {
  payload?: PostOrganizationCreatePayloadRequestInterface;
}

export interface PostOrganizationCreatePayloadRequestInterface {
  body: FormData;
}

export type PostOrganizationCreateBodyPayloadRequestInterface = {
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
    location: string; //"Berlin Mitte";
  }[];
  logo?: File;
};

export type PostOrganizationCreateResponseInterface = NextApiResponse<
  | PostOrganizationCreateSuccessResponseInterface
  | PostOrganizationCreateErrorResponseInterface
>;

export interface PostOrganizationCreateSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: User;
  redirect: null;
}

export interface PostOrganizationCreateErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

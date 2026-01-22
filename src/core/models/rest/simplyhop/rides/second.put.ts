import { NextApiRequest, NextApiResponse } from "next";

export interface PutRidesSecondRequestInterface extends NextApiRequest {
  payload?: PutRidesSecondPayloadRequestInterface;
}

export interface PutRidesSecondPayloadRequestInterface {
  body: PutRidesSecondBodyPayloadRequestInterface;
  path: PutRidesSecondPathPayloadRequestInterface;
}

export type PutRidesSecondPathPayloadRequestInterface = {
  id: number;
};

export type PutRidesSecondBodyPayloadRequestInterface = {
  recurring_ride: string; //"no";
  waiting_time: string; //"5 minuten";
  available_seats: number; //2;
  additional_info: string; //"my information";
  available_child_seats?: number;
};

export type PutRidesSecondResponseInterface = NextApiResponse<
  PutRidesSecondSuccessResponseInterface | PutRidesSecondErrorResponseInterface
>;

export interface PutRidesSecondSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: {
    token: string;
    token_type: string;
    user: {
      id: number;
      name: string;
      email: string;
      avatar: string;
      email_verified_at: string;
      created_at: string;
      updated_at: string;
    };
  };
  redirect: null;
}

export interface PutRidesSecondErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

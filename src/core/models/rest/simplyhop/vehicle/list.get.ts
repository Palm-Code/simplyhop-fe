import { Vehicle } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetVehicleListRequestInterface extends NextApiRequest {
  payload?: GetVehicleListPayloadRequestInterface;
}

export interface GetVehicleListPayloadRequestInterface {
  params?: GetVehicleListParamsPayloadRequestInterface;
}

export type GetVehicleListParamsPayloadRequestInterface = {
  include?: string;
  "page[number]"?: number;
  "page[size]"?: number;
  "filter[user_id]"?: string;
};

export type GetVehicleListResponseInterface = NextApiResponse<
  GetVehicleListSuccessResponseInterface | GetVehicleListErrorResponseInterface
>;

export interface GetVehicleListSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: Vehicle[];

  redirect: null;
}

export interface GetVehicleListErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

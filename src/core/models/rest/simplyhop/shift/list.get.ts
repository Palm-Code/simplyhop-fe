import { Shift } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetShiftListRequestInterface extends NextApiRequest {
  payload?: GetShiftListPayloadRequestInterface;
}

export interface GetShiftListPayloadRequestInterface {
  params?: GetShiftListParamsPayloadRequestInterface;
}

export type GetShiftListParamsPayloadRequestInterface = {
  include?: string;
  "page[number]"?: number;
  "page[size]"?: number;
};

export type GetShiftListResponseInterface = NextApiResponse<
  GetShiftListSuccessResponseInterface | GetShiftListErrorResponseInterface
>;

export interface GetShiftListSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: Shift[];
  redirect: null;
}

export interface GetShiftListErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

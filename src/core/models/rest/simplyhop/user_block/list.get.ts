import { Shift, UserBlock } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetUserBlockListRequestInterface extends NextApiRequest {
  payload?: GetUserBlockListPayloadRequestInterface;
}

export interface GetUserBlockListPayloadRequestInterface {
  params?: GetUserBlockListParamsPayloadRequestInterface;
}

export type GetUserBlockListParamsPayloadRequestInterface = {
  "filter[userid]"?: string;
  include?: string;
  "page[number]"?: number;
  "page[size]"?: number;
};

export type GetUserBlockListResponseInterface = NextApiResponse<
  | GetUserBlockListSuccessResponseInterface
  | GetUserBlockListErrorResponseInterface
>;

export interface GetUserBlockListSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: UserBlock[];
  redirect: null;
}

export interface GetUserBlockListErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

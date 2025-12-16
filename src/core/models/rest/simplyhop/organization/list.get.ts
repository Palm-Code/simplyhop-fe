import { Meta, Organization } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetOrganizationListRequestInterface extends NextApiRequest {
  payload?: GetOrganizationListPayloadRequestInterface;
}

export interface GetOrganizationListPayloadRequestInterface {
  params?: GetOrganizationListParamsPayloadRequestInterface;
}

export type GetOrganizationListParamsPayloadRequestInterface = {
  include?: string;
  //mandatory
  sort?: string;
  "page[number]"?: number;
  "page[size]"?: number;
  search?: string;
};

export type GetOrganizationListResponseInterface = NextApiResponse<
  | GetOrganizationListSuccessResponseInterface
  | GetOrganizationListErrorResponseInterface
>;

export interface GetOrganizationListSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: Organization[];

  redirect: null;
  meta: Meta;
}

export interface GetOrganizationListErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

import { Message, Meta } from "@/core/models/data";
import { NextApiResponse } from "next";

export type GetOrganizationGenerateCodeResponseInterface = NextApiResponse<
  | GetOrganizationGenerateCodeSuccessResponseInterface
  | GetOrganizationGenerateCodeErrorResponseInterface
>;

export interface GetOrganizationGenerateCodeSuccessResponseInterface {
  organization_code: string;
}

export interface GetOrganizationGenerateCodeErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

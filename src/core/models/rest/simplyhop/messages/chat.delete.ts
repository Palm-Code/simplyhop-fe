import { NextApiRequest, NextApiResponse } from "next";

export interface DeleteMessagesChatRequestInterface extends NextApiRequest {
  payload?: DeleteMessagesChatPayloadRequestInterface;
}

export interface DeleteMessagesChatPayloadRequestInterface {
  path: DeleteMessagesChatPathPayloadRequestInterface;
}

export type DeleteMessagesChatPathPayloadRequestInterface = {
  id: string;
};

export type DeleteMessagesChatResponseInterface = NextApiResponse<
  | DeleteMessagesChatSuccessResponseInterface
  | DeleteMessagesChatErrorResponseInterface
>;

export interface DeleteMessagesChatSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: {
    id: number; //1;
    message_room_id: number; //1;
    ride_booking_id: number; //1;
    sender_id: number; //1;
    passenger_id: number; //1;
    driver_id: number; //2;
    contents: {
      type: string; //"offer_request";
      message: string; //"The passenger has booked a ride and offered a price of 60";
      booking_id: number; //1;
      offered_price: number; //60;
    };
    read_at_driver: boolean | null;
    read_at_passenger: boolean | null;
    deleted_at: string | null;
    created_at: string; //"2025-04-22T03:47:51.000000Z";
    updated_at: string; //"2025-04-22T03:47:51.000000Z";
  }[];

  redirect: null;
}

export interface DeleteMessagesChatErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

import { User } from "./user";
import { Vehicle } from "./vehicle";

export interface Ride {
  id: number; //3;
  user_id: number; //3;
  unique_code: null | string;
  vehicle_id: number; //3;
  start_lat: number; //52.4812816;
  start_long: number; //13.421814;
  start_name: string; //"Berlin";
  destination_lat: number; //48.0980803;
  destination_long: number; //11.5408584;
  destination_name: string; //"München";
  eta: number; //21600;
  recurring_ride: string; //"no";
  waiting_time: string; //"5 mins";
  luggage_allowed: boolean; //true;
  maxtwo_backseat: boolean; //true;
  additional_info: string; //"Facilis autem esse illum doloremque.";
  base_price: number; //6.43;
  deleted_at: string | null;
  created_at: string; //"2025-04-24T08:03:38.000000Z";
  updated_at: string; //"2025-04-24T08:03:38.000000Z";
  available_seats: number; // 1;
  departure_time: string; // "2025-04-22T10:00:00.000000Z";
  vehicle?: Vehicle;
  user?: User;
  url?: string | null;
}

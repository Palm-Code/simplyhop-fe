import { User } from "./user";

export interface UserBlock {
  id: number; //2;
  user_id: number; //14;
  organization_id: number; //1;
  blocked_user_id: number; //13;
  blocked_user: User;
  user: User;
  created_at: string; //"2025-11-27T03:57:05.000000Z";
  updated_at: string | null; // "2025-11-27T03:57:05.000000Z";
}

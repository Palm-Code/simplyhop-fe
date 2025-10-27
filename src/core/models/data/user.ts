import { UserProfile } from "./user_profile";

export interface User {
  id: number; //1;
  first_name: string; //"Gracie";
  last_name: string; //"Effertz";
  email: string; //"user@example.com";
  mobile: string | null;
  city: string | null;
  email_verified_at: string; //"2025-04-22 10:44:18";
  avatar: string | null;
  is_driver: number; //1;
  gender: string | null;
  can_share_ride: boolean; //0;
  deleted_at: string | null;
  created_at: string; //"2025-04-22 03:44:21";
  updated_at: string; //"2025-04-22 03:46:39";
  is_profile_complete: boolean;
  profile?: UserProfile;
}

export interface OrganizationAddress {
  id: number; //1;
  organization_id: number; //1;
  address: string | null; //"Address";
  address_line_2: string | null; //"Address_line_2";
  postal_code: string | null; //"12345";
  city: string | null; //"Berlin";
  location: string | null; //"Berlin";
  location_2: string | null; //"";
  latitude: number; //"42.11110000";
  longitude: number; //"42.11110000";
  is_primary: boolean; //false;
  created_at: string | null; //null;
  updated_at: string | null; //null;
  name: string | null;
}

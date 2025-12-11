import { OrganizationAddress } from "./organization_address";
import { OrganizationMedia } from "./organization_media";

export interface Organization {
  id: number; //1;
  name: string; //"PalmCode Inc.";
  responsible_person_first_name: string | null; //"John Doe";
  responsible_person_last_name: string | null; //"";
  domain: string | null; //"gmail.com";
  organization_code: string | null;
  email: string; //"info@gmail.com";
  phone: string | null; //"+628123456789";
  city: string | null; //"Berlin";
  address: string | null; //"Address";
  address_line_2: string | null; //"Address_line_2";
  postal_code: string | null; //"12345";
  is_active: boolean; //true;
  created_at: string; //"2025-09-02T12:35:40.000000Z";
  updated_at: string | null; //"2025-11-18T05:18:48.000000Z";
  logo: string | null; //"https://s3.us-east-005.backblazeb2.com/simplyhop/23/city-car.png";
  addresses: OrganizationAddress[];
  media: OrganizationMedia[];
}

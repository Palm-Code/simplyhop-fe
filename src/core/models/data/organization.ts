export interface Organization {
  id: number; //1;
  name: string; //"Test Org";
  responsible_person_name: string; //"";
  domain: string; //"gmail.com";
  email: string; //"angga.fs@gmail.com";
  phone: string | null; // null;
  is_active: boolean; //true;
  created_at: string; // "2025-09-02T12:35:40.000000Z";
  updated_at: string; // "2025-09-02T12:35:41.000000Z";
  logo: string; // "";
  media: any[];
  city: string | null;
}

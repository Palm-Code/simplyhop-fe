export interface Shift {
  id: number;
  organization_id: number;
  name: string;
  start_time: string | null;
  end_time: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

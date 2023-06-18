export type Reservation = {
  id: number;
  id_user: string;
  placeNumber: number;
  date_start: string;
  date_end: string;
  created_at: string;
  areaName: string;
  date_range?: string[];
};
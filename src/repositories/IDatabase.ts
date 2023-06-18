export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Area: {
        Row: {
          id: number;
          id_room: number | null;
          name: string | null;
          places: number | null;
        };
        Insert: {
          id?: number;
          id_room?: number | null;
          name?: string | null;
          places?: number | null;
        };
        Update: {
          id?: number;
          id_room?: number | null;
          name?: string | null;
          places?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "Area_id_room_fkey";
            columns: ["id_room"];
            referencedRelation: "Room";
            referencedColumns: ["id"];
          }
        ];
      };
      Building: {
        Row: {
          id: number;
          name: string | null;
        };
        Insert: {
          id?: number;
          name?: string | null;
        };
        Update: {
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      Location: {
        Row: {
          id_area: number | null;
          place_number: number;
        };
        Insert: {
          id_area?: number | null;
          place_number?: number;
        };
        Update: {
          id_area?: number | null;
          place_number?: number;
        };
        Relationships: [
          {
            foreignKeyName: "Location_id_area_fkey";
            columns: ["id_area"];
            referencedRelation: "Area";
            referencedColumns: ["id"];
          }
        ];
      };
      Reservation: {
        Row: {
          created_at: string;
          date_end: string;
          date_start: string;
          id: string;
          id_user: string;
          place_number: number;
        };
        Insert: {
          created_at: string;
          date_end: string;
          date_start: string;
          id?: string;
          id_user: string;
          place_number: number;
        };
        Update: {
          created_at?: string;
          date_end?: string;
          date_start?: string;
          id?: string;
          id_user?: string;
          place_number?: number;
        };
        Relationships: [
          {
            foreignKeyName: "Reservation_id_user_fkey";
            columns: ["id_user"];
            referencedRelation: "User";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Reservation_place_number_fkey";
            columns: ["place_number"];
            referencedRelation: "Location";
            referencedColumns: ["place_number"];
          }
        ];
      };
      Role: {
        Row: {
          id: number;
          name: string | null;
        };
        Insert: {
          id?: number;
          name?: string | null;
        };
        Update: {
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      Room: {
        Row: {
          id: number;
          id_building: number | null;
          name: string | null;
          places: number | null;
        };
        Insert: {
          id?: number;
          id_building?: number | null;
          name?: string | null;
          places?: number | null;
        };
        Update: {
          id?: number;
          id_building?: number | null;
          name?: string | null;
          places?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "Room_id_building_fkey";
            columns: ["id_building"];
            referencedRelation: "Building";
            referencedColumns: ["id"];
          }
        ];
      };
      User: {
        Row: {
          created_at: string | null;
          email: string | null;
          id: string;
          role_id: number | null;
          trigram: string | null;
        };
        Insert: {
          created_at?: string | null;
          email?: string | null;
          id: string;
          role_id?: number | null;
          trigram?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string | null;
          id?: string;
          role_id?: number | null;
          trigram?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "User_role_id_fkey";
            columns: ["role_id"];
            referencedRelation: "Role";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

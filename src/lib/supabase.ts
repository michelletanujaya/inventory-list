import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Inventory {
  id: string;
  name: string;
  price: number;
  updated_at: string;
  created_at: string;
}

export type InventoryInsert = Omit<
  Inventory,
  "id" | "created_at" | "updated_at"
>;
export type InventoryUpdate = Partial<InventoryInsert>;

export interface Log {
  id: string;
  date: string;
  starting_quantity?: number;
  add_quantity: number;
  sold_quantity: number;
  ending_quantity?: number;
  created_at: string;
  updated_at: string;
  inventory_id: string;
}

export type LogInsert = Omit<Log, "id" | "created_at" | "updated_at">;

export type LogUpdate = Partial<LogInsert>;

// Auth types
export interface AuthUser {
  id: string;
  email: string;
  user_metadata: {
    email: string;
    email_verified: boolean;
    phone_verified: boolean;
    sub: string;
  };
}

import { Database } from "../types/supabase";

export type Shop = Database["public"]["Tables"]["shops"]["Row"]
export type InsertShop = Database["public"]["Tables"]["shops"]["Insert"]
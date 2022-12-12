import { createClient } from "@supabase/supabase-js";
import Shop from "../models/Shop";

export async function getShop(id: number): Promise<Shop | null> {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL??'', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY??'');
    let { data, error, status } = await supabase
    .from("shops")
    .select("*")
    .eq("id", id);

    if (error) {
    throw error;
    }
    return data ? data[0] : null;
};

export async function getShopsIds(): Promise<number[]> {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL??'', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY??'');
    let { data, error, status } = await supabase
    .from("shops")
    .select("id");

    if (error) {
    throw error;
    }
    return data?.map((s) => s.id)??[];
};
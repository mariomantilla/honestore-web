import { createClient } from "@supabase/supabase-js";
import Shop from "../models/Shop";

export async function getShop(id: number): Promise<Shop | null> {
    console.log('CREATING SUPABASE client');
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL??'', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY??'');
    console.log('calling shops api');
    let { data, error, status } = await supabase
    .from("shops")
    .select("*")
    .eq("id", id);
    console.log('data received', data);

    if (error) {
    throw error;
    }
    return data ? data[0] as Shop : null;
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
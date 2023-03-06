import Shop from "../models";
import { supabase } from "./supabaseClient";

export async function getShop(id: number): Promise<Shop | null> {
    console.log('calling shops api');
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
    let { data, error, status } = await supabase
    .from("shops")
    .select("id");

    if (error) {
    throw error;
    }
    return data?.map((s) => s.id)??[];
};

export const getShopLogo = (shop: Shop) => {
    return `https://tbhtpkmrwtznqzsjlfmo.supabase.co/storage/v1/object/public/shops-content/${shop.logo}.jpg`
}
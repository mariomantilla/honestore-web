import { User } from "@supabase/supabase-js";
import Shop from "../models";
import { supabase } from "./supabaseClient";

export async function getShop(id: number): Promise<Shop | null> {
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

export namespace DataService {

    export const newShops = ()  => {
        return supabase.from('shops').select('*').order('created_at', {ascending: false}).limit(4);
    }

    export const searchShops = (query: string)  => {
        return supabase.rpc('search_shops', { search: query });
    }

    export const getFavourites = (user: User)  => {
        return supabase.from('shops').select('*, favourites!inner(user)').eq('favourites.user', user.id);
    }
    
    export const addFavourite = (user: User, shop: Shop) => {
        return supabase.from('favourites').insert({'shop': shop.id, 'user': user.id});
    }

    export const removeFavourite = (user: User, shop: Shop) => {
        return supabase.from('favourites').delete().eq('shop', shop.id).eq('user', user.id);
    }
    
    export const getShopLogo = (shop: Shop) => {
        return `https://tbhtpkmrwtznqzsjlfmo.supabase.co/storage/v1/object/public/shops-content/${shop.logo}.jpg`
    }

}
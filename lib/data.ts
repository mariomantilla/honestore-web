import { User } from "@supabase/supabase-js";
import { InsertShop, Shop, UpdateShop } from "../models";
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

export async function getShopBySlug(slug: string): Promise<Shop | null> {
    let { data, error, status } = await supabase
    .from("shops")
    .select("*")
    .eq("slug", slug);

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

    export const getAllShops = () => {
        return supabase.from('shops').select('*')
    }

    export const newShops = ()  => {
        return supabase.from('shops').select('*').order('created_at', {ascending: false}).limit(12);
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

    export const addFeedback = (rating: number, comments: string) => {
        return supabase.from('feedback').insert({'rating':rating, 'comments': comments});
    }
    
    export const getProfile = (user: User) => {
        return supabase.from('profiles').select('*').eq('id', user.id);
    }

    export const addShop = (data: InsertShop) => {
        return supabase.from('shops').insert([data]).select();
    }

    export const editShop = (id: number, data: UpdateShop) => {
        return supabase.from('shops').update(data).eq('id', id);
    }

    export const claimShop = (shop: Shop) => {
        return supabase.from('shop_claims').insert({'shop': shop.id});
    }

    export const shopCoordinates = (shop: Shop) => {
        const mapCentercoordsArray = shop.location_coordinates ? shop.location_coordinates.split(' ').map((x) => parseFloat(x)) : undefined;
	    const mapCentercoords: [number, number] | undefined = mapCentercoordsArray ? [mapCentercoordsArray[0], mapCentercoordsArray[1]] : undefined;
        return mapCentercoords;
    }

}
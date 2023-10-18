import { User } from "@supabase/supabase-js";
import { InsertShop, Shop, ShopTags, UpdateShop, Comment, Tag, Category } from "../models";
import { supabase } from "./supabaseClient";

export async function getShop(id: number): Promise<ShopTags | null> {
    let { data, error, status } = await supabase
    .from("shops")
    .select("*, tags(*)")
    .eq("id", id);

    if (error) {
    throw error;
    }
    return data ? data[0] : null;
};

export async function getShopBySlug(slug: string): Promise<ShopTags | null> {
    let { data, error, status } = await supabase
    .from("shops")
    .select("*, tags(*)")
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

type potentialShopsSelects = "*, tags(*), categories(*)" | "*, tags!inner(*), categories(*)" | "*, tags(*), categories!inner(*)" | "*, tags!inner(*), categories!inner(*)"

export namespace DataService {

    export const getAllShops = () => {
        return supabase.from('shops').select('*')
    }

    export const newShops = () => {
        return supabase.from('shops').select('*, tags(*)').order('created_at', {ascending: false}).limit(12);
    }

    export const searchShops = (query: string, category: Category | null, tags: Tag[])  => {
        let select = '*';
        let baseQuery = supabase.rpc('search_shops', { search: query });
        if (tags.length) {
            baseQuery = baseQuery.in('tags.id', (tags??[]).map(t => t.id));
            select += ', tags!inner(*)'
        } else select += ', tags(*)'
        if (category) {
            baseQuery = baseQuery.eq('categories.id', category.id);
            select += ', categories!inner(*)'
        } else select += ', categories(*)'
        return baseQuery.select(select as potentialShopsSelects);
    }

    export const getCategories = () => {
        return supabase.from('categories').select('*');
    }

    export const getTags = () => {
        return supabase.from('tags').select('*');
    }

    export const getFavourites = (user: User)  => {
        return supabase.from('shops').select('*, favourites!inner(user), tags(*)').eq('favourites.user', user.id);
    }

    export const getShopsByOwner = (user: User)  => {
        return supabase.from('shops').select('*, tags(*)').eq('owner', user.id);
    }

    export const getFavCount = (shop: Shop)  => {
        return supabase.from('favourites').select('count').eq('shop', shop.id);
    }
    
    export const addFavourite = (user: User, shop: Shop) => {
        return supabase.from('favourites').insert({'shop': shop.id, 'user': user.id});
    }

    export const removeFavourite = (user: User, shop: Shop) => {
        return supabase.from('favourites').delete().eq('shop', shop.id).eq('user', user.id);
    }

    export const addComment = (text: string, shop: Shop, user: User) => {
        return supabase.from('comments').insert({'shop': shop.id, 'user': user.id, 'text': text});
    }

    export const removeComment = (comment: Comment) => {
        return supabase.from('comments').delete().eq('id', comment.id);
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
        const mapCentercoordsArray = shop.location_coordinates ? shop.location_coordinates.split(' ').map((x: string) => parseFloat(x)) : undefined;
	    const mapCentercoords: [number, number] | undefined = mapCentercoordsArray ? [mapCentercoordsArray[0], mapCentercoordsArray[1]] : undefined;
        return mapCentercoords;
    }

    export const getComments = (shop: Shop) => {
        return supabase.from('comments').select('*, user(*)').eq('shop', shop.id).order('created_at', { ascending: false });
    }

}
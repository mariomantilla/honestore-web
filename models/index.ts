import { User } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

export type Shop = Database["public"]["Tables"]["shops"]["Row"]
export type Tag = Database["public"]["Tables"]["tags"]["Row"]
export type ShopTags = Shop & {tags: Tag[]}
export type ShopTagsCategories = ShopTags & {categories: Category[]}
export type InsertShop = Database["public"]["Tables"]["shops"]["Insert"]
export type UpdateShop = Database["public"]["Tables"]["shops"]["Update"]

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type Comment = Database["public"]["Tables"]["comments"]["Row"]
export type CommentUser = Comment & {user: string | Profile | Profile[] | null}
export type Category = Database["public"]["Tables"]["categories"]["Row"]


import { Database } from "../types/supabase";


type Shop = Database["public"]["Tables"]["shops"]["Row"]

export default Shop;
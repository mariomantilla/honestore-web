import { Favorite, FavoriteBorder } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useUserContext } from "../context/userData";
import { DataService } from "../lib/data";
import Shop from "../models";

export const FavButton = ({ shop, size }: { shop: Shop, size?: 'medium' | 'large' | undefined}) => {
    
    return <></>;
    // const user = useUser();
    // const { userFavouriteShopsIds, addFavourite, removeFavourite } = useUserContext();
    // const router = useRouter();
    // const isFav = userFavouriteShopsIds.includes(shop.id);

    // const handleFavToggle = () => {
    //     if (!user) { 
    //         router.push('/login');
    //         return
    //     }
    //     if (isFav) {
    //         DataService.removeFavourite(user, shop).then((r) => {if (!r.error) removeFavourite(shop.id)});
    //     }
    //     else {
    //         DataService.addFavourite(user, shop).then((r) => {if (!r.error) addFavourite(shop.id)});
    //     }
    // }

    // return (
    //     <Tooltip title={isFav ? "Quitar de favoritos" : "Guardar en favoritos"}>
    //         <IconButton
    //             aria-label="añadir o quitar de favoritos"
    //             onClick={() => { handleFavToggle() }}
    //         >
    //             {isFav ? (
    //                 <Favorite color="primary" fontSize={size || 'medium'} />
    //             ) : (
    //                 <FavoriteBorder color="primary" fontSize={size || 'medium'} />
    //             ) }            
    //         </IconButton>
    //     </Tooltip>
    // );
}
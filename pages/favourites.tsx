import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { privatePageLayout } from "../helpers/privatePageLayout";
import Shop from "../models";
import { NextPageWithLayout } from "./_app";
import Divider from "@mui/material/Divider";
import { DataService } from "../lib/data";
import Box from "@mui/material/Box";
import ShopList from "../components/shopList";
import { useUserContext } from "../context/userData";
import { useUser } from "@supabase/auth-helpers-react";

const FavouritesPage: NextPageWithLayout = () => {

    const [shops, setShops] = useState<(Shop | null)[]>([null, null, null]);
    const user = useUser();
    const { userFavouriteShopsIds } = useUserContext();

    useEffect(() => {
        if (user) DataService.getFavourites(user).then((shops) => setShops(shops.data ?? []));
    }, [user]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Typography variant="h1" component="h1">Mis Favoritos</Typography>
            <Divider />
            <ShopList shops={shops.filter((s) => !s || userFavouriteShopsIds.includes(s.id))}></ShopList>
        </Box>
    );
}

FavouritesPage.getLayout = privatePageLayout

export default FavouritesPage

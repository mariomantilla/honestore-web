import { useEffect, useState } from "react";
import { privatePageLayout } from "../helpers/privatePageLayout";
import Shop from "../models";
import { NextPageWithLayout } from "./_app";
import { DataService } from "../lib/data";
import ShopList from "../components/shopList";
import { useUserContext } from "../context/userData";
import { useUser } from "@supabase/auth-helpers-react";
import TitlePage from "../components/titlePage";

const FavouritesPage: NextPageWithLayout = () => {

    const [shops, setShops] = useState<(Shop | null)[]>([null, null, null]);
    const user = useUser();
    const { userFavouriteShopsIds } = useUserContext();

    useEffect(() => {
        if (user) DataService.getFavourites(user).then((shops) => setShops(shops.data ?? []));
    }, [user]);

    return (
        <TitlePage title="Mis Favoritos">
            <ShopList shops={shops.filter((s) => !s || userFavouriteShopsIds.includes(s.id))}></ShopList>
        </TitlePage>
    );
}

FavouritesPage.getLayout = privatePageLayout

export default FavouritesPage

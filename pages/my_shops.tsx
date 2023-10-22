import { useEffect, useState } from "react";
import { privatePageLayout } from "../helpers/privatePageLayout";
import { Shop, ShopTags } from "../models";
import { NextPageWithLayout } from "./_app";
import { DataService } from "../lib/data";
import ShopList from "../components/shopList";
import { useUser } from "@supabase/auth-helpers-react";
import TitlePage from "../components/titlePage";

const MyShopsPage: NextPageWithLayout = () => {

    const [shops, setShops] = useState<(ShopTags | null)[]>([null, null, null]);
    const user = useUser();

    useEffect(() => {
        if (user) DataService.getShopsByOwner(user).then((shops) => setShops(shops.data as ShopTags[] ?? []));
    }, [user]);

    return (
        <TitlePage title="Mis comercios">
            <ShopList shops={shops}></ShopList>
        </TitlePage>
    );
}

MyShopsPage.getLayout = privatePageLayout

export default MyShopsPage

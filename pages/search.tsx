import { useEffect, useState } from "react";
import { ShopTags } from "../models";
import { DataService } from "../lib/data";
import ShopList from "../components/shopList";
import { useSearchContext, viewsOptions } from "../context/search";
import OverrideHead from "../components/head";
import Box from "@mui/system/Box";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import('../components/map'), {
    ssr: false,
});

const SearchPage = () => {

    const { searchQuery, tags, category, view } = useSearchContext();
    const [shops, setShops] = useState<ShopTags[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isSubscribed = true;
        DataService.searchShops(searchQuery, category, tags).then((shops) => {
            if (isSubscribed) {
                if (shops.error) throw new Error(shops.error.message);
                setShops(shops.data as ShopTags[] ?? []);
                setLoading(false);
            }
        });
        return () => {
            isSubscribed = false;
        }
    }, [searchQuery, category, tags]);


    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
            <OverrideHead title="Buscar comercios en Honestore" />
            { view == viewsOptions.list ? (
                    <ShopList shops={loading ? new Array(10).fill(null) : shops } />
                ) : (
                    <MapWithNoSSR shops={shops} />
                ) 
            }
        </Box>
    );
}

export default SearchPage

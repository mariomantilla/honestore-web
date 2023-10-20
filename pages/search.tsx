import { useEffect, useState } from "react";
import { ShopTags } from "../models";
import { DataService } from "../lib/data";
import ShopList from "../components/shopList";
import { useSearchContext, viewsOptions } from "../context/search";
import OverrideHead from "../components/head";
import List from "@mui/icons-material/List";
import Map from "@mui/icons-material/Map";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Center from "../components/center";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import('../components/map'), {
    ssr: false,
});

const SearchPage = () => {

    const { searchQuery, tags, category, view, updateParams } = useSearchContext();
    const [shops, setShops] = useState<ShopTags[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isSubscribed = true;
        DataService.searchShops(searchQuery, category, tags).then((shops) => {
            if (isSubscribed) {
                setShops(shops.data ?? []);
                setLoading(false);
            }
        });
        return () => {
            isSubscribed = false;
        }
    }, [searchQuery, category, tags]);


    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
            <OverrideHead title="Buscar tiendas en Honestore" />
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

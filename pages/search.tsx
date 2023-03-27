import { useEffect, useState } from "react";
import { Shop } from "../models";
import { DataService } from "../lib/data";
import ShopList from "../components/shopList";
import { useSearchContext } from "../context/search";
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

    const [loading, setLoading] = useState(true);
    const [shops, setShops] = useState<Shop[]>([]);
    const [tab, setTab] = useState<"list" | "map">('list');
    const { searchQuery } = useSearchContext();

    useEffect(() => {
        DataService.searchShops(searchQuery).then((shops) => {
            setShops(shops.data ?? []);
            setLoading(false);
        });
    }, [searchQuery]);

    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
            <OverrideHead title="Buscar tiendas en Honestore" />
            <Center>
                <ToggleButtonGroup
                    value={tab}
                    exclusive
                    onChange={(a, b) => { setTab(b) }}
                    aria-label="vista de tiendas"
                >
                    <ToggleButton value="list" aria-label="mostrar lista" sx={{gap: 1}}>
                        <List />
                        <Typography sx={{textTransform: "none"}}>Lista</Typography>
                    </ToggleButton>
                    <ToggleButton value="map" aria-label="mostrar mapa" sx={{gap: 1}}>
                        <Map />
                        <Typography sx={{textTransform: "none"}}>Mapa</Typography>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Center>
            {tab == 'list' ? (
                <ShopList shops={loading ? new Array(10).fill(null) : shops } />
            ) : (
                <MapWithNoSSR shops={shops} />
            ) }
            
        </Box>
    );
}

export default SearchPage

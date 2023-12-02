import { useEffect, useState } from "react";
import { ShopTags } from "../models";
import { DataService } from "../lib/data";
import ShopList from "../components/shopList";
import { useSearchContext, viewsOptions } from "../context/search";
import OverrideHead from "../components/head";
import Box from "@mui/system/Box";
import dynamic from "next/dynamic";
import { Container, Typography } from "@mui/material";

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

    const desc = `Localiza comercios, tiendas y restaurantes sostenibles cerca de ti en un mapa interactivo,
                explora por categorías y filtra según tus valores. Conecta con negocios que comparten tu
                compromiso con la sostenibilidad.`

    return (<>
        <OverrideHead title="Encuentra comercios, tiendas y restaurantes sotenibles en Honestore" description={desc} />
        <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
            { loading ? 
            <Container maxWidth="md">
                <Typography variant="subtitle1" sx={{textAlign: "center"}}>{desc}</Typography>
            </Container> : null }
            { view == viewsOptions.list ? (
                    <ShopList shops={loading ? new Array(10).fill(null) : shops } />
                ) : (
                    <MapWithNoSSR shops={shops} />
                ) 
            }
        </Box>
    </>);
}

export default SearchPage

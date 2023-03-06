import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { privatePageLayout } from "../helpers/privatePageLayout";
import { supabase } from "../lib/supabaseClient";
import Shop from "../models";
import { NextPageWithLayout } from "./_app";
import Avatar from "@mui/material/Avatar";
import { getShopLogo } from "../lib/data";
import Divider from "@mui/material/Divider";
import Link from "next/link";

const FavouritesPage: NextPageWithLayout = () => {

    const [shops, setShops] = useState<Shop[]>([]);

    useEffect(() => {
        supabase.from('shops').select('*').then((shops) => setShops(shops.data ?? []));
    });

    return (
        <>
            <Typography variant="h1" component="h1">Mis Favoritos</Typography>
            <Divider />
            <Grid container spacing={2} sx={{justifyContent: "center"}}>
                {shops.map((shop) => (
                    <Grid xs={6} md={4} lg={3} key={shop.id} sx={{display: "flex", flexDirection: "column", alignItems: "center", minWidth: "256px", borderBottom: "1px solid #eee", marginTop: "0.8rem"}}>
                        <Link href={'/shops/'+shop.id}><Avatar alt={shop.name ?? ''} src={getShopLogo(shop)} sx={{ height: 256, width: 256 }} /></Link>
                        <Typography gutterBottom component="div" sx={{textAlign: "center", marginTop: "0.5rem", marginBottom: "0.3rem", fontSize: "18px"}}><Link href={'/shops/'+shop.id}>{shop.name}</Link></Typography>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

FavouritesPage.getLayout = privatePageLayout

export default FavouritesPage

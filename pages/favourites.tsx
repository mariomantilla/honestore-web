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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const FavouritesPage: NextPageWithLayout = () => {

    const [shops, setShops] = useState<Shop[]>([]);

    useEffect(() => {
        supabase.from('shops').select('*').then((shops) => setShops(shops.data ?? []));
    });

    return (
        <>
            <Typography variant="h1" component="h1">Mis Favoritos</Typography>
            <Divider />
            <Grid container spacing={1.5} sx={{ justifyContent: "center", marginTop: "0.5rem" }}>
                {shops.map((shop) => (
                    <Grid xs={12} sm={6} md={4} lg={3} key={shop.id} sx={{ minWidth: "256px" }}>
                        <Card elevation={4}>
                            <Link href={'/shops/' + shop.id}>
                                <CardMedia
                                    component="img"
                                    height="256"
                                    width="256"
                                    image={getShopLogo(shop)}
                                    alt={shop.name ?? ''}
                                />
                            </Link>
                            <CardContent sx={{height: "10rem", overflow: "hidden"}}>
                                <Typography component="div"><Link href={'/shops/' + shop.id}>{shop.name}</Link></Typography>
                                <Typography variant="body2" color="text.secondary">
                                    This impressive paella is a perfect party dish and a fun meal to cook
                                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                                    if you like.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

FavouritesPage.getLayout = privatePageLayout

export default FavouritesPage

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Shop from '../models/Shop';
import Instagram from '@mui/icons-material/Instagram';
import Phone from '@mui/icons-material/Phone';
import Language from '@mui/icons-material/Language';
import Email from '@mui/icons-material/Email';
import Map from '@mui/icons-material/Map';

import ShopExternalAction from './shopExternalAction';

export default function ShopCard(props: { shop: Shop | null }) {
    const shop = props.shop;
    const logoUrl = shop ? `https://tbhtpkmrwtznqzsjlfmo.supabase.co/storage/v1/object/public/shops-content/${shop.logo}.jpg` : '';

    let actions: React.ReactNode[] = [];

    if (shop) {
        if (shop.instagram) {
            let url: string = `https://instagram.com/${shop.instagram}`;
            actions.push(
                <ShopExternalAction title="Ir a Instagram" url={url} key="instagram"><Instagram color='primary' /></ShopExternalAction>
            )
        }
        if (shop.phone) {
            let url: string = `tel:${shop.phone}`;
            actions.push(
                <ShopExternalAction title="Llamar" url={url} key="phone"><Phone color='primary' /></ShopExternalAction>
            )
        }
        if (shop.web) {
            actions.push(
                <ShopExternalAction title="Ir a la web" url={shop.web} key="web"><Language color='primary' /></ShopExternalAction>
            )
        }
        if (shop.email) {
            let url: string = `mailto:${shop.email}`;
            actions.push(
                <ShopExternalAction title="Escribir email" url={url} key="email"><Email color='primary' /></ShopExternalAction>
            )
        }
        if (shop.location_coordinates) {
            let url: string = `https://www.google.com/maps/search/?api=1&query=${shop.location_coordinates.replace(' ', ',')}`;
            actions.push(
                <ShopExternalAction title="Abrir mapa" url={url} key="map"><Map color='primary' /></ShopExternalAction>
            )
        }
    }

    return (
        <Card sx={{ display: "flex" }}>
            <CardMedia sx={{ padding: 2 }}>
                {shop ? (
                    <Avatar alt={shop.name} src={logoUrl} sx={{ height: 128, width: 128 }} />
                ) : (
                    <Skeleton variant='circular' height={128} width={128} />
                )}
            </CardMedia>
            <CardContent sx={{ width: '100%' }}>
                <Typography gutterBottom variant="h5" component="div">
                    {shop ? shop.name : (
                        <Skeleton width={200} />
                    )}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontWeight="bold" sx={{ marginBottom: "10px" }}>{shop ? shop.address : (
                    <Skeleton />
                )}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-wrap" }}>{shop ? shop.description : (
                    <Skeleton />
                )}</Typography>
                <Box sx={{ marginTop: "10px", display: { md: "flex", xs: "none" }, gap: ".75em" }}>
                {actions}
            </Box>
            </CardContent>
            <Box sx={{ margin: "20px 20px", display: { md: "none", xs: "flex" }, gap: ".75em", flexDirection: "column" }}>
                {actions}
            </Box>
        </Card>
    );
}
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Shop from '../models';
import Instagram from '@mui/icons-material/Instagram';
import Phone from '@mui/icons-material/Phone';
import Language from '@mui/icons-material/Language';
import Email from '@mui/icons-material/Email';
import Map from '@mui/icons-material/Map';

import ShopExternalAction from './shopExternalAction';
import Link from 'next/link';
import Chip from '@mui/material/Chip';
import { LocationOff } from '@mui/icons-material';

export default function ShopCard({shop, listView = false}: { shop: Shop | null, listView?: boolean }) {
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
        if (shop.location_coordinates && !shop.online) {
            let url: string = `https://www.google.com/maps/search/?api=1&query=${shop.location_coordinates.replace(' ', ',')}`;
            actions.push(
                <ShopExternalAction title="Abrir mapa" url={url} key="map"><Map color='primary' /></ShopExternalAction>
            )
        }
    }

    const clampStyles = {
        maxHeight: "8.58em",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: 6,
        lineClamp: 2,
        WebkitBoxOrient: "vertical",
        whiteSpace: "pre-wrap"
    }

    const onlineChip = shop && shop.online ? (
        <Chip icon={<LocationOff />} label="Solo online" />
    ) : '' ;

    return (
        <Card sx={{ display: "flex", flexDirection: {xs: "column", sm: "row"}}}>
            <CardMedia sx={{ padding: 2, justifyContent: "center", display: "flex" }}>
                {shop ? (
                    <Avatar alt={shop.name} src={logoUrl} sx={{ height: 128, width: 128 }} />
                ) : (
                    <Skeleton variant='circular' height={128} width={128} />
                )}
            </CardMedia>
            <CardContent sx={{ width: '100%' }}>
                <Typography gutterBottom variant="h5" component="div">
                    {shop ? (
                        <Box sx={{display: "flex", gap: 2}}><Link href={'/shops/'+shop.id}>{shop.name}</Link>{onlineChip}</Box>
                    ) : (
                        <Skeleton width={200} />
                    )}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontWeight="bold" sx={{ marginBottom: "10px" }}>{shop ? shop.address : (
                    <Skeleton />
                )}</Typography>
                <Typography variant="body2" color="text.secondary" sx={ listView ? clampStyles : { whiteSpace: "pre-wrap" }}>{shop ? shop.description : (
                    <Skeleton />
                )}</Typography>
                <Box sx={{ marginTop: "10px", display: { md: "flex", xs: "none" }, gap: ".75em" }}>
                {actions}
            </Box>
            </CardContent>
            <Box sx={{ margin: "20px 20px", display: { md: "none", xs: "flex" }, gap: ".75em", flexDirection: {sm: "column"}, justifyContent: "center" }}>
                {actions}
            </Box>
        </Card>
    );
}
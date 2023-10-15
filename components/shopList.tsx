import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import ShopCard from './shopCard';
import { Shop, ShopTags } from '../models';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import logoSad from '../public/logo-sad.png'

export default function ShopList(props: { shops: (ShopTags|null)[] }) {
    return (
        <Grid container spacing={1.5}>
            { props.shops.length ? props.shops.map((shop, i) => (
                <Grid xs={12} sm={12} md={6} lg={6} key={i}>
                    <ShopCard shop={shop}></ShopCard>
                </Grid>
            )) : (
                <Grid xs={12} sx={{textAlign: "center"}}>
                    <Image src={logoSad} width={150} alt="No hay resultados" />
                    <Typography variant="body1">No hay resultados</Typography>
                </Grid>
            )}
        </Grid>
    );
}

ShopList.defaultProps = { shops: [], onlyFavs: false};
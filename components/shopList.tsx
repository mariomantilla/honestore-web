import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import ShopCard from './shopCard';
import Shop from '../models';

export default function ShopList(props: { shops: (Shop|null)[] }) {
    return (
        <Grid container spacing={1.5}>
            {props.shops.map((shop, i) => (
                <Grid xs={12} sm={6} md={4} lg={3} key={i} sx={{ minWidth: "256px" }}>
                    <ShopCard shop={shop}></ShopCard>
                </Grid>
            ))}
        </Grid>
    );
}

ShopList.defaultProps = { shops: [], onlyFavs: false};
import * as React from 'react';
import Grid from '@mui/material/Grid';
import ShopCard from './shopCard';
import Box from '@mui/material/Box';
import Shop from '../models';

export default function AlignItemsList(props: { shops: Shop[] | null }) {
    const shops = props.shops ?? new Array(10).fill(null);
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container rowSpacing={2} sx={{marginTop: "2em"}}>
                {!shops ? (
                    <div>No data</div>
                ) : shops.map((shop: Shop | null, i: number) => (
                    <Grid item xs={12} key={i}>
                        <ShopCard shop={shop} listView={true} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
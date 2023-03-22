import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { DataService } from "../lib/data";
import { Shop } from "../models";
import ShopList from "./shopList";

export default function NewShops({ children, ...props }: BoxProps) {

    const [shops, setShops] = useState<(Shop | null)[]>(new Array(12).fill(null));

    useEffect(() => {
        DataService.newShops().then((resp) => setShops(resp.data ?? []));
    }, []);

    props.sx = {
        ...{ display: "flex", flexDirection: "column", gap: 2.5 },
        ...props.sx
    }

    return (
        <Box {...props}>
            <Typography variant='h3'>Novedades</Typography>
            <ShopList shops={shops}></ShopList>
        </Box>
    );

}
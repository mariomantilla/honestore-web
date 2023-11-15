import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { DataService } from "../lib/data";
import { Category } from "../models";
import Skeleton from "@mui/material/Skeleton";
import Link from "next/link";
import bath from "../resources/categories/bath.svg"
import food from "../resources/categories/food.svg"
import shirt from "../resources/categories/shirt.svg"
import waiter from "../resources/categories/waiter.svg"
import Image from "next/image"

const icons: { [key: number]: any} = {
    1: food,
    2: shirt,
    3: waiter,
    4: bath
}


export default function Categories({ children, ...props }: BoxProps) {

    const [categories, setCategories] = useState<(Category | null)[]>(new Array(3).fill(null));

    useEffect(() => {
        DataService.getCategories().then((resp) => setCategories(resp.data ?? []));
    }, []);

    props.sx = {
        ...{ display: "flex", flexDirection: "column", gap: 0, paddingTop: 3 },
        ...props.sx
    }
    
    return (
        <Box {...props}>
            <Typography variant='h2' sx={{textAlign: "center"}}>Explora por categorias</Typography>
            <Box sx={{display: "flex", gap: 5, padding: 2, paddingTop: 0, justifyContent: "space-evenly", flexWrap: "wrap"}}>
                {categories.map((c, i) => (
                    <Box key={i} sx={{display: "flex", flexDirection: "column", alignItems: "center", gap:1}}>
                        <Box sx={{padding: 2}}>
                            {c? (
                                <Link href={`/search?category=${c.id}`}>
                                    <Image src={icons[c.id]} alt={c.name} width={90} />
                                </Link>
                            ):<Skeleton variant="circular" width="90px" height="90px" />}
                        </Box>
                        {c? (
                                <Link href={`/search?category=${c.id}`}>
                                    <Typography sx={{fontSize: 18}}>{c?.name}</Typography>
                                </Link>
                        ):<Skeleton width="200px" height={"18px"} />}
                    </Box>
                ))}
            </Box>
        </Box>
    );

}
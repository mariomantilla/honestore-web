import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { DataService } from "../lib/data";
import { Category } from "../models";
import { IKImage } from "imagekitio-react";
import Skeleton from "@mui/material/Skeleton";


export default function Categories({ children, ...props }: BoxProps) {

    const [categories, setCategories] = useState<(Category | null)[]>(new Array(3).fill(null));

    useEffect(() => {
        DataService.getCategories().then((resp) => setCategories(resp.data ?? []));
    }, []);

    props.sx = {
        ...{ display: "flex", flexDirection: "column", gap: 2.5, paddingTop: 3 },
        ...props.sx
    }
    
    return (
        <Box {...props}>
            <Typography variant='h3' sx={{textAlign: "center"}}>Explora por categorias</Typography>
            <Box sx={{display: "flex", gap: 3, padding: 2, justifyContent: "center", flexWrap: "wrap"}}>
                {categories.map((c, i) => (
                    <Box key={i} sx={{display: "flex", flexDirection: "column", alignItems: "center", gap:1}}>
                        {c ? (
                            <IKImage
                            width={"200"}
                            height={"200"}
                            path={`categories/${c.id}.jpeg`}
                            transformation={[{
                                height: "200",
                                width: "200",
                                dpr: "2"
                            }]}
                            style={{borderRadius: 25}}
                        />
                        ) : (
                            <Skeleton width="250px" height="250px" />
                        ) }
                        <Typography sx={{fontSize: 18}}>{c?.name}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );

}
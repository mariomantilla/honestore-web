import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { DataService } from "../lib/data";
import { Category } from "../models";
import { IKImage } from "imagekitio-react";
import Skeleton from "@mui/material/Skeleton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition, faCookieBite, faShirt, faUtensils, faSoap } from '@fortawesome/free-solid-svg-icons'
import { theme } from "../constants";
import Link from "next/link";
import { useSearchContext } from "../context/search";

const icons: { [key: number]: IconDefinition} = {
    1: faCookieBite,
    2: faShirt,
    3: faUtensils,
    4: faSoap
}


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
            <Box sx={{display: "flex", gap: 5, padding: 2, paddingTop: 0, justifyContent: "space-evenly", flexWrap: "wrap"}}>
                {categories.map((c, i) => (
                    <Box key={i} sx={{display: "flex", flexDirection: "column", alignItems: "center", gap:1}}>
                        {/* {c ? (
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
                        ) } */}
                        <Box sx={{padding: 3}}>
                            {c? (
                                <Link href={`/search?category=${c.id}`}>
                                    <FontAwesomeIcon icon={icons[c.id]} fontSize={60} color={theme.palette.primary.main} />
                                </Link>
                            ):<Skeleton variant="circular" width="60px" height="60px" />}
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
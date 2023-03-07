import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Shop from "../models";

import { DataService } from "../lib/data";
import Skeleton from "@mui/material/Skeleton";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useUserContext } from "../context/userData";
import Tooltip from "@mui/material/Tooltip";
import { useUser } from "@supabase/auth-helpers-react";

const FavButton = ({ shop }: { shop: Shop}) => {
    
    const user = useUser();
    const { userFavouriteShopsIds, addFavourite, removeFavourite } = useUserContext();
    const router = useRouter();
    const isFav = userFavouriteShopsIds.includes(shop.id);

    const handleFavToggle = () => {
        if (!user) { 
            router.push('/login');
            return
        }
        if (isFav) {
            DataService.removeFavourite(user, shop).then((r) => {if (!r.error) removeFavourite(shop.id)});
        }
        else {
            DataService.addFavourite(user, shop).then((r) => {if (!r.error) addFavourite(shop.id)});
        }
    }

    return (
        <Tooltip title={isFav ? "Quitar de favoritos" : "Guardar en favoritos"}>
            <IconButton
                aria-label="añadir o quitar de favoritos"
                onClick={() => { handleFavToggle() }}
            >
                {isFav ? (
                    <Favorite color="primary" />
                ) : (
                    <FavoriteBorder color="primary" />
                ) }            
            </IconButton>
        </Tooltip>
    );
}

const ShopCard = ({ shop }: { shop: Shop | null }) => {

    const maxLines = 3;
    const lineHeight = 1.43;

    const clampStyles = {
        lineHeight: `${lineHeight}rem`,
        height: `${lineHeight * maxLines}rem`,
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: maxLines,
        lineClamp: maxLines,
        WebkitBoxOrient: "vertical",
    }

    return (
        <Card elevation={4}>
            {shop ? (
                <Link href={'/shops/' + shop.id}>
                    <CardMedia
                        component="img"
                        image={DataService.getShopLogo(shop)}
                        alt={shop.name ?? ''}
                        sx={{ height: { xs: "auto", sm: "256px" } }}
                    />
                </Link>
            ) : (
                <Skeleton variant='rectangular' height={256} width={"100%"} />
            )}
            <CardContent>
                <Typography component="div" sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                    {shop ? (
                        <Link href={'/shops/' + shop.id}>{shop.name}</Link>
                    ) : (
                        <Skeleton width="60%" />
                    )}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={clampStyles}>
                    {shop ? shop.description : (
                        <>
                            <Skeleton width="90%" />
                            <Skeleton width="100%" />
                            <Skeleton width="85%" />
                        </>
                    )}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {shop ? (
                    <FavButton shop={shop} />
                ) : (
                    <Skeleton width="20px" />
                ) }
                <Button
                    aria-label="ir a la tienda"
                    sx={{ marginLeft: "auto" }}
                >
                    {shop ? (
                        <Link href={'/shops/' + shop.id}>Ver tienda</Link>
                    ) : (
                        <Skeleton width="40px" />
                    )}
                </Button>
            </CardActions>
        </Card>
    );
}

ShopCard.defaultProps = { shop: null, onlyFavs: false };

export default ShopCard;
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Shop from "../models";

import { DataService } from "../lib/data";
import Skeleton from "@mui/material/Skeleton";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { FavButton } from "./favButton";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";

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
        <Card elevation={2} sx={{borderRadius: 0}}>
            {/* {shop ? (
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
            )} */}
            <CardHeader
                avatar={shop ? (
                    <Avatar
                        sx={{ width: "80px", height: "80px" }}
                        aria-label="información de tienda"
                        src={DataService.getShopLogo(shop)}
                        alt={shop.name??''}
                    />
                ) : (
                    <Skeleton variant='circular' height={80} width={80} />
                )
                }
                action={shop ? (
                    <FavButton shop={shop} />
                ) : (
                    <Skeleton width="20px" />
                )}
                title={shop ? (
                    shop.name??''
                ) : (<Skeleton width="60%" />)}
                // subheader="September 14, 2016"
            />
            <CardContent>
                {/* <Typography component="div" sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                    {shop ? (
                        <Link href={'/shops/' + shop.id}>{shop.name}</Link>
                    ) : (
                        <Skeleton width="60%" />
                    )}
                </Typography> */}
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
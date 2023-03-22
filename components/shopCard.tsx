import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Shop } from "../models";

import Skeleton from "@mui/material/Skeleton";
import { FavButton } from "./favButton";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { IKImage } from "imagekitio-react";

const clampStyles = (lines: number, lineHeight: number = 1.43) => {
    return {
        lineHeight: `${lineHeight}rem`,
        height: `${lineHeight * lines}rem`,
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: lines,
        lineClamp: lines,
        WebkitBoxOrient: "vertical",
    }
}

const ShopCard = ({ shop }: { shop: Shop | null }) => {
    return (
        <Paper elevation={2} square>
            <Box sx={{ display: "flex", flexDirection: "row", columnGap: 2, padding: 1.5 }}>
                <Box sx={{ flexShrink: 0 }}>
                    {shop ? (
                        <Link href={'/shops/' + shop.id}>
                            <Avatar
                                sx={{ width: "120px", height: "120px" }}
                                alt={shop.name ?? ''}
                            >
                                <IKImage
                                    path={`shops/${shop.logo_path}`}
                                    transformation={[{
                                        height: "120px",
                                        width: "120px"
                                    }]}
                                />
                            </Avatar>
                        </Link>
                    ) : (<Skeleton variant='circular' height={120} width={120} />)}
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1.2, flexGrow: 1, minWidth: 0 }}>
                    <Box sx={{ display: "flex" }}>
                        {shop ? (
                            <Typography variant="h4" className="singleLineEllipsis" sx={{ alignSelf: "center", flexGrow: 1 }}><Link href={'/shops/' + shop.id}>{shop.name}</Link></Typography>

                        ) : (<Skeleton width="60%" sx={{ alignSelf: "center", flexGrow: 1 }} />)}
                        {shop ? (<FavButton shop={shop} />) : (<Skeleton width="20px" />)}
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={clampStyles(3)}>
                        {shop ? shop.description ?? '' : (<><Skeleton width="90%" /><Skeleton width="100%" /><Skeleton width="85%" /></>)}
                    </Typography>
                </Box>
            </Box>
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
            {/* <CardHeader
                avatar={shop ? (
                    <Avatar
                        sx={{ width: "80px", height: "80px" }}
                        aria-label="información de tienda"
                        src={DataService.getShopLogo(shop)}
                        alt={shop.name ?? ''}
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
                    shop.name ?? ''
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
            {/* <Typography variant="body2" color="text.secondary" sx={clampStyles(3)}>
                    {shop ? shop.description : (
                        <>
                            <Skeleton width="90%" />
                            <Skeleton width="100%" />
                            <Skeleton width="85%" />
                        </>
                    )}
                </Typography>
            </CardContent> */}
        </Paper>
    );
}

ShopCard.defaultProps = { shop: null, onlyFavs: false };

export default ShopCard;
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { ShopTags, Tag } from "../models";

import Skeleton from "@mui/material/Skeleton";
import { FavButton } from "./favButton";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { clampStyles } from "../helpers/lineClamp";
import TagChip from "./tagChip";
import { ShopLogo } from "./shopLogo";

const ShopCard = ({ shop }: { shop: ShopTags | null }) => {

	const tagsChips = shop && Array.isArray(shop.tags) ?
		shop.tags.map((t: Tag, i: number) => (
			<TagChip key={i} tag={t} tiny />
		))
	: [] ;

    return (
        <Paper elevation={2} sx={{display: "flex", flexDirection: "column", height: "100%"}}>
            <Box sx={{ display: "flex", flexDirection: "row", columnGap: 2, padding: 1.5, paddingBottom: 0 }}>
                <Box sx={{ flexShrink: 0, display: {xs: "none", sm: "block"} }}>
                    {shop ? (
                        <Link href={'/shops/' + shop.slug} aria-label={`Ver más sobre el comercio "${shop.name??''}"`}>
                            <Avatar
                                sx={{ width: "120px", height: "120px", backgroundColor: '#fff' }}
                                alt={shop.name ?? ''}
                            >
                                <ShopLogo shop={shop} size={120} />
                            </Avatar>
                        </Link>
                    ) : (<Skeleton variant='circular' height={120} width={120} />)}
                </Box>
                <Box sx={{ flexShrink: 0, display: {xs: "block", sm: "none"} }}>
                    {shop ? (
                        <Link href={'/shops/' + shop.slug} aria-label={`Ver más sobre el comercio "${shop.name??''}"`}>
                            <Avatar
                                sx={{ width: "60px", height: "60px", backgroundColor: '#fff' }}
                                alt={shop.name ?? ''}
                            >
                                <ShopLogo shop={shop} size={60} />
                            </Avatar>
                        </Link>
                    ) : (<Skeleton variant='circular' height={120} width={120} />)}
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", rowGap: 0, flexGrow: 1, minWidth: 0 }}>
                    <Box sx={{ display: "flex" }}>
                        {shop ? (
                            <Typography variant="h3" className="singleLineEllipsis" sx={{ alignSelf: "center", flexGrow: 1, fontSize: 18 }}><Link href={'/shops/' + shop.slug}>{shop.name}</Link></Typography>

                        ) : (<Skeleton width="60%" sx={{ alignSelf: "center", flexGrow: 1 }} />)}
                        {shop ? (<FavButton shop={shop} />) : (<Skeleton width="20px" />)}
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={clampStyles(3)}>
                        {shop ? shop.description ?? '' : (<><Skeleton width="90%" /><Skeleton width="100%" /><Skeleton width="85%" /></>)}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                padding: 1.5,
                justifyContent: "center",
                gap: 1,
                overflow: "hidden",
                flexWrap: "wrap-reverse",
                maxHeight: "3.2rem"
             }}>
                {tagsChips}
            </Box>
        </Paper>
    );
}

ShopCard.defaultProps = { shop: null, onlyFavs: false };

export default ShopCard;
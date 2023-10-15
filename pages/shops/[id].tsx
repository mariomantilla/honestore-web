import { CommentUser, Profile, Shop, ShopTags, Tag } from "../../models";
import { DataService, getShop, getShopBySlug } from "../../lib/data";
import Head from "next/head";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Instagram from '@mui/icons-material/Instagram';
import Phone from '@mui/icons-material/Phone';
import Language from '@mui/icons-material/Language';
import Email from '@mui/icons-material/Email';
import Map from '@mui/icons-material/Map';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
import Add from '@mui/icons-material/Add';
import Cancel from '@mui/icons-material/Cancel';
import ShopExternalAction from '../../components/shopExternalAction';
import LocationOff from '@mui/icons-material/LocationOff';
import NewShops from "../../components/newShops";
import banner from '../../public/banner-inverted.png'
import Image from 'next/image'
import Link from "next/link";
import Button from "@mui/material/Button";
import { FavButton } from "../../components/favButton";
import { IKImage } from "imagekitio-react";
import WhatsApp from "@mui/icons-material/WhatsApp";
import dynamic from "next/dynamic";
import Alert from "@mui/material/Alert";
import Center from "../../components/center";
import { useUserContext } from "../../context/userData";
import { User, useUser } from "@supabase/auth-helpers-react";
import { BASE_URL, theme } from "../../constants";
import Tooltip from "@mui/material/Tooltip";
import TagChip from "../../components/tagChip";
import { clampStyles } from "../../helpers/lineClamp";
import { useCallback, useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import { CardActions, CardContent, IconButton, Skeleton, TextField } from "@mui/material";
import { localDate } from "../../helpers/datetime";
import UserAvatar from "../../components/userAvatar";


export async function getStaticPaths() {
	let shopsRequest = await DataService.getAllShops();
	let shops: Shop[] = shopsRequest.data ?? [];
	return {
		paths: shops.map((s) => `/shops/${s.slug}`),
		fallback: true, // can also be true or 'blocking'
	}
}

export async function getStaticProps({ params }: { params: { id: string } }) {
	let shop = await getShopBySlug(params.id);
	if (!shop) {
		return {
			notFound: true,
		}
	}
	return {
		props: {
			shop: shop
		},

	}
}

const MapWithNoSSR = dynamic(() => import('../../components/map'), {
	ssr: false,
});

const OwnerEditSection = ({ shop }: { shop: Shop }) => {

	const user = useUser();
	const { profile } = useUserContext();

	let claimAlert = !shop.owner ? (
		<Alert severity="info" sx={{ maxWidth: "700px" }}>
			La información sobre esta tienda ha sido recopilada de fuentes públicas y podría ser errónea. El logo puede tener derechos de
			autor y/o licencias asociadas y solo se indica como distintivo de la marca sin que implique en ningun tipo de vinculación 
			con la plataforma.
			{' '}<b>¿Es tu tienda?</b> <Link href={`/shops/${shop.id}/claim`}>Reclámala</Link> y podrás editar y ampliar la información.
		</Alert>
	) : null;

	let editButton = ((shop.owner && shop.owner == user?.id) || profile?.role == 'admin') ? (
		<Button variant="contained" href={`/shops/${shop.id}/edit`}>Gestionar tienda</Button>
	) : null ;

	return <Center sx={{gap:2}}>
		{claimAlert}
		{editButton}
	</Center>;

}

const ViewMoreText = ({ text, lines, fontSize = "1rem" }: { text: string | null, lines: number, fontSize?: number | string }) => {

	const [open, setOpen] = useState(false);
	const elementRef = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	const checkVisible = () => {
		if (elementRef && elementRef.current) {
			setVisible(elementRef.current.scrollHeight > elementRef.current.clientHeight);
		}
	}

	useEffect(() => {
		checkVisible();
    }, [text, lines, fontSize]);

	return (
		<Box sx={{display: "flex", gap: 1, flexDirection: "column"}}>
			<Typography sx={Object.assign(open ? clampStyles(60) : clampStyles(lines), {fontSize: fontSize})} ref={elementRef}>{text}</Typography>
			{ visible ? (open ? 
			<i className="viewMore" onClick={() => {setOpen(false)}} style={{alignSelf: "flex-end"}}>Leer menos</i> 
			:  <i className="viewMore" onClick={() => {setOpen(true)}} style={{alignSelf: "flex-end"}}>Leer más</i> 
			) : '' }
		</Box>
	);

}

const CommentCard = ({comment}: {comment: CommentUser | null}) => {

	const user = comment?.user as Profile | null;
	const [deleted, setDeleted] = useState(false);
    const viewingUser = useUser();

	const handleDelete = () => {
		if (comment) {
			DataService.removeComment(comment).then((r) => {
				if (!r.error) setDeleted(true);
			});
		}
	}

	return (
		<Card sx={{width: "400px", maxWidth: "80vw", display: deleted ? 'none' : 'unset'}}>
			<CardActions sx={{borderTop: "1px solid #eee"}}>
				<Box sx={{padding: 1, display: "flex", gap: 2, width: "100%"}}>
					{ comment ? (
						<UserAvatar uuid={user?.id} size={38} />
					) : (<Skeleton variant="circular" width={40} height={40} />) }
					<Box sx={{display: "flex", flexDirection: "column", flexGrow: "1"}}>
						{ comment ? (<b>{user?.name}</b>) : (<Skeleton sx={{width: "200px", maxWidth: "50vw"}} />) }
						{ comment?.updated_at ? (<i>{localDate(new Date(comment?.updated_at), false)}</i>) : (<Skeleton sx={{width: "100px", maxWidth: "50vw"}} />) }
					</Box>
					{ viewingUser && user && viewingUser.id == user.id ? (
						<IconButton onClick={handleDelete}>
							<Cancel />
						</IconButton>
					) : '' }
				</Box>
			</CardActions>
			<CardContent sx={{paddingTop: "0"}}>
				{ comment ? (
					<ViewMoreText text={comment?.text} lines={4} fontSize={"0.9rem"} />
				) : (
					<>
						<Skeleton />
						<Skeleton />
						<Skeleton width="60%" />
					</>
				) }
			</CardContent>
		</Card>
	)
}

const AddComment = ({shop, callback}: {shop: Shop, callback: Function}) => {

	const [comment, setComment] = useState('');
	const [open, setOpen] = useState(false);
    const router = useRouter();
    const user = useUser();

	const addComment = () => {
		if (user) {
			DataService.addComment(comment, shop, user).then(() => {
				setComment('');
				callback();
				setOpen(false)
			});
		}
	}

	return (
		<Box sx={{display: "flex", justifyContent: "center"}}>
			{ open ? (
				<Box sx={{display: "flex", flexDirection: "column", gap: 2, width: "500px"}}>
					<TextField
						variant="filled"
						multiline
						minRows={4}
						label="Deja una opinión"
						placeholder="¿Conoces este comercio? Ayuda a otros usuarios con tu opinión"
						fullWidth
						value={comment}
						onChange={(event) => {
							setComment(event.target.value);
						}}
					/>
					<Button variant="contained" onClick={addComment}>Enviar</Button>
				</Box>
			) : (
				<Box>
					<Button variant="contained" onClick={() => {user ? setOpen(true) : router.push('/login') }} startIcon={<Add />}>Dejar Opinión</Button>
				</Box>
			) }
		</Box>
	);
}

const CommentCarrousel = ({comments}: {comments: (CommentUser | null)[]}) => {

	const [showLeft, setShowLeft] = useState(false);
	const [showRight, setShowRight] = useState(false);
	const elementRef = useRef<HTMLDivElement>(null);


	const handleScroll = (step: number) => {
		if (elementRef && elementRef.current) {
			elementRef.current.scrollLeft += step;
		}
	}

	const checkScroll = () => {
		if (elementRef && elementRef.current) {
			setShowLeft(elementRef.current.scrollLeft >= 5);
			setShowRight(elementRef.current.scrollLeft+5 <= elementRef.current.scrollWidth-elementRef.current.offsetWidth);
		}
	}

	useEffect(() => {
        checkScroll();
    }, [comments]);

	return (
		<Box sx={{overflowX: "scroll", padding: "5px", display: "flex", scrollBehavior: "smooth"}} className="noscrollbar" ref={elementRef} onScroll={checkScroll}>
			<Box sx={{
				flex: 1, position: "sticky", zIndex: 1,
				background: "linear-gradient(90deg, #ffffff, 50%, transparent)",
				left: "-5px", display: "flex", alignItems: "center",
				visibility: showLeft ? "visible" : "hidden", width: "100px"
			}}>
				<IconButton onClick={() => handleScroll(-400)}>
					<ArrowBackIosNew />
				</IconButton>
			</Box>
			<Box sx={{display: "flex", gap: 2, width: "max-content", margin: "0 -35px"}}>
				{comments.map((c, i) => (
					<CommentCard key={i} comment={c} />
				))}
				{comments.length == 0 ? (
					<Box sx={{display: "flex", alignItems: "center", height: "100px"}}>Aún no hay opiniones</Box>
				) : ''}
			</Box>
			<Box sx={{
				flex: 1, position: "sticky",
				background: "linear-gradient(90deg, transparent, 50%, #ffffff)",
				right: "-5px", display: "flex", alignItems: "center",
				visibility: showRight && comments.length ? "visible" : "hidden"}}>
				<IconButton onClick={() => handleScroll(400)}>
					<ArrowForwardIos />
				</IconButton>
			</Box>
		</Box>
	);
}

const FavsDisplay = ({shop}: {shop: Shop}) => {

	const [favCount, setFavCount] = useState<number>(0);
	const updateFavs = (isFav: boolean) => {
		setFavCount(favCount+1*(isFav ? 1 : -1))
	}

	useEffect(() => {
        DataService.getFavCount(shop).then(({data}) => {
			setFavCount((data?.[0].count as number | null) || 0);
		});
    }, [shop]);

	return (
		<Box sx={{display: "flex", alignItems: "center", gap: 0.5}}>
			<FavButton shop={shop} callback={updateFavs} />
			<b>{favCount}</b>
			<span>favoritos</span>
		</Box>
	)
}

export default function ShopPage({ shop }: { shop: ShopTags }) {

	const router = useRouter();
	const [comments, setComments] = useState<(CommentUser | null)[]>([null, null, null]);

	const updateComments = useCallback(() => {
		DataService.getComments(shop).then(({data}) => {
			setComments(data??[]);
		});
	  }, [shop]);

	useEffect(() => {
        updateComments();
    }, [updateComments]);

	if (router.isFallback) {
		return <Container sx={{ textAlign: "center" }}><CircularProgress /></Container>
	}

	let actions: React.ReactNode[] = [];

	if (shop.instagram) {
		let url: string = `https://instagram.com/${shop.instagram}`;
		actions.push(
			<ShopExternalAction title="Ir a Instagram" url={url} key="instagram"><Instagram color='primary' /></ShopExternalAction>
		)
	}
	if (shop.phone) {
		let url: string = `tel:${shop.phone}`;
		actions.push(
			<ShopExternalAction title="Llamar" url={url} key="phone"><Phone color='primary' /></ShopExternalAction>
		)
	}
	if (shop.web) {
		actions.push(
			<ShopExternalAction title="Ir a la web" url={shop.web} key="web"><Language color='primary' /></ShopExternalAction>
		)
	}
	if (shop.email) {
		let url: string = `mailto:${shop.email}`;
		actions.push(
			<ShopExternalAction title="Escribir email" url={url} key="email"><Email color='primary' /></ShopExternalAction>
		)
	}
	if (shop.location_coordinates && !shop.online) {
		let url: string = `https://www.google.com/maps/search/?api=1&query=${shop.location_coordinates.replace(' ', ',')}`;
		actions.push(
			<ShopExternalAction title="Abrir mapa" url={url} key="map"><Map color='primary' /></ShopExternalAction>
		)
	}

	if (shop.whatsapp) {
		let url: string = `https://wa.me/${shop.whatsapp}`;
		actions.push(
			<ShopExternalAction title="Abrir WhatsApp" url={url} key="whatsapp"><WhatsApp color='primary' /></ShopExternalAction>
		)
	}

	const onlineChip = shop && shop.online ? (
		<Tooltip title="Solo online">
			<LocationOff color="primary" />
		</Tooltip>
	) : '';

	const tagsChips = shop && Array.isArray(shop.tags) ?
		shop.tags.map((t: Tag, i: number) => (
			<TagChip key={i} name={t.name} description={t.description} />
		))
	: [] ;

	const canonicalUrl = `${BASE_URL}/shops/${shop.slug}`;

	return (
		<>
			<Head>
				<title>{shop.name + " en Honestore"}</title>
				<meta name="description" content={shop.description ?? ''} />
				<meta key="meta-og-title" property="og:title" content={shop.name + " en Honestore"} />
				<meta key="meta-og-desc" property="og:description" content={shop.description ?? ''} />
				<link href={canonicalUrl} rel="canonical" key="head-canonical" />
			</Head>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
				<Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", sm: "row" }, padding: 2 }}>
					<Box sx={{ display: "flex", gap: 3, flexDirection: "column", flexBasis: 0 }}>
						<Avatar alt={shop.name ?? ''} sx={{ height: 200, width: 200, border: "1px solid #ccc", alignSelf: { xs: "center", sm: "inherit" } }}>
							<IKImage
								width={"200"}
								height={"200"}
								path={`shops/${shop.logo_path}`}
								transformation={[{
									height: "200",
									width: "200",
									dpr: "2"
								}]}
							/>
						</Avatar>
						<OwnerEditSection shop={shop} />
						<Box sx={{ display: "flex", gap: 1, alignItems: "baseline", flexWrap: "wrap", justifyContent: "center" }}>
							{tagsChips}
						</Box>
					</Box>
					<Box sx={{ display: "flex", gap: 2, flexDirection: "column", flexGrow: 1 }}>
						<Box sx={{ display: "flex", flexWrap: "wrap" }}>
							<Typography variant="h1" component="h1" sx={{ marginBottom: 0, flexGrow: 1, textAlign: "left" }}>{shop.name}</Typography>
							<FavsDisplay shop={shop} />
						</Box>
						{shop.address ? (<Typography variant="body2" color="text.secondary" fontWeight="bold">{shop.address}</Typography>) : ''}
						<Box sx={{ display: "flex", gap: 2.5, alignItems: "baseline", flexWrap: "wrap" }}>
							{actions}
							{onlineChip}
						</Box>
						<Divider />
						<ViewMoreText text={shop.description} lines={6} />
					</Box>
				</Box>
				<Divider />
				<CommentCarrousel comments={comments} />
				<Divider />
				<AddComment shop={shop} callback={updateComments}></AddComment>
				<Divider />
				{shop.online ? null : (<>
					<MapWithNoSSR shops={[shop]} center={DataService.shopCoordinates(shop)} locate={false} />
					<Divider />
				</>) }
				<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap" }}>
					<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
						<Image
							src={banner}
							width={300}
							priority
							alt="Honestore, La comunidad de activistas del consumo ético" style={{ maxWidth: "100%", height: "auto" }}
						/>
						<Typography sx={{ padding: "0.5rem 0.8rem", fontWeight: "bold", textAlign: "center" }}>La comunidad de activistas del consumo ético</Typography>
					</Box>
					<Button href="/about" LinkComponent={Link} variant="contained" sx={{ textAlign: "center" }}>
						Descubrir más sobre Honestore
					</Button>
				</Box>
				<Divider />
				<NewShops />
			</Box>
		</>
	);
}

import { Shop } from "../../models";
import { DataService, getShop, getShopsIds } from "../../lib/data";
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
import ShopExternalAction from '../../components/shopExternalAction';
import LocationOff from '@mui/icons-material/LocationOff';
import Chip from "@mui/material/Chip";
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
import { useUser } from "@supabase/auth-helpers-react";


export async function getStaticPaths() {
	let ids: number[] = await getShopsIds();
	return {
		paths: ids?.map((sid) => `/shops/${sid}`) ?? [],
		fallback: true, // can also be true or 'blocking'
	}
}

export async function getStaticProps({ params }: { params: { id: number } }) {
	let shop = await getShop(params.id);
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
			La información sobre esta tienda ha sido recopilada de fuentes públicas y podría ser errónea.
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

export default function ShopPage({ shop }: { shop: Shop }) {

	const router = useRouter();

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
			<ShopExternalAction title="Abrir WhatsApp" url={url} key="map"><WhatsApp color='primary' /></ShopExternalAction>
		)
	}

	const onlineChip = shop && shop.online ? (
		<Chip icon={<LocationOff />} label="Solo online" />
	) : '';

	return (
		<>
			<Head>
				<title>{shop.name + " en Honestore"}</title>
				<meta name="description" content={shop.description ?? ''} />
				<meta property="og:title" content={shop.name + " en Honestore"} />
				<meta property="og:description" content={shop.description ?? ''} />
			</Head>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
				<Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", sm: "row" }, padding: 2 }}>
					<Avatar alt={shop.name ?? ''} sx={{ height: 200, width: 200, border: "1px solid #ccc", alignSelf: { xs: "center", sm: "inherit" } }}>
						<IKImage
							path={`shops/${shop.logo_path}`}
							transformation={[{
								height: "200px",
								width: "200px"
							}]}
						/>
					</Avatar>
					<Box sx={{ display: "flex", gap: 2, flexDirection: "column", flexGrow: 1 }}>
						<Box sx={{ display: "flex" }}>
							<Typography variant="h1" component="h1" sx={{ marginBottom: 0, flexGrow: 1, textAlign: "left" }}>{shop.name}</Typography>
							<FavButton shop={shop} />
						</Box>
						{shop.address ? (<Typography variant="body2" color="text.secondary" fontWeight="bold">{shop.address}</Typography>) : ''}
						<Box sx={{ display: "flex", gap: 2.5, alignItems: "baseline", flexGrap: "wrap" }}>
							{actions}
							{onlineChip}
						</Box>
						<Divider />
						<Typography sx={{ whiteSpace: "pre-wrap" }}>{shop.description}</Typography>
					</Box>
				</Box>
				<OwnerEditSection shop={shop} />
				<Divider />
				<MapWithNoSSR shops={[shop]} center={DataService.shopCoordinates(shop)} locate={false} />
				<Divider />
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

import Shop from "../../models/Shop";
import ShopCard from "../../components/shopCard"
import { getShop, getShopsIds } from "../../lib/data";
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
import { LocationOff } from '@mui/icons-material';
import Chip from "@mui/material/Chip";



export async function getStaticPaths() {
  let ids: number[] = await getShopsIds();
  return {
    paths: ids?.map((sid) => `/shops/${sid}`) ?? [],
    fallback: true, // can also be true or 'blocking'
  }
}

export async function getStaticProps({ params }: { params: { id: number } }) {
  let shop = await getShop(params.id);
  return {
    props: {
      shop: shop
    },

  }
}

export default function ShopPage({ shop }: { shop: Shop }) {

  const router = useRouter()
  if (router.isFallback) {
    return <Container sx={{ textAlign: "center" }}><CircularProgress /></Container>
  }

  const logoUrl = shop ? `https://tbhtpkmrwtznqzsjlfmo.supabase.co/storage/v1/object/public/shops-content/${shop.logo}.jpg` : '';

  let actions: React.ReactNode[] = [];

  if (shop) {
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
  }

  const onlineChip = shop && shop.online ? (
    <Chip icon={<LocationOff />} label="Solo online" />
  ) : '';

  return (
    <>
      <Head>
        <title>{shop.name + " en Honestore"}</title>
        <meta name="description" content={shop.description} />
        <meta property="og:title" content={shop.name + " en Honestore"} />
        <meta property="og:description" content={shop.description} />
      </Head>
      <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <Avatar alt={shop.name} src={logoUrl} sx={{ height: 128, width: 128, border: "1px solid #ccc" }} />
          <Typography variant="h1" component="h1" sx={{ marginBottom: 0 }}>{shop.name}</Typography>
          <Typography variant="body2" color="text.secondary" fontWeight="bold">{shop.address}</Typography>
          {onlineChip}
        </Box>
        <Box sx={{ display: "flex", gap: 3, justifyContent: "center" }}>
          {actions}
        </Box>
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography sx={{ whiteSpace: "pre-wrap", maxWidth: "700px" }}>{shop.description}</Typography>
        </Box>
      </Box>
      {/* <ShopCard shop={shop} /> */}
    </>
  );
}

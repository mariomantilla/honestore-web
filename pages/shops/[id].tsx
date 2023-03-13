import Shop from "../../models";
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
import { LocationOff } from '@mui/icons-material';
import Chip from "@mui/material/Chip";
import NewShops from "../../components/newShops";
import Grid from '@mui/material/Unstable_Grid2';
import Card from "@mui/material/Card";
import banner from '../../public/banner-inverted.png'
import Image from 'next/image'
import CardContent from "@mui/material/CardContent";
import Link from "next/link";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { FavButton } from "../../components/favButton";


export async function getStaticPaths() {
  let ids: number[] = await getShopsIds();
  return {
    paths: ids?.map((sid) => `/shops/${sid}`) ?? [],
    fallback: true, // can also be true or 'blocking'
  }
}

export async function getStaticProps({ params }: { params: { id: number } }) {
  let shop = await getShop(params.id);
  if (!shop) shop = {
    id: params.id,
    owner: null,
    owner_name: "",
    owner_email: "",
    web: "",
    published: true,
    location: "",
    location_coordinates: "",
    email: "",
    logo: "",
    online: true,
    name: "Test",
    address: "",
    consent_proof: null,
    created_at: "",
    updated_at: "",
    description: "description",
    instagram: "",
    phone: "",

  }
  return {
    props: {
      shop: shop
    },

  }
}

export default function ShopPage({ shop }: { shop: Shop }) {

  // const router = useRouter()
  // if (router.isFallback) {
  //   return <Container sx={{ textAlign: "center" }}><CircularProgress /></Container>
  // }

  return <>{shop.id}</>;

  // const router = useRouter()
  // if (router.isFallback) {
  //   return <Container sx={{ textAlign: "center" }}><CircularProgress /></Container>
  // }

  // const logoUrl = DataService.getShopLogo(shop);

  // let actions: React.ReactNode[] = [];

  // if (shop.instagram) {
  //   let url: string = `https://instagram.com/${shop.instagram}`;
  //   actions.push(
  //     <ShopExternalAction title="Ir a Instagram" url={url} key="instagram"><Instagram color='primary' /></ShopExternalAction>
  //   )
  // }
  // if (shop.phone) {
  //   let url: string = `tel:${shop.phone}`;
  //   actions.push(
  //     <ShopExternalAction title="Llamar" url={url} key="phone"><Phone color='primary' /></ShopExternalAction>
  //   )
  // }
  // if (shop.web) {
  //   actions.push(
  //     <ShopExternalAction title="Ir a la web" url={shop.web} key="web"><Language color='primary' /></ShopExternalAction>
  //   )
  // }
  // if (shop.email) {
  //   let url: string = `mailto:${shop.email}`;
  //   actions.push(
  //     <ShopExternalAction title="Escribir email" url={url} key="email"><Email color='primary' /></ShopExternalAction>
  //   )
  // }
  // if (shop.location_coordinates && !shop.online) {
  //   let url: string = `https://www.google.com/maps/search/?api=1&query=${shop.location_coordinates.replace(' ', ',')}`;
  //   actions.push(
  //     <ShopExternalAction title="Abrir mapa" url={url} key="map"><Map color='primary' /></ShopExternalAction>
  //   )
  // }

  // const onlineChip = shop && shop.online ? (
  //   <Chip icon={<LocationOff />} label="Solo online" />
  // ) : '';

  // return (
  //   <>
  //     <Head>
  //       <title>{shop.name + " en Honestore"}</title>
  //       <meta name="description" content={shop.description ?? ''} />
  //       <meta property="og:title" content={shop.name + " en Honestore"} />
  //       <meta property="og:description" content={shop.description ?? ''} />
  //     </Head>
  //     <Grid container spacing={1.5} rowSpacing={3}>
  //       <Grid xs={12} sm={6} md={8} sx={{position: "relative"}}>
  //         <Box sx={{position: "absolute", top: 0, right: "1rem"}}>
  //           <FavButton shop={shop} size="large" />
  //         </Box>
  //         <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
  //           <Box sx={{ display: "flex", gap: 1, alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
  //             <Avatar alt={shop.name ?? ''} src={logoUrl} sx={{ height: 128, width: 128, border: "1px solid #ccc" }} />
  //             <Typography variant="h1" component="h1" sx={{ marginBottom: 0 }}>{shop.name}</Typography>
  //             <Typography variant="body2" color="text.secondary" fontWeight="bold">{shop.address}</Typography>
  //             {onlineChip}
  //           </Box>
  //           <Box sx={{ display: "flex", gap: 3, justifyContent: "center" }}>
  //             {actions}
  //           </Box>
  //           <Divider />
  //           <Box sx={{ display: "flex", justifyContent: "center" }}>
  //             <Typography sx={{ whiteSpace: "pre-wrap" }}>{shop.description}</Typography>
  //           </Box>
  //         </Box>
  //       </Grid>
  //       <Grid xs={12} sm={6} md={4}>
  //         <Card elevation={4} sx={{ borderRadius: "10px" }}>
  //           <CardContent sx={{ textAlign: "center" }}>
  //             <Image
  //               src={banner}
  //               width={300}
  //               priority
  //               alt="Honestore, La comunidad de activistas del consumo ético" style={{ maxWidth: "100%", height: "auto" }}
  //             />
  //             <Typography sx={{ padding: "0.5rem 0.8rem", fontWeight: "bold" }}>La comunidad de activistas del consumo ético</Typography>
  //             <Button href="/about" LinkComponent={Link} variant="contained">
  //               Descubrir más
  //             </Button>
  //             <Divider sx={{margin: "1rem 0"}} />
  //             <Button href="/search" LinkComponent={Link} variant="contained">
  //               Buscar más tiendas
  //             </Button>
  //           </CardContent>
  //         </Card>
  //       </Grid>
  //     </Grid>
  //     <Divider sx={{ marginTop: "1rem" }} />
  //     <NewShops sx={{ marginTop: "1rem" }} />
  //   </>
  // );
}

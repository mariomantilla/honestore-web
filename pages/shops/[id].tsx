import Shop from "../../models/Shop";
import ShopCard from "../../components/shopCard"
import { getShop, getShopsIds } from "../../lib/data";
import Head from "next/head";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";

export async function getStaticPaths() {
  let ids: number[] = await getShopsIds();
  return {
    paths: ids?.map((sid) => `/shops/${sid}`) ?? [],
    fallback: true, // can also be true or 'blocking'
  }
}

export async function getStaticProps ({ params }: { params: { id: number } }) {
  let shop: Shop | null = await getShop(params.id);
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

export default function ShopPage({ shop }: { shop: Shop }) {
  const router = useRouter()
  if (router.isFallback) {
    return <Container sx={{textAlign: "center"}}><CircularProgress /></Container>
  }
  return (
    <>
      <Head>
        <title>{shop.name + " en Honestore"}</title>
        <meta name="description" content={shop.description} />
        <meta property="og:title" content={shop.name + " en Honestore"} />
        <meta property="og:description" content={shop.description} />
      </Head>
      <ShopCard shop={shop} />
    </>
  );
}

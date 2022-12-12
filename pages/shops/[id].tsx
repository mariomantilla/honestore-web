import Shop from "../../models/Shop";
import ShopCard from "../../components/shopCard"
import { getShop, getShopsIds } from "../../lib/data";

export async function getStaticPaths() {
  let ids: number[] = await getShopsIds();
  return {
    paths: ids?.map((sid) => `/shops/${sid}`) ?? [],
    fallback: false, // can also be true or 'blocking'
  }
}

export async function getStaticProps({params} : {params: { id: number }}) {
  let shop: Shop | null = await getShop(params.id);
  return {
    props: {
      shop: shop
    } 
  }
}

export default function ShopPage({ shop } : { shop: Shop }) {
  return (
    <ShopCard shop={shop} />
  );
}

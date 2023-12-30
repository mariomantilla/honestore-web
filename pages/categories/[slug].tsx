import { Box, Container, Typography } from "@mui/material";
import ShopList from "../../components/shopList";
import { DataService } from "../../lib/data";
import { Category, ShopTags } from "../../models";
import OverrideHead from "../../components/head";
import Breadcrumbs from "../../components/Breadcrumbs";


export async function getStaticPaths() {
	let categoriesRequest = await DataService.getCategories();
	let categories: Category[] = categoriesRequest.data ?? [];
	return {
		paths: categories.map((c) => `/categories/${c.slug}`),
		fallback: false, // can also be true or 'blocking'
	}
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
	let { data, error } = await DataService.getCategoryBySlug(params.slug);
    if  (error) throw(error);

	if (!data?.length) {
		return {
			notFound: true,
		}
	}

    const category = data[0];

    let shopsReq = await DataService.popularShopsByCategory(category).limit(20); 
    if  (shopsReq.error) throw(shopsReq.error);

	return {
		props: {
			category: category,
            shops: shopsReq.data ?? []
		},

	}
}

export default function ExploreCategoryPage({ category, shops }: { category: Category, shops: ShopTags[] }) {

    const title = category.seo_title || `Comercios sostenibles en ${category.name}`;

    return (<>
        <OverrideHead
            title={title}
            description={category.description}
        />
        <Breadcrumbs items={[{name: category.name}]} />
        <Box sx={{display: "flex", gap: 4, flexDirection: "column"}}>
            <Typography variant="h1">{title}</Typography>
            <Container maxWidth="md">
                <Typography variant="subtitle1" sx={{textAlign: "center"}}>{category.description}</Typography>
            </Container>
            <ShopList shops={shops} />
        </Box>
        </>);
}
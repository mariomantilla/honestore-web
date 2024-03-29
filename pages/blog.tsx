import { Card, CardActionArea, CardHeader, CardMedia, Container, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { DataService } from "../lib/data";
import { PostWithUser } from "../models";
import { localDate } from "../helpers/datetime";
import { useRouter } from "next/router";
import Link from "next/link";
import { FixedRatioImageKitImage, ImageKitImage } from "../components/imageKitImage";
import OverrideHead from "../components/head";
import Breadcrumbs from "../components/Breadcrumbs";

export async function getStaticProps() {
	let { data, error } = await DataService.getAllPosts();
    if  (error) throw(error);

	if (!data?.length) {
		return {
			notFound: true,
		}
	}
	return {
		props: {
			posts: data
		},

	}
}


const BlogPage = ({posts}: {posts: PostWithUser[]}) => {
    
    const router = useRouter();

    const title = "El Blog de Honestore";
    const subtitle = "Sostenibilidad y consumo consciente";
    const desc = `Nuestra selección de artículos, entrevistas inspiradoras y guías prácticas 
                que te guiarán hacia un estilo de vida más consciente. Aprende sobre
                prácticas comerciales éticas, hábitos eco-amigables y descubre cómo cada elección
                diaria puede ser un paso hacia un futuro más sostenible.
                ¡Descubre, aprende y actúa con nosotros!`;

    return (
        <>
        <OverrideHead
            title={title}
            description="desc"
        />
        <Breadcrumbs items={[{name: "Blog"}]} />
        <Typography variant="h1">{title}</Typography>
        <Typography variant="h2" sx={{marginTop: 2}}>{subtitle}</Typography>
        <Container maxWidth="md">
            <Typography variant="subtitle1" sx={{textAlign: "center"}} component={"h3"}>{desc}</Typography>
        </Container>
        <Grid container spacing={1.5} sx={{marginTop: 3}}>
            { posts.map((post, i) => (
                <Grid xs={12} sm={6} md={4} lg={4} key={i}>
                    <Card sx={{height: "100%"}}>
                        <CardActionArea onClick={() => router.push('/blog/'+post.slug)}
                            sx={{height: "100%", display: "flex", flexDirection: "column", alignItems: "normal"}}>
                            <CardHeader
                                title={
                                <Typography variant="h3">
                                    <Link href={"/blog/"+post.slug}>{post.title}</Link>
                                </Typography>}
                                subheader={localDate(new Date(post.created_at), true)}
                                sx={{flexGrow: 1}}
                            />
                            <CardMedia sx={{marginBottom: "-5px"}}>
                                <FixedRatioImageKitImage
                                    priority={true}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                    }}
                                    width={350}
                                    height={200}
                                    src={`/blog/${post.hero}`}
                                    alt={post.title}
                                />
                                {/* <ImageKitImage
                                    // fill={true}
                                    src={`blog/${post.hero}`}
                                    alt={post.description??''}
                                /> */}
                            </CardMedia>
                        </CardActionArea>
                    </Card>
                </Grid>
            )) }
        </Grid>
        </>
    );
}

export default BlogPage

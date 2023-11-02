import { Card, CardActionArea, CardHeader, CardMedia, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { DataService } from "../lib/data";
import { Post, PostWithUser, Profile } from "../models";
import UserAvatar from "../components/userAvatar";
import { localDate } from "../helpers/datetime";
import { IKImage } from "imagekitio-react";
import { useRouter } from "next/router";
import Link from "next/link";

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


    return (
        <>
        <Typography variant="h1">El Blog de Honestore</Typography>
        <Grid container spacing={1.5} sx={{marginTop: 3}}>
            { posts.map((post, i) => (
                <Grid xs={12} sm={6} md={4} lg={4} key={i}>
                    <Card>
                        <CardActionArea onClick={() => router.push('/blog/'+post.slug)}>
                            <CardHeader
                                title={<Link href={"/blog/"+post.slug}>{post.title}</Link>}
                                subheader={localDate(new Date(post.created_at), true)}
                            />
                            <CardMedia sx={{marginBottom: "-5px"}}>
                                <IKImage
                                    height={200}
                                    path={`blog/${post.hero}`}
                                    transformation={[{
                                        height: "300",
                                        width: "600",
                                        dpr: "2"
                                    }]}
                                    alt={post.description??''}
                                />
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

import Box from "@mui/material/Box";
import { DataService } from "../../lib/data";
import { PostWithUser, Profile } from "../../models";
import { Typography } from "@mui/material";
import UserAvatar from "../../components/userAvatar";
import { localDate } from "../../helpers/datetime";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";
import Center from "../../components/center";
import Head from "next/head";


export async function getStaticPaths() {
	let postsRequest = await DataService.getAllPosts();
	let posts: PostWithUser[] = postsRequest.data ?? [];
	return {
		paths: posts.map((p) => `/blog/${p.slug}`),
		fallback: true, // can also be true or 'blocking'
	}
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
	let { data, error } = await DataService.getPostBySlug(params.slug);
    if  (error) throw(error);

	if (!data?.length) {
		return {
			notFound: true,
		}
	}
	return {
		props: {
			post: data[0]
		},

	}
}

export default function ShopPage({ post }: { post: PostWithUser }) {

    if (!post) return null;
    const author = post?.author as Profile;

    return (
    <>
        <Head>
            <title>{post.title + " - Blog de Honestore"}</title>
            <meta name="description" content={post.description ?? ''} />
            <meta key="meta-og-title" property="og:title" content={post.title + " - Blog de Honestore"} />
            <meta key="meta-og-desc" property="og:description" content={post.description ?? ''} />
        </Head>
        <Box sx={{display: "flex", gap: 2, flexDirection: {xs: "column-reverse", md: "row"}}}>
            <Box sx={{width: {xs: "100%", md: "250px"}, flexShrink: 0, display: "flex", flexDirection: "column", gap: 1, marginTop: 2}}>
                <Center>
                    <UserAvatar profile={author} size={100} />
                </Center>
                <Center>
                <Typography>{author.name}</Typography>
                </Center>
                <Typography fontSize={12} textAlign={"justify"} padding={2}>{author.bio}</Typography>
            </Box>
            <Box>
                <Typography variant="h1" sx={{fontSize: 32, textAlign: "left", lineHeight: "3rem"}}>{post.title}</Typography>
                <Typography sx={{fontSize: 14, color: "#888"}}>{localDate(new Date(post.created_at), true)}</Typography>
                <Box sx={{marginTop: 2}}>
                    <IKImage
                        width={"100%"}
                        path={`blog/${post.hero}`}
                        transformation={[{
                            height: "300",
                            width: "1400",
                            dpr: "2"
                        }]}
                    />
                </Box>
                <Markdown className="blogPost">{post.body}</Markdown>
            </Box>
        </Box>
    </>
    );
}
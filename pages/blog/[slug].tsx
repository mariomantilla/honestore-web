import Box from "@mui/material/Box";
import { DataService } from "../../lib/data";
import { PostWithUser, Profile } from "../../models";
import { Container, Divider, Typography } from "@mui/material";
import UserAvatar from "../../components/userAvatar";
import { localDate } from "../../helpers/datetime";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";
import Center from "../../components/center";
import Head from "next/head";
import Image from "next/image"
import { ImageKitImage } from "../../components/imageKitImage";


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

    const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT??'';

    return (
    <>
        <Head>
            <title>{post.title + " - Blog de Honestore"}</title>
            <meta name="description" content={post.description ?? ''} />
            <meta key="meta-og-title" property="og:title" content={post.title + " - Blog de Honestore"} />
            <meta key="meta-og-desc" property="og:description" content={post.description ?? ''} />
            <meta property="og:image" content={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT+'/tr:h-630,w-1200/blog/'+post.hero} key="head-image" />
        </Head>
        <Container maxWidth="md">
        <Box sx={{display: "flex", gap: 2, flexDirection: "column"}}>
            <Box>
                <Typography variant="h1" sx={{fontSize: 32, textAlign: "left", lineHeight: "3rem"}}>{post.title}</Typography>
                <Box sx={{display: "flex", gap: 0.7, alignItems: "center", marginTop: 1}}>
                    <Typography sx={{fontSize: 18, fontWeight: 200}}>Por</Typography>
                    <Typography sx={{fontSize: 18, flexGrow: 1}}>{author.name}</Typography>
                    <Typography sx={{fontSize: 14, color: "#888"}}>{localDate(new Date(post.created_at), true)}</Typography>
                </Box>
                <Box sx={{marginTop: 2, position: "relative"}}>
                    <Image
                        priority={true}
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                        width={1704}
                        height={486}
                        src={`${urlEndpoint}/blog/${post.hero}?tr=w-1704,h-486`}
                        alt={post.title}
                    />
                </Box>
                <Markdown className="blogPost" components={{
                    // Map `h1` (`# heading`) to use `h2`s.
                    h1: 'h2',
                    h2: 'h3',
                    h3: 'h4',
                    h4: 'h5',
                    h5: 'h6',
                    // Rewrite `em`s (`*like so*`) to `i` with a red foreground color.
                    a(props) {
                        const {node, ...rest} = props
                        let href = rest['href'];
                        if (href?.startsWith('http')) rest['target'] = '_blank';
                        return <a {...rest} />
                    }
                }}>
                    {post.body}
                </Markdown>
            </Box>
            <Divider />
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <Center>
                <UserAvatar profile={author} size={100} />
                </Center>
                <Center>
                <Typography>{author.name}</Typography>
                </Center>
                <Typography fontSize={16} textAlign={"justify"} padding={2} sx={{whiteSpace: "break-spaces", fontWeight: "300"}}>
                    {author.bio}
                </Typography>
            </Box>
        </Box>
        </Container>
    </>
    );
}
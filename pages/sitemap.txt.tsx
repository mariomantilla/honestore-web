
import type { NextApiResponse } from 'next'
import { BASE_URL } from '../constants';
import { DataService, getShopsIds } from '../lib/data';
import { Post, Shop } from '../models';

const Sitemap = () => {
    return null;
};

export const getServerSideProps = async ({ res }: { res: NextApiResponse }) => {

    let shopsRequest = await DataService.getAllShops();
	let shops: Shop[] = shopsRequest.data ?? [];
    let dynamicPaths = shops.map(s => `${BASE_URL}/shops/${s.slug}`)

    let postsRequest = await DataService.getAllPosts();
    let posts: Post[] = postsRequest.data ?? [];
    dynamicPaths = dynamicPaths.concat(posts.map(p => `${BASE_URL}/blog/${p.slug}`));
    const sitemap = dynamicPaths.join("\n");

    res.setHeader('Content-Type', 'text');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default Sitemap;
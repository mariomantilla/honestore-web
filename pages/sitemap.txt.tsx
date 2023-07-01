
import type { NextApiResponse } from 'next'
import { BASE_URL } from '../constants';
import { DataService, getShopsIds } from '../lib/data';
import { Shop } from '../models';

const Sitemap = () => {
    return null;
};

export const getServerSideProps = async ({ res }: { res: NextApiResponse }) => {

    let shopsRequest = await DataService.getAllShops();
	let shops: Shop[] = shopsRequest.data ?? [];
    const dynamicPaths = shops.map(s => `${BASE_URL}/shops/${s.slug}`)
    const sitemap = dynamicPaths.join("\n");

    res.setHeader('Content-Type', 'text');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default Sitemap;
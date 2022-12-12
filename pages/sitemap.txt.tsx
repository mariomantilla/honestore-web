
import type { NextApiResponse } from 'next'
import { getShopsIds } from '../lib/data';

const Sitemap = () => {
    return null;
};

export const getServerSideProps = async ({ res }: { res: NextApiResponse }) => {
    const BASE_URL = 'https://honestore.app';

    let ids: number[] = await getShopsIds(); // some remote API call maybe!
    const dynamicPaths = ids.map(shopId => `${BASE_URL}/shops/${shopId}`)
    const sitemap = dynamicPaths.join("\n");

    res.setHeader('Content-Type', 'text');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default Sitemap;
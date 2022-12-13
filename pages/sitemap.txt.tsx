
import type { NextApiResponse } from 'next'
import { BASE_URL } from '../constants';
import { getShopsIds } from '../lib/data';

const Sitemap = () => {
    return null;
};

export const getServerSideProps = async ({ res }: { res: NextApiResponse }) => {

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
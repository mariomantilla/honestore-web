import type { NextApiRequest, NextApiResponse } from "next";
import { getShop } from "../../lib/data";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		let shopId = req.query.id;
		if (shopId) {
			let shop = await getShop(parseInt(shopId.toString()));
			if (shop) {
				await res.revalidate("/shops/" + shop?.slug);
				await res.revalidate("/shops/" + shopId + "/edit");
				await res.revalidate("/shops/" + shopId + "/claim");
			}
		}
		return res.json({ revalidated: true });
	} catch (err) {
		return res.status(500).send("Error revalidating");
	}
}

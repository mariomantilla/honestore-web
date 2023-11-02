import type { NextApiRequest, NextApiResponse } from "next";
import { DataService } from "../../lib/data";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		let postId = req.query.id;
		if (postId) {
			let { data, error } = await DataService.getPostById(parseInt(postId.toString()));
			if (error) {
				throw error;
			}
			if (data && data?.length) {
				let post = data[0];
				await res.revalidate("/blog/" + post.slug);
				await res.revalidate("/blog");
			}
		}
		return res.json({ revalidated: true });
	} catch (err) {
		return res.status(500).send("Error revalidating");
	}
}

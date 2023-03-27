import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
	let shopId = req.query.id;
    await res.revalidate("/shops/"+shopId);
    await res.revalidate("/shops/"+shopId+"/edit");
    await res.revalidate("/shops/"+shopId+"/claim");
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}

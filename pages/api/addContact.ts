import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const url = 'https://api.sendinblue.com/v3/contacts';
    const options = {
        method: 'POST',
        headers: { accept: 'application/json', 'content-type': 'application/json', 'api-key': process.env.SENDINBLUE_KEY??'' },
        body: JSON.stringify({ email: JSON.parse(req.body).email, attributes: {OPT_IN: true}, listIds: [3] })
    };

    try {
        let addRes = await fetch(url, options);
        if (addRes.status != 201) {
            res.status(400).json({message: await addRes.json()});
        } else {
            res.status(200).json({});
        }
    } catch (error){
        res.status(500).json({});
    }
}
  
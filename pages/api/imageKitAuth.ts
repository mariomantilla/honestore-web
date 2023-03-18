import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    var ImageKit = require("imagekit");

    var imagekit = new ImageKit({
        publicKey : process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
        privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint : process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY
    });

    var authenticationParameters = imagekit.getAuthenticationParameters();

    res.status(200).json(authenticationParameters);

}
  
import type { NextApiRequest, NextApiResponse } from 'next'
import getFileContents from 'src/utils/webdav/getFileContents'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

  const { url } = req.query

  const imagePath = Buffer.from(url!.toString(), 'base64').toString('ascii')

  const image = await getFileContents(imagePath)

  res.send(image)

}

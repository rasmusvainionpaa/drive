import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"
import { prisma } from "src/server/db/client"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const secret = process.env.NEXTAUTH_SECRET
  const token = await getToken({ req, secret })

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  let { folderName, folderPath } = req.body

  if (folderPath === undefined) {
    folderPath = "/"
  }

  if (folderName === undefined) {
    return res.status(400).json({ message: "Bad request" });
  }

  console.log(folderName, folderPath)

  if (folderPath != "/") {
    folderPath += "/"
  }

  await prisma.item.create({
    data: {
      name: folderName,
      mime: "",
      url: "",
      base64path: Buffer.from(folderPath + folderName).toString('base64'),
      folderPath: folderPath,
      isFolder: true,
      userId: token?.id as string,
    }
  })

  return res.send(200)
}
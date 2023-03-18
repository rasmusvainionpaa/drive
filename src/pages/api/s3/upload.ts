import { NextApiRequest, NextApiResponse } from "next";
import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getToken } from "next-auth/jwt";
import { prisma } from "../../../server/db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const secret = process.env.NEXTAUTH_SECRET
  const token = await getToken({ req, secret })

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const s3client = new S3Client({
    forcePathStyle: false,
    endpoint: process.env.DO_SPACES_URL!,
    region: "ams3",
    credentials: {
      accessKeyId: process.env.DO_SPACES_KEY_ID!,
      secretAccessKey: process.env.DO_SPACES_KEY_SERCRET!,
    }
  });

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  let error = false
  let url = ""
  let Name, Folder = ""
  let Type: any

  try {
    let { name, type, folder } = req.body;

    if (folder === undefined) {
      folder = "/"
    }

    Name = name
    Folder = folder
    Type = type

    const fileParams = {
      Bucket: process.env.DO_BUCKET_NAME,
      Key: `uploads/${token?.id}${folder}${name}`,
      ContentType: type,
    };

    url = await getSignedUrl(s3client, new PutObjectCommand(fileParams));

  } catch (err) {
    error = true
    console.log(err);
    res.status(400).json({ message: err });
  } finally {
    if (!error) {
      await prisma.item.create({
        data: {
          name: Name,
          mime: Type as string,
          url: `uploads/${token?.id}${Folder}${Name}`,
          base64path: Buffer.from(Folder).toString('base64'),
          folderPath: Folder,
          isFolder: false,
          userId: token?.id as string,
        }
      })
      res.status(200).json({ url });
    }
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb", // Set desired value here
    },
  },
};
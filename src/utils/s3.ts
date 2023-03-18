import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function GetPreSignedGetUrl(key: string) {

  const bucketParams = {
    Bucket: process.env.DO_BUCKET_NAME!,
    Key: key + "", // thorws error without this
  }

  const s3client = new S3Client({
    endpoint: process.env.DO_SPACES_URL!,
    region: "ams3",
    credentials: {
      accessKeyId: process.env.DO_SPACES_KEY_ID!,
      secretAccessKey: process.env.DO_SPACES_KEY_SERCRET!,
    }
  });

  try {
    const url = await getSignedUrl(s3client, new GetObjectCommand(bucketParams), { expiresIn: 15 * 60 })
    return url
  } catch (e) {
    console.log("Get signed get url error: ", e)
  }
}
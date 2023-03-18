import { BufferLike, createClient } from "webdav";

export default async function deleteFile(file: string) {
  const client = createClient(process.env.WEBDAV_HOST!, {
    username: process.env.WEBDAV_USER!,
    password: process.env.WEBDAV_PASSWORD!,
  })

  await client.deleteFile(file)
}
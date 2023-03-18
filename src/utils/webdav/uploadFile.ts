import { BufferLike, createClient, WebDAVClient } from "webdav";
import fs from "fs/promises"

const uploadFile = async (path: string, name: string) => {

  const client = createClient(process.env.WEBDAV_HOST!, {
    username: process.env.WEBDAV_USER!,
    password: process.env.WEBDAV_PASSWORD!,
  })


  const data = await fs.readFile(path, 'utf8')

  let res: boolean

  res = await client.putFileContents(name, data, {
    overwrite: true,
    headers: {
      'Content-Type': 'image/jpeg'
    }
  })
}

export default uploadFile;
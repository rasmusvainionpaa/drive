import * as ftp from "basic-ftp";

export default async function getDirectoryContents(): Promise<ftp.FileInfo[]> {

  const creds = {
    host: process.env.HOST!,
    user: process.env.USER!,
    password: process.env.PASSWORD!,
    secure: false,
  }

  const client = new ftp.Client()

  client.ftp.verbose = false;

  console.log("Päästiin tähän")

  await client.access({
    host: process.env.HOST!,
    user: process.env.USER!,
    password: process.env.PASSWORD!,
    secure: true,
  })

  console.log("printtiiii", await client.list())

  let list = await client.list()

  client.close()

  return list;

}
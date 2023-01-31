import { createClient } from "webdav";

const getFilesWebDav = async (directory: string) => {

    const client = createClient(process.env.WEBDAV_HOST!, {
        username: process.env.WEBDAV_USER!,
        password: process.env.WEBDAV_PASSWORD!,
    })

    const files = await client.getDirectoryContents(directory)


    return files;
}

export default getFilesWebDav;


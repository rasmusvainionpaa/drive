import { createClient } from "webdav";

const getFilesWebDav = async (directory: string) => {

    const client = createClient(process.env.HEZNER_STORAGEBOX_HOST_WEBDAV!, {
        username: process.env.HEZNER_STORAGEBOX_USERNAME!,
        password: process.env.HEZNER_STORAGEBOX_PASSWORD!,
    })

    const files = await client.getDirectoryContents(directory)

    return files;
}

export default getFilesWebDav;
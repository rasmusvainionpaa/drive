import { createClient } from "webdav";

export default async function getFileContents(url: string) {
    const client = createClient(process.env.WEBDAV_HOST!, {
        username: process.env.WEBDAV_USER!,
        password: process.env.WEBDAV_PASSWORD!,
    })

    const buff = await client.getFileContents(url);

    return buff;
}

import Link from "next/link";
import { FileStat } from "webdav";
import base64 from "base-64";

export default function File(file : any) {
    const url = base64.encode(`/folders${file.filename}`);
    if (file.type === "directory") {
        return (
            <li className="w-24">
                <Link href={`/folders${file.filename}`}>
                    <div className="flex flex-col">
                        <img src="/assets/folder.svg" alt="folder" />
                        <h1 className="flex justify-center">
                            {file.basename}
                            {url}
                        </h1>
                    </div>
                </Link>
            </li>
        );
    }
    
    return (
        <li className="w-24">
            <div className="flex flex-col">
                <img src="/assets/file.svg" alt="file" />
                <h1 className="flex justify-center">
                    {file.basename}
                </h1>
            </div>
        </li>
    );
}
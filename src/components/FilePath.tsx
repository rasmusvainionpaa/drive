import base64 from "base-64";
import Link from "next/link";
import { useRouter } from "next/router";
import path from "path";

export default function FilePath() {
    const path = useRouter().query.directory === undefined ? "" : useRouter().query.directory as string;

    const decodedPath = base64.decode(path).split("/");

    console.log(decodedPath);

    if(path === undefined) return (
        <nav className="flex flex-row justify-between border-b">
            <ul className="flex flex-row">
                <li>
                    <Link href="/f">
                        <p className="block p-4">Files</p>
                    </Link>
                </li>
            </ul>
        </nav>
    )

    return (
        <nav className="flex flex-row justify-between border-b">
            <ul className="flex flex-row">
                {
                    decodedPath.map((path: string) => {
                        return (
                            <li>
                                <Link href="/">
                                    <p className="block p-4">{path}</p>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    );
}
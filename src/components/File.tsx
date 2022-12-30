import Link from "next/link";

export default function File({ file }: any) {
    if (file.type === "directory") {
        return (
            <li className="w-24">
                <Link href={`/folders${file.filename}`}>
                    <div className="flex flex-col">
                        <img src="/assets/folder.svg" alt="folder" />
                        <h1 className="flex justify-center">
                            {file.basename}
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
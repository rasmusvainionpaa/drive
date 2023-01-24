import Link from "next/link";
import { FileType } from "src/types/fileType";

interface Props {
  file: FileType;
}

export default function Directory({ file }: Props) {

    return (
        <li className="w-full">
            <Link href={file.url!}>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row">
                        <img src="/assets/folder-s.svg" alt="folder" />
                        <p className="flex justify-start px-4">{file.basename}</p>
                    </div>
                    <div className="flex flex-row">
                        <p className="px-4">{file.lastmod}</p>
                    </div>
                </div>
            </Link>
      </li>
    )
}
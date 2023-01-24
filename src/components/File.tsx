import Link from "next/link";
import base64 from "base-64";
import { useRouter } from "next/router";
import { FileType } from "src/types/fileType";

interface Props {
  file: FileType;
}

export default function File({ file }: Props) {

  return (
    <li className="w-full">
      <Link href={file.url!}>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <img src="/assets/file.svg" alt="file" />
            <p className="flex justify-start px-4">{file.basename}</p>
          </div>
          <div className="flex flex-row">
            <p className="px-4">{file.lastmod}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}

import Link from "next/link";
import base64 from "base-64";
import { useRouter } from "next/router";
import { FileType } from "src/types/fileType";
import { FileStat } from "webdav";

interface Props {
  file: FileStat;
}

export default function File({ file }: Props) {
  const router = useRouter();
  const directory =
    router.query.directory === undefined
      ? ""
      : base64.decode(router.query.directory as string);

  const url = base64.encode(`${directory}/${file.basename}`);

  if (file.type === "directory") {
    return (
      <li className="w-full">
        <Link href={"/f/" + url}>
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
    );
  }

  return (
    <li className="w-full">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <img src="/assets/file.svg" alt="file" />
          <p className="flex justify-start px-4">{file.basename}</p>
        </div>
        <div className="flex flex-row">
          <p className="px-4">{file.lastmod}</p>
        </div>
      </div>
    </li>
  );
}

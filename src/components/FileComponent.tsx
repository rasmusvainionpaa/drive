import Link from "next/link";
import { Item } from "@prisma/client";

interface Props {
  file: Item
}

export default function FileComponent({ file}: Props) {

  return (
    <li className="w-full">
      <div className="flex flex-row justify-between">
          <Link href={"/show/" + file.url}>
            <div className="flex flex-row">
              <img src="/assets/file.svg" alt="file" />
              <p className="flex justify-start px-4">{file.name}</p>
            </div>
          </Link>
          <div className="flex flex-row">
            <p className="px-4">{file.updatedAt as unknown as string}</p>
          </div>
      </div>
    </li>
  );
}

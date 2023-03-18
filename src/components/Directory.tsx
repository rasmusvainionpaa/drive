import { Item } from "@prisma/client";
import Link from "next/link";

interface Props {
  file: Item;
}

export default function Directory({ file }: Props) {

    return (
        <li className="w-full">
            <Link href={"/f/" + file.base64path}>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row">
                        <img src="/assets/folder-s.svg" alt="folder" />
                        <p className="flex justify-start px-4">{file.name}</p>
                    </div>
                    <div className="flex flex-row">
                        <p className="px-4">{file.updatedAt as unknown as string}</p>
                    </div>
                </div>
            </Link>
      </li>
    )
}
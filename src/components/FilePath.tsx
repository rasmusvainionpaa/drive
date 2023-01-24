import Link from "next/link";

interface Props {
    path: string;
    name: string;
}

export default function FilePath({path, name}: Props) {

    if(path === "") return (
        <li>
            <Link href="/f">
                <p className="block p-1">/</p>
            </Link>
        </li>
    )

    return (
        <li>
            <Link href={path}>
                <p className="block p-1">{name} /</p>
            </Link>
        </li>
    );
}
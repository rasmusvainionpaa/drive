import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="flex flex-row justify-between border-b">
      <div className="flex flex-row">
        <Link href="/">
          <h1 className="p-4 font-bold">Drive</h1>
        </Link>
        <ul className="flex flex-row">
          <li>
            <Link href="/">
              <p className="block p-4">Home</p>
            </Link>
          </li>
        </ul>
      </div>

      {session?.user ? (
        <ul className="flex flex-row">
          <li>
            <Link href="/user">
              <p className="block p-4">{session?.user?.name}</p>
            </Link>
          </li>
          <li className="block p-2">
            <Link href="/auth/signout">
              <p className="border-2 p-1 border-rose-600 rounded-lg">Sign out</p>
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="flex flex-row">
          <li>
            <Link href="/auth/signin">
              <p className="block p-4">Sign in</p>
            </Link>
          </li>
          <li>
            <Link href="/auth/signup">
              <p className="block p-4">Sign up</p>
            </Link>
          </li>
        </ul>
      )}
    </nav>  
  );
}
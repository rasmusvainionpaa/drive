import { PropsWithChildren } from "react";
import Navbar from "./Navbar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl py-10">{children}</main>
    </>
  );
}
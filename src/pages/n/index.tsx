import { type NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import Layout from "../../components/Layout";

const Notes: NextPage = () => {
  return (
    <Layout>
      <div className="flex justify-start text-xl">
        <div className="flex flex-row justify-between border-b">
          <Link href={"/n"}>  
              <p className="block p-4">Home</p>
          </Link>
        </div>
      </div>

      <div className="flex justify-start text-xl">
        
      </div>

      <p>Hello from notes</p>
    </Layout>
  );
};

export default Notes;
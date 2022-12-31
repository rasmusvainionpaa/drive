import { type NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import FilePath from "src/components/FilePath";
import Layout from "../../components/Layout";

const Notes: NextPage = () => {
  return (
    <Layout>

      <div className="flex justify-start text-xl">
        <FilePath />
      </div>

      <p>Hello from notes</p>
    </Layout>
  );
};

export default Notes;
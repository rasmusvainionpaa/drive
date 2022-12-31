import { type NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Layout from "../components/Layout";


const Home: NextPage = () => {

  return (
    <Layout>
      <p>Hello from home</p>
    </Layout>
  );
};

export default Home;
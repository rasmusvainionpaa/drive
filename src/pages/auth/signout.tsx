import { type NextPage } from "next";
import { getSession, signOut, useSession } from "next-auth/react";
import Layout from "../../components/Layout";

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);
  
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

const Home: NextPage = () => {

  return (
    <Layout>
        <h1>Signing out</h1>
        <button onClick={() => signOut({callbackUrl: 'http://localhost:3000'})}>Sign out</button>
    </Layout>
    );
};

export default Home;
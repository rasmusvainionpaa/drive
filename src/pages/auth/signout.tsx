import { GetServerSidePropsContext, type NextPage } from "next";
import { getSession, signOut, useSession } from "next-auth/react";
import Layout from "../../components/Layout";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
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
      <div>
        <h1>Signing out</h1>
        <button onClick={() => signOut({callbackUrl: '/'})}>Sign out</button>
      </div>
    </Layout>
    );
};

export default Home;
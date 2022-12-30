import { type NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Layout from "../components/Layout";

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

const Notes: NextPage = () => {
  const { data: session, status } = useSession();

  console.log(session);

  if (status === "loading") {
    return <main>Loading...</main>;
  }

  return (
    <Layout>
      <p>Hello {session?.user?.name}</p>
    </Layout>
  );
};

export default Notes;
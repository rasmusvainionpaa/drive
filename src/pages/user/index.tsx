import { GetServerSidePropsContext, type NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Layout from "../../components/Layout";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context);
  
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

const User: NextPage = () => {
  const { data: session, status } = useSession();

  console.log(session);

  if (status === "loading") {
    return <main>Loading...</main>;
  }

  return (
    <Layout>
        <p>User profile</p>
      <p>name: {session?.user?.name}</p>
    </Layout>
  );
};

export default User;
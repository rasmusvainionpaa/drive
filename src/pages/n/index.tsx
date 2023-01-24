import { GetServerSidePropsContext, type NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Layout from "../../components/Layout";

interface Props {
  url: string;
}

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

  const notes = await prisma?.posts.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  if(!notes) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      notes: JSON.stringify(notes),
    },
  };
};

const Notes: NextPage = (url) => {

  return (
    <Layout>
      
      <div className="flex justify-start text-xl">
        Notes
      </div>

      <p>Hello from notes</p>
    </Layout>
  );
};

export default Notes;
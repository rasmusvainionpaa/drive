import { GetServerSidePropsContext, type NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import getDirectoryContents from "src/utils/ftp/getDirContents";
import getDir from "src/utils/sftp/getDir";
import Layout from "../../components/Layout";

interface Props {
  files: string[];
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
 
  const files = await getDir();

  return {
    props: {
      files: files,
    },
  };
};

const Notes: NextPage = (files) => {

  console.log(files)

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
import { GetServerSidePropsContext, type NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import getFilesWebDav from "src/utils/webdav/getFilesWebDav";
import Layout from "../../components/Layout";
import File from "../../components/File";
import Link from "next/link";
import FilePath from "src/components/FilePath";
import { useRouter } from "next/router";
import { FileStat } from "webdav";

interface Props {
  files: FileStat[];
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {

  const files = await getFilesWebDav("/")

  return {
      props: { 
          files
      },
  };
};

const Files: NextPage<Props> = ({files}) => {

  return (
    <Layout>
      <div className="flex justify-start text-xl">
        <FilePath />
      </div>
      
      <div className="py-2">
            <ul className="grid grid-row">
          {
            files.map((file: FileStat) => {
              return (
                  <File key={file.etag} file={file} />
              )
            })
          }
        </ul>
      </div>
    </Layout>
  );
};

export default Files;
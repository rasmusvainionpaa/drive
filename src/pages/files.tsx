import { type NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import getFilesWebDav from "src/utils/webdav/getFilesWebDav";
import Layout from "../components/Layout";
import File from "../components/File";
import {FileStat} from "webdav";
import Link from "next/link";

interface Props {
  files: FileStat[];
}

export const getServerSideProps = async (context: any) => {

  const rawFiles = await getFilesWebDav("/")
  
  const files = JSON.parse(JSON.stringify(rawFiles))

  return {
      props: { 
          files
      },
  };
};

const Files: NextPage<Props> = ({files}) => {

  files.map((file: any) => {
    console.log(file);
  })

  return (
    <Layout>
      <div className="mb-5 flex flex-row text-3xl">
        <h1 className="ml-2">
          Files
        </h1>
      </div>
      
      <div className="mb-5">
            <ul className="grid grid-cols-3 gap-4">
          {
            files.map((file: any) => {
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
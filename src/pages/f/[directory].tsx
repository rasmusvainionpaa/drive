import { GetServerSidePropsContext, type NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import getFilesWebDav from "src/utils/webdav/getFilesWebDav";
import Layout from "../../components/Layout";
import File from "../../components/File";
import Link from "next/link";
import base64 from "base-64";
import FilePath from "src/components/FilePath";
import { useRouter } from "next/router";
import { FileType } from "src/types/fileType";

interface Props {
  files: FileType[];
  currentUrl: string;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const url =
    context.query.directory === undefined
      ? ""
      : base64.decode(context.query.directory as string);

  console.log("yeet: ", url);
  const files = await getFilesWebDav(url);

  return {
    props: {
      files: files,
      currentUrl: url,
    },
  };
};

const Files: NextPage<Props> = (files, currentUrl) => {
  console.log(currentUrl);

  return (
    <Layout>
      <div className="flex justify-start text-xl">
        <FilePath />
      </div>

      <div className="py-2">
        <ul className="grid-row grid">
          {files.files.map((file: FileType) => {
            return <File key={file.etag} file={file} />;
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default Files;

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
import Directory from "src/components/Directory";
import createUrlArray from "src/utils/createUrlArray";
import sortByFileType from "src/utils/sortByFileType";

interface Props {
  files: FileType[];
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {

  console.log(context.query.directory)

  if (context.query.directory === undefined) {
    console.log("juu on se undefined")
  } else {
    console.log("mitä vittua")
  }

  const url =
    context.query.directory === undefined
      ? "/"
      : base64.decode(context.query.directory as string);

  console.log("ny siihe o asetettu: " + url)

  const files = await getFilesWebDav(url);

  return {
    props: {
      files: files,
    },
  };
};

const Files: NextPage<Props> = (files) => {

  const router = useRouter();
  const url = router.query.directory === undefined ? ["/"] : base64.decode(router.query.directory as string).split("/");

  const finishedArray = createUrlArray(url)
  const filesSortedArray = sortByFileType(files.files);
  
  return (
    <Layout>
      <div className="flex justify-start text-l">
        <div className="justify-between border-b border-blue-500">
          <ul className="flex flex-row">
            {finishedArray.map((url, index) => {
              return <FilePath key={index} path={url.url} name={url.name}/>;
              }
            )}
          </ul>
        </div>
      </div>

      <div className="pb-2 pt-4">
        <ul className="grid-row grid">
          {filesSortedArray.map((file: FileType) => {  
            if(file.type === "directory") {
              file.url = `/f/${base64.encode(file.filename)}`;
              return <Directory key={file.etag} file={file} />;
            }
            file.url = `/show/${base64.encode(file.filename)}`;
            return <File key={file.etag} file={file} />;
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default Files;


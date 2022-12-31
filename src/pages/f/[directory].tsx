import { GetServerSidePropsContext, type NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import getFilesWebDav from "src/utils/webdav/getFilesWebDav";
import Layout from "../../components/Layout";
import File from "../../components/File";
import Link from "next/link";
import base64 from "base-64";
import FilePath from "src/components/FilePath";
import { useRouter } from "next/router";
import { FileStat } from "webdav";

interface Props {
  files: FileStat[];
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {

    const url = context.query.directory === undefined ? "" : base64.decode(context.query.directory as string);

    const files = await getFilesWebDav(url)

    return {
        props: { 
            files: files,
        },
    };
};

const Files: NextPage<Props> = (files) => {

    return (
        <Layout>
            <div className="flex justify-start text-xl">
                <FilePath />
            </div>

            <div className="py-2">
                <ul className="grid grid-row">
                    {
                        files.files.map((file: FileStat) => {
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
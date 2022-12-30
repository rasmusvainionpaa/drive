import { type NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import getFilesWebDav from "src/utils/webdav/getFilesWebDav";
import Layout from "../../components/Layout";
import File from "../../components/File";
import {FileStat} from "webdav";
import Link from "next/link";

interface Props {
  files: FileStat[];
}

export const getServerSideProps = async (context: any) => {

    const directory = context.query.directory;

    const url = directory.join("/");

    const rawFiles = await getFilesWebDav("/" + url)
    
    const files = JSON.parse(JSON.stringify(rawFiles))

    console.log()

    return {
        props: { 
            files: files,
        },
    };
};

const Files: NextPage<Props> = (files) => {

    return (
        <Layout>
            <div className="mb-5 flex flex-row text-3xl">
                <h1 className="ml-2">
                    <Link href="/">Files / </Link>
                </h1>
            </div>   
            <div className="mb-5">
                <ul className="grid grid-cols-3 gap-4">
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
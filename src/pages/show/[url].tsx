import base64 from "base-64";
import { GetServerSidePropsContext, NextPage } from "next/types";
import Layout from "src/components/Layout";
import getFileContents from "src/utils/webdav/getFileContents";
import Image from "next/image";

interface Props {
    picture: any;
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const url = base64.decode(context.query.url as string);

    const res = JSON.parse(JSON.stringify(await getFileContents(url)));

    console.log("type of res: ",res);

    return {
        props: {
            picture: res,
        },
    };
};

const Show:NextPage <Props> = ({picture}) => {

    console.log("type of pic: ", picture);

    return (
        <Layout>
            <div className="flex flex-row justify-center">
            </div>
        </Layout>
    )
}

export default Show;
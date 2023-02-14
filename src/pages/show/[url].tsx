import base64 from "base-64";
import { GetServerSidePropsContext, NextPage } from "next/types";
import Layout from "src/components/Layout";
import getFileContents from "src/utils/webdav/getFileContents";
import Image from "next/image";

interface Props {
    picture: {
        data: string
    };
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const url = base64.decode(context.query.url as string);

    const res = JSON.parse(JSON.stringify(await getFileContents(url)));

    //  vanha tapa, ei toimi
    //const data = base64.encode(res.data)

    const data = Buffer.from(res.data).toString('base64')

    return {
        props: {
            picture: data,
        },
    };
};

const Show:NextPage<Props> = ({picture}) => {

    return (
        <Layout>
            <div className="">
                <button onClick={() => history.back()}>Back</button>
            </div>
            <div className="flex flex-row justify-center">
                <Image unoptimized src={`data:image/plain;base64,${picture}`} alt='Lacdscape picture' width={400} height={400} />
            </div>
        </Layout>
    )
}

export default Show;
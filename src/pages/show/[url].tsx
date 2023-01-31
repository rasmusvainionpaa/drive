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

    console.log("type of res: ",url);

    const data = base64.encode(res.data);

    return {
        props: {
            picture: data,
        },
    };
};

const Show:NextPage <Props> = ({picture}) => {

    console.log(picture);

    return (
        <Layout>
            <div className="flex flex-row justify-center">
                {picture && <img src={"data:image/jpg;base-64,"+picture} alt='image'></img>}
                <img src={`data:image/jpg;base64,${picture}`} />
                <Image unoptimized src={`data:image/plain;base64,${picture}`} alt='Lacdscape picture' width={400} height={400} />
            </div>
        </Layout>
    )
}

export default Show;
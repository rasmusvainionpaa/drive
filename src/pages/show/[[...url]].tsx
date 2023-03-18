import { GetServerSidePropsContext, NextPage } from "next/types";
import Layout from "src/components/Layout";
import Image from "next/image";
import { GetPreSignedGetUrl } from "src/utils/s3";

interface Props {
    imageUrl: string
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const url = context.query.url as string[]

    const signedUrl = await GetPreSignedGetUrl(url.join("/"))

    return {
        props: {
            imageUrl: JSON.parse(JSON.stringify(signedUrl))
        },
    };
};

const Show:NextPage<Props> = ({imageUrl}) => {

    return (
        <Layout>
            <div className="">
                <button onClick={() => history.back()}>Back</button>
            </div>
            <div className="flex flex-row justify-center">
                <Image src={imageUrl} alt={"kiisu"} width={400} height={400} />
            </div>
        </Layout>
    )
}

export default Show;
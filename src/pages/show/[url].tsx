import base64 from "base-64";
import { GetServerSidePropsContext, NextPage } from "next/types";
import Layout from "src/components/Layout";
import getFileContents from "src/utils/webdav/getFileContents";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
    url: string
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {

    return {
        props: {
            url: context.query.url as string,
        },
    };
};

const Show:NextPage<Props> = ({url}) => {
    const [image, setImage] = useState<string>()

    useEffect(() => {
        fetch("/api/i/" + url)
        .then(res => res.blob())
        .then(blob => URL.createObjectURL(blob))
        .then(img => setImage(img))
    }, [])

    return (
        <Layout>
            <div className="">
                <button onClick={() => history.back()}>Back</button>
            </div>
            <div className="flex flex-row justify-center">
                <img src={image} />
            </div>
        </Layout>
    )
}

export default Show;
import { GetServerSidePropsContext, NextPage } from "next";
import Layout from "src/components/Layout";

interface Props {
    // your props
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    return {
        props: {
            // props for your component
        },
    };
};

const Pictures: NextPage = () => {
    return (
        <Layout>
            <div className="py-2">
                    <ul className="grid grid-row">
                </ul>
            </div>
        </Layout>
    );
}

export default Pictures;
import { GetServerSidePropsContext, NextPage } from "next";
import { getSession } from "next-auth/react";
import Layout from "src/components/Layout";
import { prisma } from "src/server/db/client";
import { GetPreSignedGetUrl } from "src/utils/s3";
import { Item } from "@prisma/client";
import Picture from "src/components/Picture";

interface Props {
  signedImageUrls: string[]
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  const id = session?.user.id as string

  const items = await prisma.user.findMany({
    where: {
      id: id
    },
    select: {
      items: {
        where: {
          mime: {in: ['image/jpg', 'image/jpeg', 'image/png'] }
        }
      }
    }
  })

  const signedImageUrls = await Promise.all((items[0]?.items as Item[]).map(async (item) => {
    return await GetPreSignedGetUrl(item.url);
  }))

  return {
    props: {
      signedImageUrls: JSON.parse(JSON.stringify(signedImageUrls))
    },
  };
}

const Pictures: NextPage<Props> = ({signedImageUrls}) => {
  return (
    <Layout>
      <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-3 sm:grid-flow-row">
        {signedImageUrls.map(url => {
          return (
            <Picture key={url} url={url} />
          )
        })}
      </div>
    </Layout>
  )
}

export default Pictures;
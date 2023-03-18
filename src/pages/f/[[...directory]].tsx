import Layout from "../../components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { GetServerSidePropsContext, NextPage } from "next/types";
import { getSession, useSession } from "next-auth/react";
import { prisma } from "../../server/db/client";
import FileComponent from "src/components/FileComponent";
import { Item } from "@prisma/client";
import { useRouter } from "next/router";
import Directory from "src/components/Directory";
import sortByFileType from "src/utils/sortByFileType";
import createUrlArray from "src/utils/createUrlArray";
import base64 from "base-64";

interface Props {
  currUrl: string
  Files: Item[]
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

  const url =
    context.query.directory === undefined
      ? "/"
      : base64.decode(context.query.directory as string)

  const urlArray = createUrlArray(url)

  console.log("Url array: ", urlArray)

  console.log("Current url: ", url)
      
  try {
    const files = await prisma.user.findMany({
      where: {
        id: id
      },
      select: {
        items: {
          where: {
            folderPath: url as string
          }
        }
      }
    })

    return {
        props: {
          currUrl: url as string,
          Files: sortByFileType(JSON.parse(JSON.stringify(files[0]?.items))),
        },
    };
  } catch(e) {
    console.log(e)
    return {
      props: {
        currUrl: (url + "/"),
      },
    };
  }
};

const Files: NextPage<Props> = ({currUrl, Files}) => {
  const [file, setFile] = useState<any>(null)
  const router = useRouter()

  const uploadFile = async () => {

    // retreave pre-signed url from server
    let { data } = await axios.post("/api/s3/upload", {
      name: file.name,
      type: file.type,
      folder: currUrl,
    });

    // parse pre-signed url
    const url = data.url;

    // send data to bucket with pre-signed url
    await axios.put(url, file, {
      headers: {
        "Content-type": file.type,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Header": "*",
      },
    });
    setFile(null);
    router.reload()
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    if(event.target.files) {
      setFile(event.target.files[0])
    }
    event.target.files = null
  }

  const createFolder = async () => {
    let newFolder = prompt("Folder name")

    if(newFolder == null || newFolder == "") {
      return
    }

    await axios.post("/api/files/folder", {
      folderName: newFolder,
      folderPath: currUrl,
    });
    router.reload()
  }
 
  useEffect(() => {
    if (file) {
      const uploadedFileDetail = async () => await uploadFile();
      uploadedFileDetail();
    }
  }, [file]);

  return (
    <Layout>
      <div>
        <button onClick={() => history.back()}>Go Back</button>
      </div>
      <div>
        <input
          type="file"
          accept="image/*"
          name="image"
          id="selectFile"
          onChange={(e: any) => handleSubmit(e)}
        />
        <button onClick={() => createFolder()}>Create folder</button>
      </div>
      <div>
        <ul>
        {Files && Files.map((file: Item) => {
          if(file.isFolder) {
            return <Directory key={file.id} file={file} />
          }
          return (
            <FileComponent key={file.name} file={file} />
          )
        })}
        </ul>
      </div>
    </Layout>
  );
};

export default Files;


import Image from "next/image";

interface Props {
  url: string
}

const Picture = ({url}: Props) => {
  return (
    <div className="hover:h-full">
      <Image src={url} alt={"kiisu"} width={400} height={400} />
    </div>
  )
}

export default Picture;
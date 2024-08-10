//use client
import useSWR from "swr";
import Image from "next/image";

const fetcher = (path: string) => fetch(path).then((res) => res.json());

const Images = () => {
  const { data } = useSWR<{ Key?: string }[]>("/api/documents", fetcher);
  
  return (
    <>
      {data?.map((image) => (
        <S3Image key={image.Key as string} Key={image.Key as string} />
      ))}
    </>
  );
};

const S3Image = ({ Key }: { Key: string }) => {
  const { data } = useSWR<{ src: string }>(`/api/documents/${Key}`, fetcher);
  
  return (
    <>
      {data ? <Image src={data.src} alt='unknown' /> : <p>Loading...</p>}
    </>
  );
};

export const ProgressPicsImageShelf = () => {
  return (
    <div>
      <h1>Progress Pics</h1>
      <Images />
    </div>
  );
};

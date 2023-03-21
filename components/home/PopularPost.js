import { useEffect, useState } from "react";
import { Title } from "../PanelPrimary.js";
import Image from "next/image";

const PopularPost = ({ lastPost }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    if (lastPost) {
      setNews(lastPost.filter(elem => elem.title == "opinión")[0]?.post);
    }
  }, [lastPost]);


  return (
    <div className="shadow-md border-gray-100 border p-2 gap-4 grid grid-cols-1 w-full font-body">
      {news?.map((item, idx) => (
        <Post key={idx} noticia={item} />
      ))}
    </div>
  );
};

export default PopularPost;

const Post = ({ noticia }) => {
  const LoaderImage = ({ src, width, quality }) => {
    //const domain = process.env.NEXT_PUBLIC_API_URL;
    const domain = process.env.NEXT_PUBLIC_API_URL_new;
    return `${domain}${src}`;
  };
  return (
    <div className="grid grid-cols-3 items-center justify-start">
      <span className="w-16 h-16 rounded-full relative overflow-hidden">
        <Image
          loader={LoaderImage}
          src={`${noticia?.imgMiniatura?.i640}`}
          alt={noticia?.title}
          objectFit={"cover"}
          objectPosition={"center"}
          layout={"fill"}
        />
      </span>
      <span className="col-span-2 flex flex-col items-start justify-center">
        <Title
          titulo={noticia?.title}
          size={"md"}
          font={"body"}
          slug={noticia?.slug}
        />
      </span>
    </div>
  );
};

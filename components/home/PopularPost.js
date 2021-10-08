import { useEffect, useState } from "react";
import { api } from "../../api.js";
import { AutorLine, Title } from "../PanelPrimary.js";
import Image from "next/image";

const PopularPost = ({ noticias }) => {
  const [news, setNews] = useState([]);
  const fetchNews = async () => {
    const { data } = await api.FetchNews({
      _limit: 6,
      _sort: "createdAt:DESC",
    });
    setNews(data);
  };
  useEffect(() => {
    if (noticias) {
      setNews(Object.values(noticias?.Opinión));
    } else {
      fetchNews();
    }
  }, [noticias]);

  return (
    <div className="bg-white shadow-md border-gray-100 border p-8 gap-10 grid grid-cols-1 w-full font-body">
      {news?.map((item, idx) => (
        <Post key={idx} noticia={item} />
      ))}
    </div>
  );
};

export default PopularPost;

const Post = ({ noticia }) => {
  const LoaderImage = ({ src, width, quality }) => {
    const domain = process.env.NEXT_PUBLIC_API_URL;
    return `${domain}${src}`;
  };
  return (
    <div className="grid grid-cols-3 items-center justify-start">
      <span className="w-14 h-14 rounded-full relative overflow-hidden">
        <Image
          loader={LoaderImage}
          src={`${noticia?.imgPrincipal?.url}`}
          alt={noticia?.title}
          objectFit={"cover"}
          objectPosition={"center"}
          layout={"fill"}
        />
      </span>
      <span className="col-span-2 block flex flex-col items-start justify-center">
        <Title
          titulo={noticia?.title}
          size={"sm"}
          font={"body"}
          slug={noticia?.slug}
        />
      </span>
    </div>
  );
};

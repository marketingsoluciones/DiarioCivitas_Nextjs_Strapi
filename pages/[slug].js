import React, { useEffect, useState } from "react";
import { api } from "../api";
import BreadCumbs from "../components/BreadCumbs.js";
import { useRouter } from "next/router";
import { Markup } from "interweave";
import DisqusComments from "../components/DisqusComments.js";
import TagCategory from "../components/news/TagCategory.js";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "../components/icons.js";
import { News } from "../components/EditorPicks.js";
import PopularPost from "../components/home/PopularPost.js";
import Suscribed from "../components/home/Suscribed.js";
import SocialLinks from "../components/home/SocialLinks.js";
import { AutorLine } from "../components/PanelPrimary.js";
import Head from "next/head";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Post = ({ PostData }) => {
  const url = "https://api.diariocivitas.com/uploads/";
  const router = useRouter();
  console.log(PostData);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad : true,
    fade : true,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear"
  };
  return (
    <>
      <Head>
        <meta name="description" content={PostData?.seoDescription} />
        <title>{PostData?.title?.slice(0, 70)} | Diario Civitas</title>
      </Head>
      <div className="w-full md:max-w-screen-lg py-10 flex flex-col gap-8 mx-auto inset-x-0 px-5 bg-white">
        <BreadCumbs router={router} />
        <section className="w-full grid md:grid-cols-3 gap-12 ">
          <div className="md:col-span-2 flex flex-col justify-center gap-4">
            <h1 className="font-display font-bold text-2xl md:text-3xl text-justify ">
              {PostData?.title}
            </h1>
            {/* <h2 className="font-display text-gray-400 font-light text-md md:text-lg text-justify ">Aqui va el subtitulo</h2> */}
            <TagCategory categories={PostData?.postcategorias} />
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${PostData?.imgPrincipal?.url}`}
              className="w-full h-96 object-cover rounded-lg"
              alt={PostData?.imgPrincipal?.alternativeText}
            />
            <p className="text-xs font-light text-gray-900">Cortesía/Fuente</p>
            <AutorLine
              date={
                PostData?.dateCreated <= PostData?.createdAt
                  ? PostData?.dateCreated
                  : PostData.createdAt
              }
            />
            <article className="grid md:grid-cols-8 py-2 gap-6 w-full">
              <div className="flex md:col-span-1 w-full md:flex-col gap-2 items-center justify-start">
                <SocialMediaIcons />
              </div>
              <div className="md:col-span-7 text-justify font-body text-sm leading-relaxed overflow-hidden">
                <Markup
                  content={PostData.content
                    .replace("/uploads/", `${url}`)
                    .replace("https://diariocivitas.com/uploads/", `${url}`)}
                  containerTagName="article"
                  allowAttributes={true}
                  allowElements={true}
                />
                {PostData?.ImgCarrusel && (
                    <Slider {...settings}  className="my-10 flex">
                      {PostData?.ImgCarrusel.map((item, idx) => (
                        <div
                          key={idx}
                          className="w-full h-96 rounded-xl relative overflow-hidden"
                        >
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}${item?.url}`}
                            className="absolute w-full h-full object-cover object-top"
                            alt={item?.alternativeText}
                          />
                          <h3 className="text-white absolute bottom-4 left-4 font-display">
                            {item?.caption}
                          </h3>
                        </div>
                      ))}
                    </Slider>
                )}
              </div>
              <BlockTags list={PostData?.tags} />
            </article>

            <RelatedArticles />
            <DisqusComments post={PostData} />
          </div>
          <aside className="hidden ... md:flex flex-col gap-6 ">
            {/* <PopularPost /> */}
            <Suscribed />
            <SocialLinks />
            <img src={"/ads.png"} className="object-contain w-full p-1" />
          </aside>
        </section>
      </div>
    </>
  );
};

export default Post;

export const getStaticProps = async ({ params }) => {
  const parametros = {
    slug: params.slug,
  };
  try {
    const { data } = await api.FetchNews(parametros);
    return {
      props: {
        PostData: data[0],
      },
      revalidate: 10,
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        PostData: {},
      },
    };
  }
};

export async function getStaticPaths() {
  const { data } = await api.FetchNews();

  return {
    paths: data?.map((item) => {
      return {
        params: {
          slug: item?.slug,
        },
      };
    }),
    fallback: "blocking",
  };
}

export const SocialMediaIcons = () => {
  return (
    <>
      <div className="h-10 w-10 rounded-full bg-blue-700 grid place-items-center">
        <FacebookIcon className="text-white w-5 h-5" />
      </div>
      <div className="h-10 w-10 rounded-full bg-blue-500 grid place-items-center">
        <TwitterIcon className="text-white w-5 h-5" />
      </div>
      <div className="h-10 w-10 rounded-full bg-pink-600 grid place-items-center">
        <InstagramIcon className="text-white w-5 h-5" />
      </div>
    </>
  );
};

const BlockTags = ({ list }) => {
  const ItemTag = ({ data }) => {
    return (
      <div className="font-body text-xs text-white w-max bg-gray-700 px-2 py-1 rounded-md capitalize ">
        {data}
      </div>
    );
  };
  return (
    <div className="flex gap-2 items-center w-full flex-wrap md:flex-nowrap ">
      <p className="font-body text-sm text-gray-900">Etiquetas</p>
      {list?.map((item, idx) => {
        return <ItemTag key={idx} data={item.tag} />;
      })}
    </div>
  );
};

const RelatedArticles = () => {
  const [news, setNews] = useState();
  const FetchNews = async () => {
    const params = {
      _limit: 3,
    };

    try {
      const { data } = await api.FetchNews(params);
      setNews(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    FetchNews();
  }, []);
  return (
    <div className="border-t border-b pb-10 py-6 border-gray-200 w-full">
      <h3 className="font-body text-lg font-semibold uppercase pb-4">
        Noticias Relacionadas
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        {news?.map((item, idx) => (
          <News key={idx} noticia={item} />
        ))}
      </div>
    </div>
  );
};

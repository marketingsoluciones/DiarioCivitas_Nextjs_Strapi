import React, { useEffect, useState } from "react";
import { Markup } from "interweave";
import DisqusComments from "../components/DisqusComments.js";
import TagCategory from "../components/news/TagCategory.js";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  WhatsAppIcon,
} from "../components/icons.js";
import { News } from "../components/EditorPicks.js";
import Suscribed from "../components/home/Suscribed.js";
import SocialLinks from "../components/home/SocialLinks.js";
import { AutorLine } from "../components/PanelPrimary.js";
import Head from "next/head";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { fetchApi } from "../utils/Fetching.js";
import { useRouter } from "next/router.js";


const Post = ({ PostData }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  const LoaderImage = ({ src }) => {
    //const domain = process.env.NEXT_PUBLIC_API_URL;
    const domain = process.env.NEXT_PUBLIC_API_URL_new;
    return `${domain}${src}`;
  };

  const {query} = useRouter()
  const noticia = query.slug


  return (
    <>
      <Head>
        <meta name="description" content={PostData?.seoDescription} />
        <title>{PostData?.title?.slice(0, 70)} | Diario Civitas</title>
        <meta property="og:image" content={PostData?.imgMiniatura?.i320} />
        <meta property="og:title" content={PostData?.title} />
        <meta property="og:description" content={PostData?.seoDescription} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="keywords" content={`noticia, novedad, actualidad, que sucede, ${noticia}, que pasa con ${noticia}, que sucede en ${noticia}`}/>
      </Head>
      <div className="w-full md:max-w-screen-lg py-10 flex flex-col gap-8 mx-auto inset-x-0 px-5 bg-white">
        <section className="w-full grid md:grid-cols-3 gap-12 ">
          <div className="md:col-span-2 flex flex-col justify-center gap-4">
            <h1 className="font-display font-bold text-2xl md:text-3xl text-justify ">
              {PostData?.title}
            </h1>
            {/* <h2 className="font-display text-gray-400 font-light text-md md:text-lg text-justify ">Aqui va el subtitulo</h2> */}
            <TagCategory categories={PostData?.subCategories} />
            <Image
              loader={LoaderImage}
              src={`${PostData?.imgMiniatura?.i640}`}
              alt={PostData?.title}
              objectFit={"cover"}
              objectPosition={"center"}
              width={100}
              height={70}
              className="rounded-lg overflow-hidden"
              layout={"responsive"}
            />
            <p className="text-xs font-light text-gray-900">Cortesía/Fuente</p>
            <AutorLine
              author={PostData?.authorUsername}
              date={PostData?.createdAt}
            />
            <article className="grid md:grid-cols-8 py-2 gap-6 w-full">
              <div className="flex md:col-span-1 w-full md:flex-col gap-2 items-center justify-start">
                <SocialMediaIcons
                  title={PostData?.title}
                  url={PostData?.slug}
                />
              </div>
              <div className="md:col-span-7 text-justify font-body text-sm leading-relaxed overflow-hidden">
                <Markup
                  content={PostData?.content
                    ?.replace(/src=\"https:\/\/diarioCivitas.com\/uploads\//g, "src=\"https://api.diarioCivitas.com/uploads/")
                    ?.replace(/src=\"\/uploads\//g, "src=\"https://api.diarioCivitas.com/uploads/")}
                  containerTagName="article"
                  allowAttributes={true}
                  allowElements={true}
                />
                {PostData?.ImgCarrusel?.length >= 1 && (
                  <>
                    <h2 className="text-gray-700 text-xl font-display">
                      Más imagenes
                    </h2>
                    <Slider {...settings} className="mb-10 my-3 object-cover flex">
                      {PostData?.ImgCarrusel.map((item, idx) => (
                        <div
                          key={idx}
                          className="w-full h-96 rounded-xl relative overflow-hidden"
                        >
                          <Image
                            loader={LoaderImage}
                            src={`${item?.url}`}
                            alt={item?.alternativeText}
                            objectFit={"cover"}
                            objectPosition={"center"}
                            layout={"fill"}
                          />

                          <h3 className="text-white absolute bottom-4 left-4 font-display">
                            {item?.caption}
                          </h3>
                        </div>
                      ))}
                    </Slider>
                  </>
                )}
              </div>
              <BlockTags list={PostData?.tags} />
            </article>

            <RelatedArticles />
            <DisqusComments post={PostData} />
          </div>
          <aside className="hidden ... md:flex flex-col gap-6 ">
            <Suscribed />
            <SocialLinks />
            <div>
              <Image
                alt="ads"
                src={"/ads.png"}
                objectFit={"contain"}
                objectPosition={"center"}
                width={"100vw"}
                height={"100vw"}
                layout={"responsive"}
              />
            </div>
          </aside>
        </section>
      </div>
    </>
  );
};

export default Post;

export const getStaticProps = async ({ params }) => {

  try {
    const post = await fetchApi({
      query: `query($slug:String) {
          getOnePost(slug:$slug ){
            _id
            title
            seoDescription
            content
            subTitle
            slug
            postFormat
            authorUsername
            createdAt
            seoDescription
            postFormat
            tags
            imgMiniatura{
              i800
              i640
              i320
            }
            imgCarrusel{
              i800
              i640
              i320
            }
            categories{
              _id
              title
            }
            subCategories{
              _id
              title
            }
          }
        }`,
      variables: {
        slug: params?.slug,
        development: "diariocivitas"
      }
    })
    return {
      props: {
        PostData: post,
      },
      revalidate: 300,
    };
  } catch (error) {
    console.log(10051, "he aqui un error");
    console.log(10052, error);
    return {
      props: {
        PostData: {},
      },
    };
  }
};

export async function getStaticPaths() {
  const resp = await fetchApi({
    query: `query($limit:Int, $development: String!) {
          getAllPost(limit:$limit, development:$development ){
            results{
              slug
            }
          }
        }`,
    variables: {
      //limit: 5,
      development: "diariocivitas"
    }
  })

  const paths = resp?.results?.map((item, idx) => {
    return {
      params: {
        slug: item?.slug,
      },
    };
  })
  return {
    paths: paths,
    fallback: "blocking",
  };
}

export const SocialMediaIcons = ({ title, url }) => {
  const urlFinal = `https://diariocivitas.com/${url}`
  return (
    <>
      <a className="h-10 w-10 rounded-full hover:bg-blue-300 bg-blue-500 grid duration-300 transition hover:scale-110 hover:rotute-6 place-items-center" href={`https://twitter.com/intent/tweet?url=${urlFinal}&text=${title}&via=diariocivitas`} target="_blank">
        <TwitterIcon className="text-white w-5 h-5" />
      </a>
      <a className="h-10 w-10 rounded-full hover:bg-blue-500 bg-blue-700 grid duration-300 transition hover:scale-110 hover:rotute-6 place-items-center" href={`https://www.facebook.com/sharer/sharer.php?u=${urlFinal}&text=${title}&via=diariocivitas`} target="_blank">
        <FacebookIcon className="text-white w-5 h-5" />
      </a>
      {/* <a className="h-10 w-10 rounded-full hover:bg-pink-700 bg-pink-500 grid duration-300 transition hover:scale-110 hover:rotute-6 place-items-center" href={`https://www.instagram.com/sharer/sharer.php?u=${urlFinal}&text=${title}&via=diariocivitas`} target="_blank">
        <InstagramIcon className="text-white w-5 h-5" />
      </a> */}
      <a className="h-10 w-10 rounded-full hover:bg-green-800 bg-green-600 grid duration-300 transition hover:scale-110 hover:rotute-6 place-items-center" href={`https://api.whatsapp.com/send?text=${title}&url=${urlFinal}`} target="_blank">
        <WhatsAppIcon className="text-white w-5 h-5" />
      </a>
    </>
  );
};

const ItemTag = ({ data }) => {
  return (
    <div className="font-body text-xs text-white w-max bg-gray-700 px-2 py-1 rounded-md capitalize ">
      {data}
    </div>
  );
};

const BlockTags = ({ list }) => {
  return (
    <div className="flex gap-2 items-center w-full flex-wrap md:flex-nowrap ">
      <p className="font-body text-sm text-gray-900">Etiquetas</p>
      {list?.map((item, idx) => {
        return <ItemTag key={idx} data={item} />;
      })}
    </div>
  );
};

const RelatedArticles = () => {
  const [news, setNews] = useState();
  const FetchNews = async () => {
    try {
      const resp = await fetchApi({
        query: `query($sort: sortCriteriaPost, $limit : Int, $skip : Int, $development: String!) {
          getAllPost( limit : $limit, skip: $skip, sort:$sort, development:$development ){
            results{
              _id
              title
              subTitle
              slug
              postFormat
              authorUsername
              createdAt
              imgMiniatura{
                i640
                i320
              }
            }
          }
        }`,
        variables: {
          skip: 0,
          limit: 3,
          sort: { createdAt: -1 },
          development: "diariocivitas"
        }
      })

      setNews(resp?.results);
    } catch (error) {
      console.log(1006, error);
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

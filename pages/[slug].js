import React, { useEffect, useState } from 'react'
import { api } from '../api';
import BreadCumbs from '../components/BreadCumbs.js';
import { useRouter } from 'next/router'
import { Markup } from 'interweave';
import DisqusComments from '../components/DisqusComments.js';
import TagCategory from '../components/News/TagCategory.js';
import { FacebookIcon, InstagramIcon, TwitterIcon } from '../components/icons.js';
import { News } from '../components/EditorPicks.js';
import PopularPost from '../components/Home/PopularPost.js';
import Suscribed from '../components/Home/Suscribed.js';
import SocialLinks from '../components/Home/SocialLinks.js';
import { AutorLine } from '../components/PanelPrimary.js';
import Head from 'next/head';


const Post = ({ PostData }) => {
  console.log(PostData)
  const router = useRouter()
  return (
    <>
      <Head>
        <meta name="description" content="Hola mundo" />
      </Head>
      <div className="max-w-screen-lg py-10 flex flex-col gap-8 mx-auto inset-x-0 px-5 bg-white">
        <BreadCumbs router={router} />
        <section className="grid md:grid-cols-3 gap-16">
          <div className="col-span-2 flex flex-col justify-center gap-4">
            <h1 className="font-display font-bold text-2xl md:text-3xl text-justify ">{PostData?.title}</h1>
            {/* <h2 className="font-display text-gray-400 font-light text-md md:text-lg text-justify ">Aqui va el subtitulo</h2> */}
            <TagCategory categories={PostData?.postcategorias} />
            <img src={`${process.env.NEXT_PUBLIC_API_URL}${PostData?.imgPrincipal?.url}`} className="w-full h-96 object-cover rounded-lg" alt={PostData?.imgPrincipal?.alternativeText} />
            <p className="text-xs font-light text-gray-900">Cortesía/Fuente</p>
            <AutorLine date={PostData?.dateCreated <= PostData?.createdAt ? PostData?.dateCreated : PostData.createdAt} />
            <article className="grid md:grid-cols-8 py-2 gap-6">
              <div className="flex col-span-1 w-full md:flex-col gap-2 items-center justify-start">
                <SocialMediaIcons />
              </div>
              <div className="md:col-span-7 text-justify font-body text-sm leading-relaxed overflow-hidden">
                <Markup content={PostData?.content} containerTagName="article" allowAttributes={true} allowElements={true} />
              </div>
              <BlockTags list={PostData?.postcategorias} />
            </article>
            <RelatedArticles />
            <DisqusComments post={PostData} />
          </div>
          <aside className="... md:flex flex-col gap-6 hidden">
            <PopularPost />
            <Suscribed />
            <SocialLinks />
            <img src={"/ads.png"} className="object-contain w-full p-1" />
          </aside>
        </section>
      </div>
    </>
  )
}

export default Post

export const getStaticProps = async ({ params }) => {
  const parametros = {
    slug : params.slug
  }
  try {
    const { data } = await api.FetchNews(parametros)
    return {
      props: {
        PostData: data[0]
      },
      revalidate: 10
    };
  } catch (error) {
    console.log(error)
  }
  
};

export async function getStaticPaths() {

  const { data } = await api.FetchNews()

  return {
    paths: data.map(item => {
      return {
        params: {
          slug: item?.slug,
        }
      }
    }),
    fallback: 'blocking'
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
  )
}


const BlockTags = ({ list }) => {

  const ItemTag = ({ data }) => {
    return (
      <div className="font-body text-xs text-white w-max bg-gray-700 px-2 py-1 rounded-md">{data.categorie}</div>
    )
  }
  return (
    <div className="flex gap-2 items-center w-full ">
      <p className="font-body text-sm text-gray-900">Etiquetas</p>
      {list?.map((item, idx) => {
        return (
          <ItemTag key={idx} data={item} />
        )
      })}
    </div>
  )
}


const RelatedArticles = () => {
  const [news, setNews] = useState()
  const FetchNews = async () => {
    const params = {
      _limit: 3,
    }

    try {
      const { data } = await api.FetchNews(params)
      setNews(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    FetchNews()
  }, [])
  return (
    <div className="border-t border-b pb-10 py-6 border-gray-200">
      <h3 className="font-body text-lg font-semibold uppercase pb-4">Noticias Relacionadas</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {news?.map((item,idx)=> (
          <News key={idx} noticia={item} />
        ))}
      </div>
    </div>
  )
}


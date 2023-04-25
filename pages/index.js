import React, { useEffect } from "react";
import GridNews from "../components/GridNews.js";
import PopularPost from "../components/home/PopularPost.js";
import SocialLinks from "../components/home/SocialLinks.js";
import Suscribed from "../components/home/Suscribed.js";
import PanelPrimary from "../components/PanelPrimary.js";
import CategoryBlock from "../components/CategoryBlock.js";
import EditorPicks from "../components/EditorPicks.js";
import Image from "next/image";
import Head from 'next/head'
import { fetchApi, queries } from "../utils/Fetching";
import { SidebarContextProvider } from "../context/SidebarContext.js";

const Home = (props) => {
  const {home, setHome} = SidebarContextProvider()

  useEffect(()=>{
    setHome(props)
  },[props])
  
  return (
    <>
      <Head>
        <meta name="description" content={"El periodico digital más grande de Murcia, Lorca, Alicante y Puerto Lumbreras | Noticias más destacadas del acontecer local, regional y nacional"} />
        <meta name="keywords" content="periodico digital, periodico digital mas grande de murcia, lorca, noticias mas destacadas, acontecer local, ultima hora en noticias de murcia, que sudece en murcia, politica, deporte, cultura, noticias de la region de murcia, opinion" />
      </Head>
      <section className="max-w-screen-lg mx-auto inset-x-0 md:py-8 flex flex-col gap-10 px-5 bg-white">
        <h1 className="hidden">Diario Civitas</h1>
        {/* <HeaderNews titulos={noticias?.map((noticia) => noticia.titulo)} /> */}
        <PanelPrimary noticias={props?.ultimasNoticias} />
        <div className="w-full grid md:grid-cols-3 gap-4">
          <GridNews lastPost={props?.lastPost} />
          <PanelSidebar lastPost={props?.lastPost} />
        </div>
        <div className="w-full h-max py-6 block">
          <Image
            alt="civitas.com"
            src="/ad.png"
            objectFit={"contain"}
            height={10}
            width={"100vw"}
            layout={"responsive"}
          />
        </div>
        <EditorPicks noticias={props?.ultimasNoticias} />
        <div className="hidden md:grid grid-cols-2 gap-4 -mt-10">
          <CategoryBlock
            title={"Murcia"}
            lastPost={props.lastPost.filter(elem => elem.title == "locales murcia")[0]?.post}
          />
          <CategoryBlock
            title={"Puerto Lumbreras"}
            lastPost={props.lastPost.filter(elem => elem.title == "locales puerto lumbreras")[0]?.post}
          />
          <CategoryBlock
            title={"Lorca"}
            lastPost={props.lastPost.filter(elem => elem.title == "locales lorca")[0]?.post}
          />
          <CategoryBlock
            title={"Pulpí"}
            lastPost={props.lastPost.filter(elem => elem.title == "pulpí")[0]?.post}
          />
        </div>
      </section>
    </>
  );
};

export default Home;

export const PanelSidebar = ({ lastPost }) => {
  return (
    <div className="hidden md:flex w-full h-full flex-col items-center gap-10 ">
      <PopularPost lastPost={lastPost} />
      <Suscribed />
      <SocialLinks />
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const lastPost = await fetchApi({
      query: queries.lastPost,
      variables: { development: "diariocivitas" }
    });
    const lastPostForCategorie = await fetchApi({
      query: queries.lastPostForCategorie,
      variables: { development: "diariocivitas" }
    });
    return {
      props: {
        ultimasNoticias: lastPost?.post,
        lastPost: lastPostForCategorie,
      }
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}

import React, { useEffect, useState } from "react";
import { api } from "../api";
import GridNews from "../components/GridNews.js";
import PopularPost from "../components/home/PopularPost.js";
import SocialLinks from "../components/home/SocialLinks.js";
import Suscribed from "../components/home/Suscribed.js";
import PanelPrimary from "../components/PanelPrimary.js";
import CategoryBlock from "../components/CategoryBlock.js";
import EditorPicks from "../components/EditorPicks.js";
import Image from "next/image";

const Home = (props) => {
  
  return (
    <section className="max-w-screen-lg mx-auto inset-x-0 md:py-8 flex flex-col gap-10 px-5 bg-white">
      <h1 className="hidden">Diario Civitas</h1>
      {/* <HeaderNews titulos={noticias?.map((noticia) => noticia.titulo)} /> */}
      <PanelPrimary noticias={props?.ultimasNoticias} />
      <div className="w-full grid md:grid-cols-3 gap-10">
        <GridNews noticias={props?.categorias} />
        <PanelSidebar noticiasOpinion={props?.categorias} />
      </div>
      <div className="w-full h-max py-6 block">
        <Image
          src="/ad.png"
          objectFit={"contain"}
          height={10}
          width={"100vw"}
          layout={"responsive"}
        />
      </div>
      <EditorPicks noticias={props?.ultimasNoticias} />
      <div className="hidden md:grid grid-cols-2 gap-10 -mt-10">
        <CategoryBlock
          title={"Murcia"}
          noticias={props?.categorias["Locales Murcia"]}
        />
        <CategoryBlock
          title={"Puerto Lumbreras"}
          noticias={props?.categorias["Locales Puerto Lumbreras"]}
        />
        <CategoryBlock
          title={"Lorca"}
          noticias={props?.categorias["Locales Lorca"]}
        />
        <CategoryBlock title={"Pulpí"} noticias={props?.categorias?.Pulpí} />
      </div>
    </section>
  );
};

export default Home;

export const PanelSidebar = ({ noticiasOpinion }) => {
  return (
    <div className="hidden md:flex w-full h-full flex-col items-center gap-10 ">
      <PopularPost noticias={noticiasOpinion} />
      <Suscribed />
      <SocialLinks />
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    console.time("nuevo1");
    const { data: ultimasNoticias } = await api.FetchNews({
      _limit: 10,
      _sort: "createdAt:DESC",
    });
    console.timeEnd("nuevo1");
    console.time("nuevo2");
    const { data } = await api.FetchHome();
    console.timeEnd("nuevo2");
    return {
      props: {
        ultimasNoticias: ultimasNoticias,
        categorias: data?.lastPost?.ultimosPost,
      },
    };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
}

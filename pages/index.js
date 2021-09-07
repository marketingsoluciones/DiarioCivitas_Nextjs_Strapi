import React, { useState } from "react";
import { api } from "../api";
import CategoryBlock from "../Components/CategoryBlock";
import EditorPicks from "../Components/EditorPicks";
import GridNews from "../Components/GridNews";
import HeaderNews from "../Components/HeaderNews";
import PopularPost from "../Components/Home/PopularPost";
import SocialLinks from "../Components/Home/SocialLinks";
import Suscribed from "../Components/Home/Suscribed";
import PanelPrimary from "../Components/PanelPrimary";

const Home = (props) => {
  const {ultimasNoticias, grid, opinion, locales} = props
  const [noticias, setNoticias] = useState(ultimasNoticias);

  return (
    <section className="max-w-screen-lg mx-auto inset-x-0 py-8 flex flex-col gap-10 px-5 bg-white px-4">
      {/* <HeaderNews titulos={noticias?.map((noticia) => noticia.titulo)} /> */}
      <PanelPrimary noticias={noticias} />
      <div className="w-full grid md:grid-cols-3 gap-10">
        <GridNews noticias={grid} />
        <PanelSidebar noticiasOpinion={opinion} />
      </div>
     <div className="w-full py-6 flex items-center justify-center">
        <img src="/ad.png" className="object-contain" />
     </div>
     <EditorPicks noticias={noticias} />
     <div className="hidden md:grid grid-cols-2 gap-10 -mt-10">
      <CategoryBlock  title={"Murcia"} noticias={locales?.murcia}/>
      <CategoryBlock  title={"Puerto Lumbreras"} noticias={locales?.puertoLumbreras}/>
      <CategoryBlock  title={"Lorca"} noticias={locales?.lorca}/>
      <CategoryBlock  title={"Pulpí"} noticias={locales?.pulpi}/>
     </div>
    </section>
  );
};

export default Home;



export const PanelSidebar = ({noticiasOpinion}) => {
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
    console.log("estoy pidiendo la data")
    const { data:ultimasNoticias } = await api.FetchNews({_limit : 10, _sort : "createdAt:DESC"})
    const { data:deportes } = await api.FetchNews({"postcategorias.slug" : "deportes", _sort : "createdAt:DESC", _limit: 6})
    const { data:sucesos } = await api.FetchNews({"postcategorias.slug" : "sucesos", _sort : "createdAt:DESC", _limit: 6})
    const { data:politica } = await api.FetchNews({"postcategorias.slug" : "politica", _sort : "createdAt:DESC", _limit: 6})
    const { data:actualidad } = await api.FetchNews({"postcategorias.slug" : "actualidad", _sort : "createdAt:DESC", _limit: 6})
    const { data:opinion } = await api.FetchNews({"postcategorias.slug" : "opinion", _sort : "createdAt:DESC", _limit: 4})
    const { data:murcia } = await api.FetchNews({"postcategorias.slug" : "murcia", _sort : "createdAt:DESC", _limit: 5})
    const { data:lorca } = await api.FetchNews({"postcategorias.slug" : "lorca", _sort : "createdAt:DESC", _limit: 5})
    const { data:pulpi } = await api.FetchNews({"postcategorias.slug" : "pulpi", _sort : "createdAt:DESC", _limit: 5})
    const { data:puertoLumbreras } = await api.FetchNews({"postcategorias.slug" : "puerto-lumbreras", _sort : "createdAt:DESC", _limit: 5})
    return {
      props: { ultimasNoticias, opinion, grid: {deportes, sucesos, politica, actualidad}, locales: {murcia, lorca, puertoLumbreras, pulpi} },
    }
  } catch (error) {
    console.log(error)
    return {props : {}}
  }
  
}

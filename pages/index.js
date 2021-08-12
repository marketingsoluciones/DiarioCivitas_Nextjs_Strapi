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

const index = (props) => {
  const [noticias, setNoticias] = useState(props.data);
  const Ultimasnoticias = noticias.slice(0, 4);


  return (
    <section className="xl:max-w-screen-xl mx-auto inset-x-0 py-8 flex flex-col gap-10">
      <HeaderNews titulos={noticias?.map((noticia) => noticia.titulo)} />
      <PanelPrimary noticias={noticias} />
      <div className="w-full grid grid-cols-3 gap-10">
        <GridNews noticias={noticias} />
        <PanelSidebar noticias={noticias} />
      </div>
     <div className="w-full py-6 flex items-center justify-center">
        <img src="/ad.png" className="object-contain" />
     </div>
     <EditorPicks noticias={noticias} />
     <div className="grid grid-cols-2 gap-10 -mt-10">
      <CategoryBlock noticias={noticias}/>
      <CategoryBlock noticias={noticias}/>
      <CategoryBlock noticias={noticias}/>
      <CategoryBlock noticias={noticias}/>
     </div>
    </section>
  );
};

export default index;



export const PanelSidebar = (props) => {
  const { noticias } = props;
  return (
    <div className="w-full h-full flex flex-col justify-between ">
      <PopularPost />
      <Suscribed />
      <SocialLinks />
    </div>
  );
};





export async function getServerSideProps(context) {
  const { data } = await api.FetchNews()
  return {
    props: { data },
  }
}
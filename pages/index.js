import Link from "next/link";
import React, { useEffect, useState } from "react";
import { api } from "../api";
import HeaderNews from "../Components/HeaderNews";
import { EmailIcon, FacebookIcon, InstagramIcon, TwitterIcon } from "../Components/icons";

const index = () => {
  const [noticias, setNoticias] = useState([]);

  const Ultimasnoticias = noticias.slice(0, 4);

  useEffect(() => {
    try {
      api.FetchNews().then(({ data }) => setNoticias(data));
      
    } catch (error) {
      console.log(error)
    }
  }, []);

  return (
    <div className="py-8 px-3 md:px-0 w-full md:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg flex flex-col items-center justify-center w-full">
      <HeaderNews titulos={noticias.map((noticia) => noticia.titulo)} />
      <PanelPrimary noticias={Ultimasnoticias} />
      <div className="w-full flex gap-12">
        <PanelSecondary noticias={Ultimasnoticias} />
      </div>
    </div>
  );
};

export default index;

export const PanelPrimary = (props) => {
  const { noticias } = props;
  return (
    <div className="w-full h-full my-6 flex flex-col md:flex-row gap-4">
      {noticias.map((noticia, index) => {
        if (index == 0) {
          return <ViewBig key={index} noticia={noticia} />;
        }
      })}
      <div className="w-full md:w-1/2 float-right h-full flex-col flex gap-4">
        {noticias.map((n, i) =>
          i >= 1 ? <ViewHorizontalMedium key={i} noticia={n} /> : null
        )}
      </div>
    </div>
  );
};

export const ViewBig = (props) => {
  const { noticia } = props;

  return (
    <div className="w-full md:w-1/2 relative bg-white shadow-md rounded-lg overflow-hidden">
      <div className="w-full h-full">
        <div className="bg-gray-900 h-60 relative overflow-hidden">
          <img src={noticia.imagen} alt="aied" />
          
        </div>
        <div className="content px-5 py-5">
          <Link href={noticia.rutaURL}>
            <h2 className="hover:text-blue-500 transition cursor-pointer text-3xl font-body font-bold tracking-tighter text-primary">
              {noticia.titulo}
            </h2>
          </Link>
          <p className="text-xs font-display pt-2">
            {noticia.autor} | {noticia.createdAt}
          </p>
          <div className="rounded bg-red-500 grid place-items-center w-1/4 h-6">
          <p className="text-white font-display text-xs">
            {noticia.categorias[1]}
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export const ViewHorizontalMedium = (props) => {
  const { noticia } = props;
  return (
    <div className="w-full float-right h-max shadow-md rounded-lg overflow-hidden bg-white flex gap-2 justify-between">
      <div className="w-1/2 h-28 flex items-center relative">
        <img src={noticia.imagen} alt={noticia.titulo} />
      </div>
      <div className="w-1/2 py-2 px-2">
      <Link href={noticia.rutaURL}>
        <h2 className="hover:text-blue-500 transition cursor-pointer text-md font-body font-semibold tracking-tighter text-primary">
          {noticia.titulo}
        </h2>
        </Link>
        <p className="text-xs font-display py-2">
          {noticia.autor} | {noticia.createdAt}
        </p>
        <div className="rounded bg-red-500 grid place-items-center w-1/4 h-6">
          <p className="text-white font-display text-xs">
            {noticia.categorias[1]}
          </p>
        </div>
      </div>
    </div>
  );
};

export const PanelSecondary = (props) => {
  const { noticias } = props;
  const [state, setState] = useState(0);
  const categorias = ["Actualidad", "Deportes", "Politica", "Locales"];

  const handleClickTab = (e, i) => {
    e.preventDefault();
    setState(i);
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="border-t-2 border-gray-400 w-full md:w-2/3 h-full my-10">
        <div className="w-full py-4 flex flex-col md:flex-row items-center justify-between ">
          <h3 className="font-display font-semibold text-xl uppercase py-2 text-primary">
            Ultimas Noticias
          </h3>
          <ul className="flex gap-4">
            {categorias.map((categoria, idx) => (
              <li
                onClick={(e) => handleClickTab(e, idx)}
                className={`${
                  state == idx
                    ? "text-blue-500"
                    : "text-primary hover:text-blue-500"
                } cursor-pointer uppercase font-body text-sm font-bold `}
                key={idx}
              >
                {categoria}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-10 w-full">
          {noticias.map((noticia, idx) => (
            <CardView key={idx} noticia={noticia} />
          ))}
        </div>
      </div>
      <PanelSidebar noticias={noticias} />

    </div>
  );
};

export const CardView = (props) => {
  const { noticia } = props;
  return (
    <div className="w-full h-full bg-white shadow-md rounded-lg overflow-hidden">
      <div className="h-40 w-full overflow-hidden relative">
        <img src={noticia.imagen} alt={noticia.titulo} />
        
      </div>
      <div className="w-full py-4 px-8 flex justify-center items-center flex-col">
        <h2 className="text-center hover:text-blue-500 transition cursor-pointer text-md font-body font-semibold tracking-tighter text-primary">
          {noticia.titulo}
        </h2>
        <p className="text-xs font-display py-2">
          {noticia.autor} | {noticia.createdAt}
        </p>
        <div className="rounded bg-red-500 grid px-4 place-items-center h-6 bottom-4 left-4">
          <p className="text-white font-display text-xs">
            {noticia.categorias[1]}
          </p>
        </div>
      </div>
    </div>
  );
};

export const PanelSidebar = (props) => {
  const { noticias } = props;
  return (
    <div className="w-full md:w-1/3 h-full flex flex-col gap-4 my-10">
      <Suscribe />
      <SocialLinks/>

    </div>
  );
};

export const Suscribe = () => {
  return (
    <div className="bg-white shadow-md py-5 px-8">
      <h4 className="font-display font-semibold uppercase text-md">
        Suscripciones
      </h4>
      <span className="flex gap-1 py-6">
        <EmailIcon className="text-gray-500 h-5 w-5" />
        <p className="text-sm text-gray-500">
          Suscribete a las noticias del día
        </p>
      </span>
      <span className="flex">
        <input placeholder="Correo Electronico" className="w-full border border-gray-200 transition focus:border-blue-500 focus:border-2 outline-none pl-3" />
        <button type="submit" className="focus:outline-none bg-blue-500 text-white px-2 py-1">Enviar</button>
      </span>
    </div>
  );
};

export const SocialLinks = () => {
    const arrRedes = [
        {titulo: "Twitter", icono: <TwitterIcon className="h-6 w-6 text-white"/>, color: "bg-blue-500"},
        {titulo: "Facebook", icono: <FacebookIcon className="h-6 w-6 text-white"/>, color: "bg-blue-900"},
        {titulo: "Instagram", icono: <InstagramIcon className="h-6 w-6 text-white"/>, color: "bg-pink-600"},
    ]
    return (
        <div className="bg-white shadow-md py-5 px-8 grid grid-cols-2 gap-4">

            {arrRedes.map((red, idx )=> (
                <button key={idx} className={`${red.color} focus:outline-none hover:opacity-80 rounded px-8 py-2 flex gap-2 items-center`}>
                    {red.icono} <p className="text-white font-display text-sm">{red.titulo}</p>
                </button>
            ))}
            
        </div>
    )
}


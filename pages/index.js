import Link from "next/link";
import React, { useEffect, useState } from "react";
import { api } from "../api";
import HeaderNews from "../Components/HeaderNews";

const index = () => {
  const [noticias, setNoticias] = useState([]);

  const Ultimasnoticias = noticias.slice(0, 4);

  useEffect(() => {
    api.FetchNews().then(({ data }) => setNoticias(data));
  }, []);

  return (
    <div className="py-8 w-full max-w-screen-xl flex flex-col items-center justify-center">
      <HeaderNews titulos={noticias.map((noticia) => noticia.titulo)} />
      <PanelPrimary noticias={Ultimasnoticias} />
      <div className="w-full">
        <PanelSecondary noticias={Ultimasnoticias}/>
      </div>
    </div>
  );
};

export default index;

export const PanelPrimary = (props) => {
  const { noticias } = props;
  return (
    <div className="w-full h-full my-6 flex gap-4">
      {noticias.map((noticia, index) => {
        if (index == 0) {
          return <ViewBig key={index} noticia={noticia} />;
        }
      })}
      <div className="w-1/2 float-right h-full flex-col flex gap-4">
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
    <div className="w-1/2 relative bg-white shadow-md rounded-lg overflow-hidden">
      <div className="w-full h-full">
        <div className="bg-gray-900 h-60 relative overflow-hidden">
          <img src={noticia.imagen} />
          <div className="rounded bg-red-500 grid px-4 place-items-center h-6  absolute bottom-4 left-4">
            <p className="text-white font-display text-xs">
              {noticia.categorias[1]}
            </p>
          </div>
        </div>
        <div className="content px-5 py-5">
          <Link href={noticia.rutaURL}>
            <h2 className="hover:text-blue-500 transition cursor-pointer text-2xl font-body font-semibold tracking-tighter text-primary">
              {noticia.titulo}
            </h2>
          </Link>
          <p className="text-xs font-display pt-2">
            {noticia.autor} | {noticia.createdAt}
          </p>
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
        <img src={noticia.imagen} />
        <div className="rounded bg-red-500 grid px-4 place-items-center h-6  absolute bottom-4 left-4">
          <p className="text-white font-display text-xs">
            {noticia.categorias[1]}
          </p>
        </div>
      </div>
      <div className="w-1/2 py-2 px-2">
        <h2 className="hover:text-blue-500 transition cursor-pointer text-md font-body font-semibold tracking-tighter text-primary">
          {noticia.titulo}
        </h2>
        <p className="text-xs font-display py-2">
          {noticia.autor} | {noticia.createdAt}
        </p>
      </div>
    </div>
  );
};

export const PanelSecondary = (props) => {
  const {noticias} = props
  const [state, setState] = useState(0);
  const categorias = ["Actualidad", "Deportes", "Politica", "Locales"];

  const handleClickTab = (e, i) => {
    e.preventDefault();
    setState(i);
  };

  return (
    <div className="border-t-2 border-gray-400 w-2/3 h-full my-10">
      <div className="w-full py-4 flex items-center justify-between ">
        <h3 className="font-display font-semibold text-xl uppercase py-2 text-primary">
          Ultimas Noticias
        </h3>
        <ul className="flex gap-4">
          {categorias.map((categoria, i) => (
            <li
              onClick={(e) => handleClickTab(e, i)}
              className={`${
                state == i
                  ? "text-blue-500"
                  : "text-primary hover:text-blue-500"
              } cursor-pointer uppercase font-body text-sm font-bold `}
              key={i}
            >
              {categoria}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-10 w-full">
      {noticias.map((noticia, i) => <CardView noticia={noticia}/>)}
      </div>
    </div>
  );
};

export const CardView = (props) => {
    const {noticia} = props
  return (
    <div className="w-full h-full bg-white shadow-md rounded-lg overflow-hidden">
      <div className="h-40 w-full overflow-hidden relative">
        <img src={noticia.imagen} />
        <div className="rounded bg-red-500 grid px-4 place-items-center h-6  absolute bottom-4 left-4">
          <p className="text-white font-display text-xs">
            {noticia.categorias[1]}
          </p>
        </div>
      </div>
      <div className="w-full py-4 px-8 flex justify-center items-center flex-col">
        <h2 className="text-center hover:text-blue-500 transition cursor-pointer text-md font-body font-semibold tracking-tighter text-primary">
          {noticia.titulo}
        </h2>
        <p className="text-xs font-display py-2">
          {noticia.autor} | {noticia.createdAt}
        </p>
      </div>
    </div>
  );
};

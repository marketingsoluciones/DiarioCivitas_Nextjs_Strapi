import { useState } from "react";
import { AutorLine, Title } from "./PanelPrimary";

const GridNews = ({ noticias }) => {
    const [selected, setSelect] = useState(0)
    const categorias = ["Actualidad", "Deportes", "Politica", "Locales"];
    return (
        <div className="col-span-2 w-full flex flex-col gap-10 border-t-2 pt-2 border-gray-200">
            <div className="w-full flex justify-between items-center">
                <h3 className="font-display font-semibold text-xl uppercase py-2 text-primary">
                    Ultimas Noticias
                </h3>
                <ul className="flex gap-4">
                    {categorias.map((categoria, idx) => (
                        <li
                            onClick={() => setSelect(idx)}
                            className={`${selected == idx
                                ? "text-blue-500"
                                : "text-primary hover:text-blue-500"
                                } cursor-pointer uppercase font-display text-sm font-bold `}
                            key={idx}
                        >
                            {categoria}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="grid grid-cols-2 gap-10">
                {noticias.slice(0,4).map((item, idx) => (
                    <CardView key={idx} noticia={item} />
                ))}
            </div>

        </div>
    )
}

export default GridNews


const CardView = ({ noticia }) => {
    const { imagen, titulo, rutaURL } = noticia
    return (
        <div className="w-full h-full bg-white shadow rounded overflow-hidden border border-gray-100">
            <img src={imagen} className="object-cover object-norepeat w-full h-60 object-top hover:scale-105 transition transform duration-1000" />
            <div className="p-6 flex flex-col gap-3">
                <Title titulo={titulo} size={"lg"} slug={rutaURL} />
                <AutorLine  />
                <p className="text-sm truncate">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, neque ad obcaecati saepe aut suscipit odio quo magnam deserunt voluptate.</p>

            </div>
        </div>
    );
};
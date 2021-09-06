import { memo, useEffect, useState } from "react";
import { AutorLine, Title } from "./PanelPrimary";

const GridNews = memo(() => {
    const [selected, setSelect] = useState(0)
    const categorias = ["Actualidad", "Deportes", "Politica", "Sucesos"];
    const [categories, setCategories] = useState([])

    const FetchNewsByCategory = async (category) => {
        try {
            const params = {
                "postcategorias.slug" : category.toLowerCase(),
                _limit : 6,
                _sort : "dataCreated:DESC"
            }
            const {data} = await api.FetchNews(params)
            setCategories(old => {
                if(!old.includes(item => item.category == category)){
                    return [...old, {category: category, news: data}].sort((a,b) => a-b)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        categorias.forEach(item => FetchNewsByCategory(item))
    }, [])
    return (
        <div className="md:col-span-2 w-full flex flex-col gap-10 border-t-2 pt-2 border-gray-200">
            <div className="w-full flex justify-between items-center flex-wrap">
                <h3 className="font-display font-semibold text-xl uppercase py-2 text-primary">
                    Ultimas Noticias
                </h3>
                <ul className="flex gap-4 font-body">
                    {categories.map((categoria, idx) => (
                        <li
                            onClick={() => setSelect(idx)}
                            className={`${selected == idx
                                ? "text-blue-500"
                                : "text-primary hover:text-blue-500"
                                } cursor-pointer uppercase text-sm font-bold transition `}
                            key={idx}
                        >
                            {categoria.category}
                        </li>
                    ))}
                </ul>
            </div>
            {categories.map((item, idx) => (
                selected === idx && <NewsByCategory key={idx} category={item} />
            ))}

        </div>
    )
})

export default GridNews


const CardView = ({ noticia }) => {
    const { imgPrincipal, title, slug, dateCreated, createdAt } = noticia
    return (
        <div className="w-full h-full bg-white shadow rounded overflow-hidden border border-gray-100">
            <img src={`${process.env.NEXT_PUBLIC_API_URL}${imgPrincipal?.url}`} className="object-cover object-norepeat w-full h-60 object-top  transition transform duration-1000" />
            <div className="p-6 flex flex-col gap-3">
                <Title size="lg" titulo={title} slug={slug} />
                <AutorLine date={dateCreated <= createdAt ? dateCreated : createdAt} />
                

            </div>
        </div>
    );
};

import React from 'react'
import { api } from "../api";
import Category from "../pages/categoria/[category]";

const NewsByCategory = ({category}) => {


    return (
        <div className="grid md:grid-cols-2 gap-10">
            {category?.news?.map((item,idx) => (
                <CardView key={idx} noticia={item} />
            ))}
        </div>
    )
}


import { memo, useEffect, useState } from "react";
import { AutorLine, Title } from "./PanelPrimary.js";
import Image from 'next/image'

const GridNews = memo(({ lastPost }) => {
    const [selected, setSelect] = useState(0)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const posts = lastPost || []
        const state = [
            { category: "Actualidad", news: posts.filter(elem => elem.title == "#Actualidad")[0]?.post },
            { category: "Deportes", news: posts.filter(elem => elem.title == "#Deporte")[0]?.post },
            { category: "España", news: posts.filter(elem => elem.title == "#España")[0]?.post },
            { category: "Sucesos", news: posts.filter(elem => elem.title == "#Sucesos")[0]?.post }
        ]
        setCategories(state)
    }, [lastPost])
    return (
        <div className="md:col-span-2 w-full flex flex-col gap-4 border-t-2 pt-2 border-gray-200">
            <div className="w-full flex justify-between items-center md:flex-row flex-col ">
                <h3 className="font-display font-semibold text-xl uppercase py-2 text-primary md:text-left text-center w-full">
                    Más noticias
                </h3>
                <ul className="flex gap-4 font-body w-full">
                    {categories.map((categoria, idx) => (
                        <li
                            onClick={() => setSelect(idx)}
                            className={`${selected == idx
                                ? "text-blue-500"
                                : "text-primary hover:text-blue-500"
                                } cursor-pointer uppercase text-sm font-bold transition `}
                            key={idx}
                        >
                            {categoria?.category}
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
    const LoaderImage = ({ src }) => {
        if (src && (src.startsWith('http://') || src.startsWith('https://'))) return src;
        const domain = process.env.NEXT_PUBLIC_API_URL_new;
        return `${domain}${src}`
    }
    return (
        <div className="w-full h-full bg-white shadow rounded overflow-hidden border border-gray-100">
            <Image
                unoptimized
                loader={LoaderImage}
                src={`${noticia?.imgMiniatura?.i640 || '/favicon.ico'}`}
                alt={noticia?.title}
                objectFit={"cover"}
                objectPosition={"center"}
                height={240}
                width={"auto"}
                layout={"responsive"}
            />

            <div className="p-1 flex flex-col gap-3">
                <Title size="lg" titulo={noticia?.title} slug={noticia?.slug} />
                <AutorLine author={noticia?.authorUsername} date={noticia?.createdAt} />
            </div>
        </div>
    );
};


const NewsByCategory = ({ category }) => {
    return (
        <div className="grid md:grid-cols-2 gap-4">
            {category?.news?.map((item, idx) => (
                <CardView key={idx} noticia={item} />
            ))}
        </div>
    )
}

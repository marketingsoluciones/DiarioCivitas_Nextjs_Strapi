import { useEffect, useState } from "react"
import { FlechaIcon } from "./icons.js"
import { Title } from "./PanelPrimary.js"
import Image from 'next/image'

const CategoryBlock = ({ lastPost, title }) => {
    const [news, setNews] = useState([])

    useEffect(() => {
        setNews(lastPost)
    }, [lastPost])
    const colors = {
        murcia: "bg-gradient-to-r from-red-500 to-pink-500",
        "puerto lumbreras": "bg-gradient-to-r from-blue-500 to-green-500",
        lorca: "bg-gradient-to-r from-indigo-500 to-purple-500",
        pulpí: "bg-gradient-to-r from-yellow-500 to-yellow-300",
    }
    return (
        <div className="font-display flex flex-col gap-4 border-t-2 border-gray-200 pt-10 ">
            <h2 className={`font-semibold text-lg tracking-wider uppercase ${colors[title.toLowerCase()]} p-2 pl-5 text-white`}>{title}</h2>
            <div className="grid grid-cols-2 gap-4">
                <BlockNews noticia={news[0]} />
                <div className="grid grid-cols-1 grid-rows-4">
                    {news?.slice(1, 5)?.map((item, idx) => (
                        <ListNews key={idx} noticia={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategoryBlock

const BlockNews = ({ noticia }) => {
    const LoaderImage = ({ src, width, quality }) => {
        //const domain = process.env.NEXT_PUBLIC_API_URL
        const domain = "https://api.bodasdehoy.com";
        return `${domain}${src}`
    }

    return (
        <>
            <div className="block relative h-full w-full bg-black rounded overflow-hidden image-card text-white">
                <Image
                    loader={LoaderImage}
                    src={`${noticia?.imgMiniatura?.i320}`}
                    alt={noticia?.title}
                    objectFit={"cover"}
                    objectPosition={"left"}
                    layout={"fill"}
                />

                <span className="block text-center h-full flex items-end justify-center z-20 relative p-4">
                    <Title size="sm" titulo={noticia?.title} slug={noticia?.slug} />
                </span>
            </div>
            <style jsx>
                {`
            .image-card::before {
                content: "";
                background: linear-gradient(0deg, rgba(2,0,36,0.95) 0%, rgba(0,212,255,0) 100%);
                position:absolute;
                width: 100%;
                height: 100%;
                top:0;
                left:0;
                z-index: 10;
            }
            `}
            </style>
        </>
    )
}

const ListNews = ({ noticia }) => {
    return (
        <div className="w-full p-3 border flex items-start justify-start gap-1 text-gray-700">
            <FlechaIcon className="w-6 h-6 transform -rotate-90 text-blue-500" />
            <Title size="sm" slug={noticia?.slug} titulo={noticia?.title} className="text-sm mt-0.5 font-semibold hover:text-blue-500 transition cursor-pointer flex flex-nowrap	  " />
        </div>
    )
}


import { Title } from "./PanelPrimary"
import router from 'next/router'

const EditorPicks = ({noticias}) => {
    return (
        <div className="w-full border-t-2 border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
            {noticias.slice(0,4).map((item,idx) => (
                <News key={idx} noticia={item}/>
            ))}

        </div>
    )
}

export default EditorPicks

export const News = ({noticia}) => {
    const { imgPrincipal, title, slug } = noticia
    return (
        <>
        <div className="font-display text-white h-48 rounded bg-gray-700 w-full card-image relative p-6 hover:scale-105 transform duration-1000 transition cursor-pointer" onClick={() => router.push(slug)}>
            <span className="block text-center h-full flex items-end justify-center z-20 relative">
            <Title size="sm" titulo={title} slug={slug} font="body" />
            </span>
        </div>
        <style jsx>
            {`
            .card-image {
                background-image: url("${`${process.env.NEXT_PUBLIC_API_URL}${imgPrincipal?.url}`}");
                background-position: center top;
                background-size: cover;
                overflow:hidden
            }

            .card-image::before {
                content: "";
                background: linear-gradient(0deg, rgba(2,0,36,0.9) 0%, rgba(0,212,255,0) 100%);
                position:absolute;
                width: 100%;
                height: 100%;
                top:0;
                left:0;
            }
            `}
        </style>
        </>

    )
}
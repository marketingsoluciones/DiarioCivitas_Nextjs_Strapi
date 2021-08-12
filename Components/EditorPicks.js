import { Title } from "./PanelPrimary"
import router from 'next/router'

const EditorPicks = ({noticias}) => {
    return (
        <div className="w-full border-t-2 border-gray-200 grid grid-cols-4 gap-8 py-12">
            {noticias.slice(0,4).map((item,idx) => (
                <News key={idx} noticia={item}/>
            ))}

        </div>
    )
}

export default EditorPicks

const News = ({noticia}) => {
    const { imagen, titulo, rutaURL } = noticia
    return (
        <>
        <div className="font-display text-white h-48 rounded bg-gray-700 w-full card-image relative p-6 hover:scale-105 transform duration-1000 transition cursor-pointer" onClick={() => router.push(rutaURL)}>
            <span className="block text-center h-full flex items-end justify-center z-20 relative">
            <Title size="sm" titulo={titulo} slug={rutaURL} />
            </span>
        </div>
        <style jsx>
            {`
            .card-image {
                background-image: url("${imagen}");
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
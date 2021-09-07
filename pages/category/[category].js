import { Markup } from "interweave"
import { useEffect, useState } from "react"
import { api } from "../../api"
import { News } from "../../Components/EditorPicks"
import { AutorLine, Title } from "../../Components/PanelPrimary"
import router from 'next/router'


const Category = (props) => {
    const [news, setNews] = useState(props?.news)
    const [count, setCount] = useState(() => {
        const res = props?.news[0]?.postcategorias?.find(item => item?.slug == props?.category)
        return res?.quantity
    })
    return (
        <>
            {news.length >= 30 ? <CategoryPrincipal news={news} category={props?.category} /> : <CategorySecondary news={news} category={props?.category} />}
        </>
    )
}

export default Category


const CategoryPrincipal = ({ news: noticias, category }) => {
    const [news, setNews] = useState(noticias)
    const colors = {
        deportes: "blue"
    }

    return (
        <section className="xl:max-w-screen-lg mx-auto inset-x-0 py-10 font-display flex flex-col gap-10 bg-white p-5">
            <div className="grid grid-cols-4 w-full gap-6">
                <div className="... bg-white border border-gray-200 w-full h-max p-4 flex flex-col gap-4 rounded-lg">
                    <h2 className={`font-semibold font-body text-md text-${colors[category]}-500`}>Titulares</h2>
                    {news?.slice(1, 9)?.map((item, idx) => (
                        <NewsListPrimary key={idx} noticia={item} color={colors[category]} />
                    ))}

                </div>

                <div className="col-span-2 w-full relative flex flex-col gap-6">
                    <BlockPrincipal noticia={news.length && news[0]} />
                    <BlockTwoNews noticias={news.slice(9, 11)} />
                </div>

                <div className="... bg-white border border-gray-200 w-full h-max p-4 flex flex-col gap-4 rounded-lg">
                    <h2 className={`font-semibold text-md text-${colors[category]}-500`}>Populares de esta semana</h2>
                    {news?.slice(12, 17)?.map((item, idx) => (
                        <NewsListSecondary key={idx} noticia={item} />
                    ))}


                </div>

            </div>
            <div className="w-full py-6 flex items-center justify-center">
                <img src="/ad.png" className="object-contain" />
            </div>

            <div className="py-6 border-t">
                <h2 className={`text-lg font-semibold text-${colors[category]}-500 uppercase pb-4`}>Más noticias de {category}</h2>
                <NewsBlock noticias={news?.slice(18, 24)} />
            </div>

            <div className="py-6 border-t">
                <h2 className={`text-lg font-semibold text-${colors[category]}-500 uppercase pb-4`}>Articulos de opinión</h2>
                <BlockInlineX4 color={colors[category]} />
            </div>

            <div className="py-6 border-t">
                <h2 className={`text-lg font-semibold text-${colors[category]}-500 uppercase pb-4`}>Más relevantes</h2>
                <Block3ColsAds color={colors[category]} />
            </div>
        </section>
    )
}


const CategorySecondary = ({ news: noticias }) => {
    const [news, setNews] = useState(noticias)

    const NewsList = ({ noticia }) => {
        const { title, slug, imgPrincipal, content } = noticia
        return (
            <div className="w-full grid grid-cols-4 gap-4">
                <img src={`${process.env.NEXT_PUBLIC_API_URL}${imgPrincipal?.url}`} className="w-full h-full object-cover object-center rounded" />
                <div className="col-span-3 flex flex-col gap-2">
                    <Title titulo={title} slug={slug} size="lg" />
                    <AutorLine />
                    <div className="font-body text-xs">
                        <Markup content={`${content.slice(0, 400)}...`} noHtml />
                    </div>
                    <button className="bg-blue-500 text-white py-1 px-2 text-sm rounded w-max font-body focus:outline-none" onClick={() => router.push(`/${slug}`)}>Seguir leyendo</button>
                </div>
            </div>
        )
    }
    return (
        <section className="xl:max-w-screen-lg mx-auto inset-x-0 py-10 font-display flex flex-col gap-10 bg-white p-5">
            <div className="grid grid-cols-4 gap-6">
                {news?.slice(0, 4)?.map((item, idx) => (
                    <News key={idx} noticia={item} />
                ))}
            </div>
            <div className="w-full grid grid-cols-1 gap-12 p-6">
                {news?.slice(5)?.map((item, idx) => (
                    <NewsList key={idx} noticia={item} />
                ))}
            </div>
        </section>
    )
}



export const getStaticProps = async ({ params }) => {
    try {
        const { data } = await api.FetchNews({
            _limit: 30,
            _sort: "createdAt:DESC",
            "postcategorias.slug": params?.category
        })
        return {
            props: { category: params?.category, news: data }
        }
    } catch (error) {
        console.log(error)
        return {
            props: {}
        };
    }

};

export async function getStaticPaths() {
    try {
        const { data } = await api.FetchCategories()
        console.log("data", data)
        return {
            paths: data?.map((item) => {
                return {
                    params: { category: item?.slug }
                }
            }),
            fallback: false
        }
    } catch (error) {
        console.log(error)
        return {
            paths: [{ params: {} }]
        }
    }


}


const NewsListPrimary = ({ noticia }) => {
    const { title, slug } = noticia
    return (
        <div className="border-b w-full pb-4">
            <Title titulo={title} slug={slug} size={"sm"} />
        </div>
    )
}


const BlockPrincipal = ({ noticia }) => {
    const { title, slug, dateCreated, createdAt, postcategorias, imgPrincipal } = noticia
    return (
        <div className="relative">
            <div className="w-full h-96 imagen relative rounded-lg overflow-hidden" />
            <div className="absolute bottom-0 left-0 p-10 flex flex-col gap-3 justify-center z-20 text-white ">
                <h3 className="text-sm font-body">{postcategorias && postcategorias[0]?.categorie}</h3>
                <Title titulo={title} slug={slug} size="2xl" />
                <AutorLine date={dateCreated <= createdAt ? dateCreated : createdAt} />
            </div>
            <style jsx>
                {`

                .imagen {
                background-image: url("${process.env.NEXT_PUBLIC_API_URL}${imgPrincipal?.url}");
                background-position: center top;
                background-size: cover;
                overflow:hidden
            }
                .imagen::before {
                    content: "";
                    background: linear-gradient(0deg, rgba(2,0,36,0.9) 0%, rgba(0,212,255,0) 100%);
                    position:absolute;
                    width: 100%;
                    height: 100%;
                    top:0;
                    left:0;
                    z-index: 20
                }
                `}
            </style>
        </div>
    )
}


const NewsListSecondary = ({ noticia }) => {
    const { title, slug, imgPrincipal } = noticia
    return (
        <div className="py-4 border-b grid grid-cols-3 gap-3">
            <img className="w-16 h-16 bg-black ... overflow-hidden rounded-lg object-cover" src={`${process.env.NEXT_PUBLIC_API_URL}${imgPrincipal?.url}`} />
            <span className="col-span-2">
                <Title titulo={title} slug={slug} size={"sm"} />

            </span>
        </div>
    )
}



const BlockTwoNews = ({ noticias }) => {
    const News = ({ noticia }) => {
        const { title, slug, postcategorias, imgPrincipal } = noticia
        return (
            <div className="w-full flex-col flex gap-1">
                <img className="w-full h-60 rounded-lg overflow-hidden object-cover object-center" src={`${process.env.NEXT_PUBLIC_API_URL}${imgPrincipal?.url}`} />
                <h3 className="text-sm font-semibold text-yellow-500">{postcategorias && postcategorias[0]?.categorie}</h3>
                <Title titulo={title} slug={slug} />
            </div>
        )
    }
    return (
        <div className="grid grid-cols-2 gap-6">
            {noticias?.map((item, idx) => (
                <News key={idx} noticia={item} />
            ))}

        </div>
    )
}


const NewsBlock = ({ noticias }) => {
    const News = ({ noticia }) => {
        const { title, slug, imgPrincipal, postcategorias } = noticia
        return (
            <div className="w-full ... flex flex-col gap-1">
                <img className=" w-full h-60 rounded-lg overflow-hidden object-cover object-center" src={`${process.env.NEXT_PUBLIC_API_URL}${imgPrincipal?.url}`} />
                <h3 className="text-sm font-semibold text-yellow-500">{postcategorias && postcategorias[0]?.categorie}</h3>
                <Title titulo={title} slug={slug} size="md" />
            </div>

        )
    }
    return (
        <div className="w-full grid grid-cols-4 gap-6">
            <News noticia={noticias[0]} />
            <div className="col-span-2 w-full">
                <BlockPrincipal noticia={noticias[1]} />
            </div>
            <News noticia={noticias[2]} />
            <div className="col-span-2 w-full">
                <BlockPrincipal noticia={noticias[3]} />
            </div>
            <News noticia={noticias[4]} />
            <News noticia={noticias[5]} />
        </div>
    )
}


const BlockInlineX4 = ({ color }) => {

    const News = () => {
        return (
            <div className="w-full flex flex-col gap-0.5">
                <img className="w-full object-cover object-center bg-black h-48 rounded-lg overflow-hidden" />
                <h3 className="text-xs font-medium text-yellow-500 pt-0.5">Francisco Montilla</h3>
                <h2 className="font-semibold ">Barack Obama and Family Visit Balinese Paddy Fields</h2>
            </div>
        )
    }
    return (
        <div className="w-full">
            <div className="grid grid-cols-4 gap-8">
                <News />
                <News />
                <News />
                <News />
            </div>
        </div>
    )
}


const Block3ColsAds = ({ color }) => {

    const News = () => {
        return (
            <div className="w-full flex items-center gap-6 grid grid-cols-5">
                <img className="col-span-2 rounded-md bg-black w-full h-40" />
                <div className="col-span-3 flex flex-col gap-1">
                <Title titulo={"Barack Obama and Family Visit Balinese Paddy Fields"} size="lg" />
                <AutorLine />
                <div className="text-xs font-body mt-3">
                    <Markup content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ab odio consectetur! Asperiores pariatur ut, neque cupiditate temporibus sequi, architecto omnis, perferendis autem repellat rem incidunt!" noHtml/>
                </div>
                </div>
            </div>
        )
    }
    return (
        <div className="w-full grid grid-cols-3 gap-12">
            <div className="col-span-2 grid grid-cols-1 gap-6">
                <News />
                <News />
                <News />
                <News />
                <News />
                <News />
            </div>
            <div>
                <img src="/ads.png" />
            </div>
            <div className="col-span-3">

            </div>
        </div>
    )
}


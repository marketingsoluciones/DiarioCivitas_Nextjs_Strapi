import { Markup } from "interweave"
import { memo, useContext, useEffect, useState } from "react"
import { api } from "../../api.js"
import { News } from "../../components/EditorPicks.js"
import { AutorLine, Title } from "../../components/PanelPrimary.js"
import router from 'next/router'
import Head from 'next/head'
import { Capitalize } from "../../utils/Capitalize.js"
import Pagination from "../../components/Pagination.js"
import { LoadingContext } from "../../context/LoadingContext.js"


const Category = (props) => {
    const [news, setNews] = useState([])
    // const [count, setCount] = useState(() => {
    //     const res = props?.news[0]?.postcategorias?.find(item => item?.slug == props?.category)
    //     return res?.quantity
    // })

    useEffect(() => {
        console.log(props)
        setNews(props.news)
        console.log("Render categoria", props.category)
        
    }, [props])
    return (
        <>
        <Head>
            <meta name="description" content={""} />
            <title>{Capitalize(props?.category)} | Diario Civitas</title>
        </Head>
            {news.length >= 30 ? <CategoryPrincipal news={news} category={props?.category} /> : <CategorySecondary news={news} category={props?.category} />}
        </>
    )
}

export default Category


const CategoryPrincipal = ({ news: noticias, category }) => {
    const [news, setNews] = useState([])
    const colors = {
        deportes: "blue"
    }

    useEffect(() => {
        setNews(noticias)
    }, [noticias])

    return (
        <>
        <section className="xl:max-w-screen-lg mx-auto inset-x-0 py-10 font-display flex flex-col gap-10 bg-white p-5">
            <div className="grid md:grid-cols-4 w-full gap-6">
                <div className="... hidden md:flex bg-white border border-gray-200 w-full h-max p-4 flex flex-col gap-4 rounded-lg">
                    <h2 className={`font-semibold font-body text-md text-${colors[category]}-500`}>Titulares</h2>
                    {news?.slice(1, 9)?.map((item, idx) => (
                        <NewsListPrimary key={idx} noticia={item} color={colors[category]} />
                    ))}

                </div>

                <div className="md:col-span-2 w-full relative flex flex-col gap-6">
                    <BlockPrincipal noticia={news?.length && news[0]} />
                    <BlockTwoNews noticias={news?.slice(9, 11)} />
                </div>

                <div className="... bg-white border border-gray-200 w-full h-max p-4 flex flex-col gap-4 rounded-lg">
                    <h2 className={`font-semibold text-md text-${colors[category]}-500`}>Populares de esta semana</h2>
                    {news?.slice(11, 16)?.map((item, idx) => (
                        <NewsListSecondary key={idx} noticia={item} />
                    ))}


                </div>

            </div>
            <div className="w-full py-6 flex items-center justify-center">
                <img src="/ad.png" className="object-contain" />
            </div>

            <div className="py-6 border-t">
                <h2 className={`text-lg font-semibold text-${colors[category]}-500 uppercase pb-4`}>Más noticias de {category}</h2>
                <NewsBlock noticias={news?.slice(16, 22)} />
            </div>

            <div className="py-6 border-t">
                <BlockInlineX4 color={colors[category]} noticias={news?.slice(22,26)} />
            </div>

            <div className="py-6 border-t">
                <h2 className={`text-lg font-semibold text-${colors[category]}-500 uppercase pb-4`}>Más relevantes</h2>
                <Block3ColsAds color={colors[category]} noticias={news?.slice(22)} />
            </div>
        </section>
        </>
    )
}

export const NewsList = ({ noticia }) => {
    return (
        <div className="w-full grid grid-cols-4 gap-4">
            <div className="w-full h-28 rounded overflow-hidden">
                <img src={`${process.env.NEXT_PUBLIC_API_URL}${noticia?.imgPrincipal?.url}`} className="w-full h-full object-cover object-center" />
            </div>
            
            <div className="col-span-3 flex flex-col gap-2">
                <Title titulo={noticia?.title} slug={noticia?.slug} size="lg" />
                <AutorLine date={noticia?.createdAt} />
                {/* <div className="font-body text-xs">
                    <Markup content={`${noticia?.content?.slice(0, 400)}...`} noHtml />
                </div> */}
                <button className="bg-blue-500 text-white py-1 px-2 text-sm rounded w-max font-body focus:outline-none" onClick={() => router.push(`/${noticia?.slug}`)}>Seguir leyendo</button>
            </div>
        </div>
    )
}

const CategorySecondary = ({ news: noticias, category }) => {
    const [news, setNews] = useState([])

    useEffect(() => {
        setNews(noticias)
    }, [noticias])

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
            <Pagination />
        </section>
    )
}



export const getServerSideProps = async ({ params }) => {
    try {
        const {data:res} = await api.FetchCategory(params?.category)
        const data = Object.values(res?.lastPost)
        //const data = res?.data?.getCategory
        //  const { data } = await api.FetchNews({
        //      "postcategorias.slug": params?.category,
        //      _limit: 30,
        //      _sort: "createdAt:DESC"
        //  })
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

// export async function getStaticPaths() {
//     try {
//         const {data} = await api.FetchCategories()
        
//         return {
//             paths: data?.map((item) => {
//                 return {
//                     params: {category : item?.slug}
//                 }
//             }),
//             fallback: 'blocking'
//         }
//     } catch (error) {
//         console.log(error)
//         return {
//             paths: [{ params: {} }], fallback: 'blocking'
//         }
//     }


// }


const NewsListPrimary = ({ noticia }) => {
    return (
        <div className="border-b w-full pb-4">
            <Title titulo={noticia?.title} slug={noticia?.slug} size={"sm"} />
        </div>
    )
}


const BlockPrincipal = ({ noticia }) => {
    return (
        <div className="relative">
            <div className="w-full h-96 imagen relative rounded-lg overflow-hidden" >
                <img src={`${process.env.NEXT_PUBLIC_API_URL}${noticia?.imgPrincipal?.url}`} className="object-cover object-top w-full absolute h-full" />
            </div>
            <div className="absolute bottom-0 left-0 p-10 flex flex-col gap-3 justify-center z-20 text-white ">
                <h3 className="text-sm font-body">{noticia?.postcategorias && noticia?.postcategorias[0]?.categorie}</h3>
                <Title titulo={noticia?.title} slug={noticia?.slug} size="2xl" />
                <AutorLine date={noticia?.createdAt} />
            </div>
            <style jsx>
                {`
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
    return (
        <div className="py-4 border-b grid grid-cols-3 gap-3">
            <img className="w-16 h-16 bg-black ... overflow-hidden rounded-lg object-cover" src={`${process.env.NEXT_PUBLIC_API_URL}${noticia?.imgPrincipal?.url}`} />
            <span className="col-span-2">
                <Title titulo={noticia?.title} slug={noticia?.slug} size={"sm"} />

            </span>
        </div>
    )
}



const BlockTwoNews = ({ noticias }) => {
    const News = ({ noticia }) => {
        return (
            <div className="w-full flex-col flex gap-1">
                <img className="w-full h-60 rounded-lg overflow-hidden object-cover object-center" src={`${process.env.NEXT_PUBLIC_API_URL}${noticia?.imgPrincipal?.url}`} />
                <AutorLine date={noticia?.createdAt} />
                <Title titulo={noticia?.title} slug={noticia?.slug} />
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
        return (
            <div className="w-full ... flex flex-col gap-1">
                <img className="w-full h-60 rounded-lg overflow-hidden object-cover object-center" src={`${process.env.NEXT_PUBLIC_API_URL}${noticia?.imgPrincipal?.url}`} />
                <h3 className="text-sm font-semibold text-yellow-500">{noticia?.postcategorias && noticia?.postcategorias[0]?.categorie}</h3>
                <div className="pt-2">
                <AutorLine date={noticia?.createdAt} />
                <Title titulo={noticia?.title} slug={noticia?.slug} size="md" />
                </div>
            </div>

        )
    }
    return (
        <div className="w-full grid md:grid-cols-4 gap-6">
            <News noticia={noticias[0]} />
            <div className="md:col-span-2 w-full">
                <BlockPrincipal noticia={noticias[1]} />
            </div>
            <News noticia={noticias[2]} />
            <div className="md:col-span-2 w-full">
                <BlockPrincipal noticia={noticias[3]} />
            </div>
            <News noticia={noticias[4]} />
            <News noticia={noticias[5]} />
        </div>
    )
}


const BlockInlineX4 = ({ noticias, color }) => {

    const News = ({noticia}) => {
        return (
            <div className="w-full flex flex-col gap-0.5">
                <img className="w-full object-cover object-top bg-black h-48 rounded-lg overflow-hidden" src={`${process.env.NEXT_PUBLIC_API_URL}${noticia?.imgPrincipal?.url}`} />
                <div className="pt-2">
                <AutorLine date={noticia?.createdAt} />
                <Title size={"sm"} slug={noticia?.slug} titulo={noticia?.title} />

                </div>
            </div>
        )
    }
    return (
        <div className="w-full">
            <div className="grid md:grid-cols-4 gap-8">
                {noticias?.map((item,idx) => (
                    <News key={idx} noticia={item} />
                ))}
            </div>
        </div>
    )
}


const Block3ColsAds = ({ noticias, color }) => {

    const News = ({noticia}) => {
        return (
            <div className="w-full flex items-center gap-6 grid md:grid-cols-5">
                <div className="w-full h-28 rounded overflow-hidden md:col-span-2">
                <img src={`${process.env.NEXT_PUBLIC_API_URL}${noticia?.imgPrincipal?.url}`} className="w-full h-full object-cover object-top" />
            </div>
                <div className="md:col-span-3 flex flex-col gap-1">
                <Title titulo={noticia?.title} size="lg" />
                <AutorLine date={noticia?.createdAt} />
                {/* <div className="text-xs font-body mt-3">
                    <Markup content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ab odio consectetur! Asperiores pariatur ut, neque cupiditate temporibus sequi, architecto omnis, perferendis autem repellat rem incidunt!" noHtml/>
                </div> */}
                </div>
            </div>
        )
    }
    return (
        <div className="w-full grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 grid md:grid-cols-1 gap-6">
                {noticias?.map((item,idx) => (
                    <News key={idx} noticia={item} />
                ))}
                
            </div>
            <div>
                <img src="/ads.png" />
            </div>
            
        </div>
    )
}


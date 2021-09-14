import Link from "next/link"
import dayjs from 'dayjs'

const PanelPrimary = ({ noticias }) => {
    return (
        <div className="flex flex-col items-center ">
            <PrincipalNew noticia={noticias[0]} />
            <div className="w-full h-max grid grid-cols-1 md:grid-cols-3 gap-8">
                <BigBlock noticia={noticias[1]} />
                <div className="flex flex-col gap-6">
                    <SecondaryBlock noticia={noticias[2]} />
                    <div className="flex flex-col w-full gap-6">
                        <News noticia={noticias[3]} />
                        <News noticia={noticias[4]} />
                        <News noticia={noticias[5]} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PanelPrimary

const BigBlock = ({ noticia }) => {
    return (
        <div className="w-full col-span-2 p-2 flex flex-col gap-3">
            <img className="w-full h-96 object-cover rounded" src={`${process.env.NEXT_PUBLIC_API_URL}${noticia?.mediaFile.url}`} />
            <Title size="2xl" titulo={noticia?.title} slug={noticia?.slug} />
            <AutorLine date={noticia?.dateCreated <= noticia?.createdAt ? noticia?.dateCreated : noticia?.createdAt} />
        </div>
    )
}

const SecondaryBlock = ({ noticia }) => {
    return (
        <div className="flex flex-col gap-2 border-b-2 border-gray-300 border-dotted pb-4 w-full">
            <Title size="xl" titulo={noticia?.title} slug={noticia?.slug} justify={true} />
            <AutorLine date={noticia?.dateCreated <= noticia?.createdAt ? noticia?.dateCreated : noticia?.createdAt} />
        </div>
    )
}


export const AutorLine = ({ date, author }) => {
    return (
        <p className="capitalize text-xs font-body h-max">Por <span className="text-blue-500 font-semibold capitalize hover:text-gray-800 transition cursor-pointer">Francisco Montilla{author}</span> - {date ? dayjs(date).format('DD MMM YYYY') : "00 Ene 2021"}</p>
    )
}

export const Title = ({ size, titulo, slug, justify = false, font = "display", ...rest }) => {
    const sizes = {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-md",
        lg: "text-md md:text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
        "3xl": "text-3xl",
        "4xl": "text-4xl",
        "5xl": "text-5xl"
    }

    const fonts = {
        body : "font-body",
        display: "font-display"
    }
    return (
        <Link href={slug ? `/${slug}` : "/"}>
            <h2 className={`${fonts[font]} ${sizes[size]} ${justify && "text-justify"} font-semibold cursor-pointer hover:text-blue-500 transition`} {...rest}>{titulo}</h2>
        </Link>
    )
}

const TagCategories = ({ postcategorias }) => {

    const colors = {
        actualidad: "bg-red-500",
        salud: "bg-green-500"
    }

    const Tag = ({ categoria }) => {
        return (
            <div className={`${colors[categoria.toLowerCase()]} rounded px-2 py-1 cursor-pointer hover:opacity-90 transition`}>
                <p className="font-display text-white text-xs uppercase">{categoria}</p>
            </div>
        )
    }

    return (
        <div className="flex gap-2 items-center justify-center absolute bottom-5 left-5">
            {postcategorias?.map((item, idx) => (
                item !== "Portada" && <Tag key={idx} categoria={item.categorie} />
            ))}
        </div>
    )
}

const PrincipalNew = ({ noticia }) => {
    return (
        <div className="border-b-2 border-t-2 border-gray-300 my-4 border-dotted py-6 flex flex-col gap-4 text-2xl xl:text-5xl ">
            <Title titulo={noticia?.title} slug={noticia?.slug} justify={true} size="5xl"  />
            <AutorLine date={noticia?.dateCreated <= noticia?.createdAt ? noticia?.dateCreated : noticia?.createdAt} />
        </div>
    )
}

const News = ({ noticia }) => {
    return (
        <div className="flex items-start gap-3 border-b-2 border-gray-300 border-dotted pb-6">
            <img className="h-20 w-20 object-cover" src={`${process.env.NEXT_PUBLIC_API_URL}${noticia?.mediaFile.url}`} />
            <div className="flex flex-col justify-start gap-2">
                <Title size="sm" titulo={noticia?.title} slug={noticia?.slug} justify={true} />
                <AutorLine date={noticia?.dateCreated <= noticia?.createdAt ? noticia?.dateCreated : noticia?.createdAt} />

            </div>
        </div>
    )
}



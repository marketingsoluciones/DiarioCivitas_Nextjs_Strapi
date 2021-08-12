import Link from "next/link"

const PanelPrimary = ({ noticias }) => {
    return (
        <div className="w-full grid grid-cols-2 h-max gap-8">
            <div className="w-full grid grid-rows-3 gap-8">
                <SmallBlock noticia={noticias[1]} />
                <SmallBlock reverse={false} noticia={noticias[2]} />
                <SmallBlock noticia={noticias[3]} />
            </div>
            <BigBlock noticia={noticias[0]} />
        </div>
    )
}

export default PanelPrimary

const BigBlock = ({ noticia }) => {
    const { titulo, imagen, contenido, categorias, rutaURL } = noticia
    return (
        <div className="rounded overflow-hidden bg-white shadow-md">
            <div className="w-full h-96 overflow-hidden relative">
                <img className="object-cover object-norepeat w-full h-full object-top hover:scale-105 transition transform duration-1000" src={imagen} alt={titulo} />
                <TagCategories categorias={categorias} />
            </div>
            <div className="p-10 flex flex-col gap-3">
                <Title size={"3xl"} titulo={titulo} slug={rutaURL}/>
                <AutorLine />
                <p className="text-sm text-gray-700 flex truncate">{contenido}</p>
            </div>
        </div>
    )
}

const SmallBlock = ({reverse = true, noticia}) => {
    const { titulo, imagen, categorias, rutaURL } = noticia
    return (
        <div className={`w-full h-full flex items-center ${reverse ? "flex-row-reverse" : ""} rounded overflow-hidden font-display shadow-md border border-gray-100`}>
            <div className="w-1/2 h-full overflow-hidden relative">
                <img className="absolute top-0 left-0 w-full h-full object-cover hover:scale-105 transform transition duration-1000" src={imagen} alt={titulo} />
                <TagCategories categorias={categorias} />
            </div>
            <div className="w-1/2 h-full bg-red p-6 flex flex-col gap-3 ">
                
                <Title size={"lg"} titulo={titulo} slug={rutaURL}/>
                <AutorLine />
            </div>
        </div>
    )
}


export const AutorLine = (props) => {
    return (
        <p className="uppercase text-xs font-display h-max">por <span className="text-blue-500 font-semibold">Francisco Montilla</span> - 27 Ene 2022</p>
    )
}

export const Title = ({size, titulo, slug, ...rest}) => {
    const sizes = {
        sm: "text-sm",
        md: "text-md",
        lg: "text-lg",
        xl : "text-xl",
        "2xl": "text-2xl",
        "3xl" : "text-3xl"
    }
    return (
        <Link href={slug ?`/${slug}` : "/"}>
        <h2 className={`font-display ${sizes[size]} font-semibold cursor-pointer hover:text-blue-500 transition`} {...rest}>{titulo}</h2>
        </Link>
    )
}

const TagCategories = (props) => {
    const { categorias } = props

    const colors = {
        actualidad : "bg-red-500",
        salud : "bg-green-500"
    }

    const Tag = ({categoria}) => {
        return (
            <div className={`${colors[categoria.toLowerCase()]} rounded px-2 py-1 cursor-pointer hover:opacity-90 transition`}>
                <p className="font-display text-white text-xs uppercase">{categoria}</p>
            </div>
        )
    }

    return (
        <div className="flex gap-2 items-center justify-center absolute bottom-5 left-5">
            {categorias.map((item, idx) => (
                item !== "Portada" && <Tag key={idx} categoria={item} />
            ))}
        </div>
    )
}
import { AutorLine, Title } from "../PanelPrimary.js"

const PopularPost = ({noticias}) => {
    return (
        <div className="bg-white shadow-md border-gray-100 border p-8 gap-10 grid grid-cols-1 w-full font-body">
            {noticias?.map((item,idx) => (
                <Post key={idx} noticia={item} />
            ))}
            

        </div>
    )
}

export default PopularPost


const Post = ({noticia}) => {
    const {title, slug, imgPrincipal} = noticia
    return (
        <div className="flex gap-4 items-center justify-start">
            <img src={`${process.env.NEXT_PUBLIC_API_URL}${imgPrincipal?.url}`} className="object-cover w-14 h-14 rounded-full" />
            <span className="block flex flex-col items-start justify-center">
                <Title titulo={title} size={"sm"} font={"body"} slug={slug} />

            </span>
        </div>
    )
}



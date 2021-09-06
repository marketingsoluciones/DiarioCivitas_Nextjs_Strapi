const Category = () => {
    const color = "red"
    const category = "Politica"
    return (
        <section className="xl:max-w-screen-xl mx-auto inset-x-0 py-10 font-display flex flex-col gap-10">
            <div className="grid grid-cols-4 w-full gap-6">
                <div className="... bg-white border border-gray-200 w-full h-max p-4 flex flex-col gap-4 rounded-lg">
                    <h2 className={`font-semibold text-md text-${color}-500`}>Titulares</h2>
                    <NewsListPrimary color={color} />
                    <NewsListPrimary color={color} />
                    <NewsListPrimary color={color} />
                    <NewsListPrimary color={color} />
                    <NewsListPrimary color={color} />
                    <NewsListPrimary color={color} />
                </div>

                <div className="col-span-2 w-full relative flex flex-col gap-6">
                    <BlockPrincipal />
                    <BlockTwoNews />
                </div>

                <div className="... bg-white border border-gray-200 w-full h-max p-4 flex flex-col gap-4 rounded-lg">
                    <h2 className={`font-semibold text-md text-${color}-500`}>Populares de esta semana</h2>
                    <NewsListSecondary />
                    <NewsListSecondary />
                    <NewsListSecondary />
                    <NewsListSecondary />

                </div>

            </div>
            <div className="w-full py-6 flex items-center justify-center">
                <img src="/ad.png" className="object-contain" />
            </div>

            <div className="py-6 border-t">
                <h2 className={`text-lg font-semibold text-${color}-500 uppercase pb-4`}>Más noticias de {category}</h2>
                <NewsBlock />
            </div>

            <div className="py-6 border-t">
                <h2 className={`text-lg font-semibold text-${color}-500 uppercase pb-4`}>Articulos de opinión</h2>
                <BlockInlineX4 color={color} />
            </div>

            <div className="py-6 border-t">
                <h2 className={`text-lg font-semibold text-${color}-500 uppercase pb-4`}>Más relevantes</h2>
                <Block3ColsAds color={color} />
            </div>
        </section>
    )
}

export default Category

export const getStaticProps = async ({ params }) => {
    return {
        props: {}
    };
};

export async function getStaticPaths() {

    return {
        paths: [
            { params: { category: "nuevo" } },
            { params: { category: "prueba" } }
        ],
        fallback: false
    };
}


const NewsListPrimary = ({ color }) => {
    return (
        <>

            <div className="border-b w-full pb-4">
                <h2 className={`font-semibold font-body text-gray-900 text-sm hover:text-${color}-500 transition cursor-pointer leading-4`}>'It's not a concentration camp': Bangladesh defends plan to house Rohingya on island with armed police </h2>
            </div>
        </>
    )
}


const BlockPrincipal = () => {
    return (
        <div className="relative">
            <div className="w-full h-96 imagen relative rounded-lg overflow-hidden" />
            <div className="absolute bottom-0 left-0 p-10 flex flex-col gap-3 justify-center z-20">
                <h4 className="text-sm text-white ">Politics</h4>
                <h2 className="text-3xl text-white font-semibold">Trump endorses raising minimum age for more weapons, revives idea of arming teachers</h2>
            </div>
            <style jsx>
                {`

                .imagen {
                background-image: url("/venezuela.png");
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


const NewsListSecondary = () => {
    return (
        <div className="py-4 border-b grid grid-cols-3">
            <img className="w-16 h-16 bg-black ... overflow-hidden rounded-lg" />
            <h2 className="text-sm font-semibold col-span-2">Barack Obama and Family Visit Balinese Paddy Fields</h2>
        </div>
    )
}



const BlockTwoNews = () => {
    const News = () => {
        return (
            <div className="w-full flex-col flex gap-1">
                <img className="w-full h-60 bg-black rounded-lg overflow-hidden" />
                <h3 className="text-sm font-semibold text-yellow-500">Politics</h3>
                <h2 className="font-semibold ">Barack Obama and Family Visit Balinese Paddy Fields</h2>
                <p className="text-xs ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores qui doloremque voluptate earum vitae blanditiis pariatur. Suscipit voluptates est aliquid!</p>
            </div>
        )
    }
    return (
        <div className="grid grid-cols-2 gap-6">
            <News />
            <News />
        </div>
    )
}


const NewsBlock = () => {
    const News = () => {
        return (
            <div className="w-full ... flex flex-col gap-1">
                <div className=" w-full h-60 bg-black rounded-lg overflow-hidden" />
                <h3 className="text-sm font-semibold text-yellow-500">Politics</h3>
                <h2 className="font-semibold ">Barack Obama and Family Visit Balinese Paddy Fields</h2>
                <p className="text-xs ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores qui doloremque voluptate earum vitae blanditiis pariatur. Suscipit voluptates est aliquid!</p>
            </div>

        )
    }
    return (
        <div className="w-full grid grid-cols-4 gap-6">
            <News />
            <div className="col-span-2 w-full">
                <BlockPrincipal />
            </div>
            <News />
            <div className="col-span-2 w-full">
                <BlockPrincipal />
            </div>
            <News />
            <News />
        </div>
    )
}


const BlockInlineX4 = ({color}) => {

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


const Block3ColsAds = ({color}) => {

    const News = () => {
        return (
            <div className="w-full flex items-center gap-6 grid grid-cols-4">
                <img className="w-20 h-20 rounded-md bg-black" />
                <h2 className="col-span-3 font-semibold text-sm">Barack Obama and Family Visit Balinese Paddy Fields</h2>
            </div>
        )
    }
    return (
        <div className="w-full grid grid-cols-3 gap-12">
            <div className="col-span-2 grid grid-cols-2 gap-6">
            <News />
            <News />
            <News />
            <News />
            <News />
            <News />
            </div>
            <div>
                <img src="/ads.png"/>
            </div>
        </div>
    )
}


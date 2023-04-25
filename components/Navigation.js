import { LoadingContextProvider, SidebarContextProvider, AuthContextProvider } from "../context";
import { FlechaIcon, MenuIcono, UserVews } from "./icons.js";
import { UserConected } from "./userConected.js";
import { useEffect, useState } from "react";
import { useAuthentication } from "../utils/Authentication.js";
import Link from "next/link";
import useHover from "../hooks/useHover.js";
import Search from "./Search.js";
import router from 'next/router'
import Slider from "react-slick";
import Image from "next/image";

/* import "slick-carousel/slick/slick-theme.css"; */

const Navigation = ({ show, setShow }) => {
    const { home, isVisible, setSidebar } = SidebarContextProvider()
    const { setLoading } = LoadingContextProvider()
    const { _signOut } = useAuthentication()
    const { user } = AuthContextProvider()
    const [hoverRef, isHovered] = useHover()
    const [hoverRef3, isHovered3] = useHover()
    const [hoverRef2, isHovered2] = useHover()
    const [hoverRef1, isHovered1] = useHover()
    const [menu, setMenu] = useState(true)
    const dataHome = home.ultimasNoticias

    const settings = {
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };

    const topMenu = [
        { title: "Noticias", route: "" },
        { title: "Vida", route: "" },
        { title: "Publicidad", route: "" },
        { title: "Contacto", route: "" },
    ];

    const mainMenu = [
        { title: "Inicio", route: "/", menu: false },
        { title: "Region Murcia", route: "/category/locales-murcia", menu: false },
        { title: "Deportes", route: "/category/deportes", menu: false },
        { title: "Economía", route: "/category/economía", menu: false },
        { title: "Cultura", route: "/category/cultura", menu: false },
        { title: "Opinión", route: "/category/opinión", menu: false },

    ];

    useEffect(() => {

        const start = () => {
            setLoading(true);
        };
        const end = () => {
            setLoading(false);
        };
        router.events.on("routeChangeStart", start);
        router.events.on("routeChangeComplete", end);
        router.events.on("routeChangeError", end);
        return () => {
            router.events.off("routeChangeStart", start);
            router.events.off("routeChangeComplete", end);
            router.events.off("routeChangeError", end);
        };
    }, [router])

    const onClick = () => {
        setMenu(!menu)
    }

    const onChange = async () => {
        setMenu(!menu)
        setLoading(true);
        _signOut()
        setLoading(false)
    }

    const handleClick = () => {
        if (!user) {
            router.push(`/login/?d=${router.asPath}`)
        } else {
            onClick()
        }
    }

    return (
        <header>
            <div className="bg-white relative max-w-screen-lg w-full mx-auto inset-x-0 flex flex-col justify-start realtive   pl-2">

                <div className=" flex items-center justify-between mt-4 ">

                    <div className="hidden md:block" >
                        <label className="text-redTextoEncabezado font-semibold mr-3" >Ultima hora</label>
                        <label className="font-semibold">El gobierno aprueba una ley Especial</label>
                    </div>

                    <div className="md:block flex gap-4 items-center w-max">
                        <Search />
                    </div>

                    {/* <ForecastComponent /> */}
                    <div className="hidden md:block">
                        <div className="flex gap-2 justify-center items-center justify-content-center ">

                            <div ref={hoverRef1} className=" cursor-pointer  " onClick={() => router.push("https://cms.diariocivitas.com")} >
                                <div className="flex items-center justify-content-center w-full">
                                    <img className="h-5 w-5" src="/-publica.png" />
                                    <span className="text-xs pl-0.5 font-semibold">Publicar articulo</span>
                                </div>
                                <div className={`h-0.5 bg-black w-full transform ${isHovered1 ? "scale-115" : "scale-0"} transition`} />
                            </div>

                            <div ref={hoverRef2} className=" items-center cursor-pointer"
                                onClick={() => {
                                    setLoading(true)
                                    router.push("/suscripcion/hazte-Socio")
                                }}
                            >
                                <div className="flex items-center ">
                                    <img className="h-5 w-5" src="/business-card.png" />
                                    <span className="text-xs pl-0.5 font-semibold ">Hazte Socio/a</span>
                                </div>
                                <div className={`h-0.5 bg-black w-full transform ${isHovered2 ? "scale-115" : "scale-0"} transition`} />


                            </div>

                            <div ref={hoverRef3} onClick={() => handleClick()} className=" pt-1.5 mr-2 h-10  cursor-pointer font-semibold text-sm ">
                                <UserConected />
                                <div className={`h-0.5 bg-black w-full transform ${isHovered3 ? "scale-115" : "scale-0"} transition`} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${menu ? "hidden" : "block absolute right-2 top-12"} `}>
                    <OpcionesMenu SignOutClick={onChange} />
                </div>

                <div className="flex justify-between* items-center h-14 ">
                    <span className="md:hidden cursor-pointer mb-2 " onClick={() => setSidebar(!isVisible)}>
                        <MenuIcono className="text-gray-900 h-8 w-10" />
                    </span>

                    <span className="overflow-visible w-3/4 mb-3 md:mb-0 ">
                        <img alt="Logo civitas.com" src="/logo.png" className="sm:w-1/2  *object-contain hover:scale-105 transition transform duration-800 cursor-pointer" onClick={() => router.push("/")} />
                    </span>

                    <div className="w-80  mr-[-2rem]  transform scale-75 hidden md:block ">
                        <Slider {...settings}>
                            {dataHome?.map(({ title, imgMiniatura, authorUsername, createdAt }, idx) => {
                                return (
                                    <>
                                        <Carrusel title={title} imgMiniatura={imgMiniatura} key={idx} authorUsername={authorUsername} createdAt={createdAt} />
                                    </>
                                )
                            })}

                        </Slider>
                    </div>

                    <div className=" flex   ">
                        <button
                            onClick={() => {
                                setLoading(true)
                                router.push("/peticiones/nueva-peticion")
                            }}
                            className="hover:underline bg-redBottomPeticion text-white font-semibold text-sm pb-2 px-3 py-2 rounded-tl-3xl hidden md:block"
                        >
                            Crea tu peticion
                        </button>
                    </div>
                </div>

            </div>

            <div className="hidden md:block">
                <div className="flex justify-between bg-blue-800 py-1 max-w-screen-lg mx-auto inset-x-0 text-white md:place-items-center">
                    <ul className="flex  xl:max-w-screen-lg font-body py-1 justify-start itemes-center pl-5">
                        {mainMenu.map(({ title, route, menu }, idx) => {
                            return (
                                <ItemNav key={idx} refe={hoverRef} title={title} menu={menu} route={route} />
                            );
                        })}
                    </ul>

                    <div className="flex pr-4 space-x-1">
                        <button onClick={() => router.push("https://www.facebook.com/diariocivitas?mibextid=ZbWKwL")}><img src="/-facebook.png" /></button>
                        <button onClick={() => router.push("https://instagram.com/diariocivitas?igshid=YmMyMTA2M2Y=")} ><img src="/-instagram.png" /></button>
                        <button onClick={() => router.push("https://twitter.com/DiarioCivitas")}><img src="/-twitter.png" /></button>
                        <button onClick={() => router.push("/")}><img src="/-whatsapp.png" /></button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navigation


const ItemNav = ({ title, menu, refe, route }) => {
    const [hoverRef, isHovered] = useHover()
    return (
        <Link href={route} replace={true} >
            <li ref={hoverRef} className="h-full cursor-pointer mr-9">
                <h2 ref={refe} className="text-sm  flex items-center gap-1 font-semibold subpixel-antialiased uppercase ">
                    {title}
                    {menu ? (
                        <FlechaIcon className="w-2 h-2" />
                    ) : null}
                </h2>
                <div className={`h-0.5 bg-white w-full transform ${isHovered ? "scale-115" : "scale-0"} transition`} />
            </li>
        </Link>
    )
}

const Carrusel = ({ title, imgMiniatura, authorUsername, createdAt }) => {


    return (
        <>
            <div className=" *bg-blue-200  w-full h-14 flex truncate ">

                <div className=" h-14 ">
                    <img
                        src={`${process.env.NEXT_PUBLIC_API_URL_new}${imgMiniatura.i320}`}
                        alt={title}
                        height={"80px"}
                        width={"100px"}
                        className="rounded-md"
                    />
                </div>

                <div className=" flex flex-col justify-center pl-2  bg-red-200* w-48 *space-y-4">

                    <div className=" truncate w-48  text-sm w-3">{title}</div>

                    <div className="flex justify-between">

                        <span className="text-xs">
                            {authorUsername ? authorUsername : "Anonimo"}
                        </span>

                        <div className="flex items-center text-xs space-x-1 ">
                            <UserVews />
                            <span className="truncate w-16" >

                                {createdAt}
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

const OpcionesMenu = ({ SignOutClick }) => {
    return (
        <>
            <div className="flex flex-col bg-gray-100 rounded-md px-3 py-1  divide-y-1">
                <div className="pb-1">
                    <button onClick={() => SignOutClick()}> Logout </button>
                </div>
                <div className="pt-1">

                    <button>Configurar</button>
                </div>
            </div>
        </>
    )
}






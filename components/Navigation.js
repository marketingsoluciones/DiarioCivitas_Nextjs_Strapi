import { LoadingContextProvider, SidebarContextProvider, AuthContextProvider } from "../context";
import { FlechaIcon, MenuIcono, UserVews } from "./icons.js";
import { UserConected } from "./userConected.js";
import { useEffect, useState } from "react";
import { useAuthentication } from "../utils/Authentication.js";
import { Markup } from "interweave";
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
    const [menu, setMenu] = useState(true)
    const dataHome = home.ultimasNoticias


    const settings = {
        arrows: false,
        infinite: true,
        autoplay: true,
        spaceBetween: 0,
        speed: 900,
        slidesToShow: 2,
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
            <div className="bg-white relative max-w-screen-lg w-full mx-auto inset-x-0 flex flex-col justify-start realtive pl-2">
                {/* primera fila del header */}
                <div className={` flex md:w-screen lg:w-full items-center justify-between ${user ? "md:space-x-*" : "md:space-x-10 lg:space-x-40"} mt-1`}>

                    <div className="hidden md:block md:w-2/4* transform md:scale-90    " >
                        <label className="md:text-xs lg:text-base  text-redTextoEncabezado font-display mr-1" >Ultima hora</label>
                        <label className="md:text-xs lg:text-base  font-display md:truncate">El gobierno aprueba una ley Especial</label>
                    </div>

                    <div className="hidden md:block  transform md:scale-75 lg:scale-100  ">
                        <div className="flex gap-2 justify-center items-center justify-content-center  ">

                            <Search />
                            <Link href={"https://cms.diariocivitas.com"}>

                                <a target="_blank">
                                    <div className=" hover:border-gray-400 border-gray-600 cursor-pointer border-1 rounded-lg py-0.5 px-1 flex items-center justify-content-center w-full* " >
                                        <img className="h-5 w-5" src="/-publica.png" />
                                        <span className="text-xs pl-0.5 font-display">Publicar articulo</span>
                                    </div>
                                </a>
                            </Link>

                            <div className=" flex items-center cursor-pointer border-1 rounded-md py-0.5 px-1 border-gray-600 hover:border-gray-400"
                                onClick={() => {
                                    setLoading(true)
                                    router.push("/suscripcion/hazte-Socio")
                                }}
                            >
                                <img className="h-5 w-5" src="/business-card.png" />
                                <span className="text-xs pl-0.5 font-semibold md:font-normal">Hazte Socio/a</span>

                            </div>

                            <div onClick={() => handleClick()} className=" border-gray-600 hover:border-gray-400 border-1 rounded-lg p-0.5 pt-1.5* mr-2 h-10*  cursor-pointer font-semibold text-xs w-full* ">
                                <UserConected />
                            </div>
                        </div>
                    </div>
                </div>

                {/* menu desplegable para las opciones del usuario */}
                <div className={`${menu ? "hidden" : "block absolute md:right-7 lg:right-2 md:top-3 lg:top-8 z-30"} `}>
                    <OpcionesMenu SignOutClick={onChange} />
                </div>

                {/* segunda fila del header */}
                <div className="flex  w-full items-center  h-14 ">

                    {/* burguer menu movil */}
                    <span className="md:hidden cursor-pointer mb-2 " onClick={() => setSidebar(!isVisible)}>
                        <MenuIcono className="text-gray-900 h-8 w-10" />
                    </span>

                    {/* Logo */}
                    <span className="overflow-visible w-3/5 md:w-1/4 lg:w-1/4  mb-3 md:mb-0 lg:mr-36 ">
                        <img alt="Logo civitas.com" src="/logo.png" className="sm:w-1/2*  *object-contain hover:scale-105 transition transform duration-800 cursor-pointer" onClick={() => router.push("/")} />
                    </span>

                    {/* div donde esta el carrucel  */}
                    <div className="lg:w-1/2 md:w-3/5 md:mr-[-6rem] lg:mr-[-3rem]  md:ml-14 lg:ml-0 transform lg:scale-75 md:scale-50   hidden md:block ">
                        <Slider {...settings}>
                            {dataHome?.map(({ title, imgMiniatura, authorUsername, createdAt, content }, idx) => {
                                return (
                                    <>
                                        <Carrusel title={title} imgMiniatura={imgMiniatura} key={idx} authorUsername={authorUsername} createdAt={createdAt} content={content} />
                                    </>
                                )
                            })}

                        </Slider>
                    </div>

                    {/* div del boton rojo para nuevas peticiones */}
                    <div className=" hidden md:block  transform  md:scale-75 lg:scale-100">

                        <div onClick={() => {
                            setLoading(true)
                            router.push("/peticiones/nueva-peticion")
                        }} className="text-white font-display cursor-pointer flex items-center bg-redBottomPeticion hover:bg-red-500 rounded-2xl py-0.5 pl-0.5  md:pr-2 lg:pr-3 md:space-x-1 lg:space-x-2 w-max md:text-xs lg:text-base ">
                            <img
                                src="/Plusicon.png"
                            />
                            <span>Nueva petición</span>
                        </div>
                    </div>
                </div>

            </div>

            <div className="hidden md:block">
                <div className="flex justify-between  bg-blue-800 py-1 max-w-screen-lg mx-auto inset-x-0 text-white md:place-items-center">
                    <ul className="flex   xl:max-w-screen-lg font-body py-1 justify-start itemes-center pl-5">
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
            <li ref={hoverRef} className="h-full cursor-pointer md:mr-4 lg:mr-9 ">
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

const Carrusel = ({ title, imgMiniatura, authorUsername, createdAt, content }) => {


    return (
        <>
            <div className="  h-14 flex flex-col truncate md:mr-1 lg:mr-3 ">
                <div className="flex  h-10 truncate ">
                    <div>
                        <div className=" truncate w-40 font-display   ">
                            {title}
                        </div>

                        <div className=" truncate w-40 h-5 font-display  text-sm ">
                            <Markup noHtml={true} content={content} />
                        </div>
                    </div>

                    <div className="md:w-26 ">
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_URL_new}${imgMiniatura.i320}`}
                            alt={title}
                            height={"80px"}
                            width={"80px"}
                            className="rounded-md"
                        />
                    </div>
                </div>

                <div className="flex justify-between">

                    <span className="text-xs font-display">
                        {authorUsername ? authorUsername : "Anonimo"}
                    </span>

                    <div className="flex items-center text-xs space-x-1 ">
                        <UserVews />
                        <span className="truncate w-16 font-display" >

                            {createdAt}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

const OpcionesMenu = ({ SignOutClick }) => {
    return (
        <>
            <div className="flex flex-col bg-gray-100 rounded-md px-3 py-1  divide-y-1 md:scale-50 lg:scale-90">
                <div className="pb-1 font-display">
                    <button onClick={() => SignOutClick()}> Logout </button>
                </div>
                <div className="pt-1 font-display">

                    <button>Configurar</button>
                </div>
            </div>
        </>
    )
}






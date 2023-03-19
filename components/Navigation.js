import Link from "next/link";
import useHover from "../hooks/useHover.js";
import ForecastComponent from "./ForecastComponent.js";
import { FacebookIcon, FlechaIcon, InstagramIcon, MenuIcono, TwitterIcon } from "./icons.js";
import Search from "./Search.js";
import router from 'next/router'
import { useContext, useEffect } from "react";
import { SidebarContext } from "../context/SidebarContext.js";
import { LoadingContext } from "../context/LoadingContext.js";
import Image from 'next/image'

const Navigation = ({ show, setShow }) => {
    const { setLoading } = useContext(LoadingContext)
    const [hoverRef, isHovered] = useHover()
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

    const { isVisible, setSidebar } = useContext(SidebarContext)

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
    return (
        <header>
            {/*             
                <div className="bg-primary py-2 px-4 max-w-screen-lg w-full mx-auto inset-x-0 text-white flex items-center justify-center md:justify-between">
                    <ul className="md:flex gap-4 w-max hidden ">
                        {topMenu.map(({ title, route }, idx) => {
                            return (
                                <Link key={idx} href={route}>
                                    <li className="font-body text-xs cursor-pointer hover:text-gray-400">
                                        {title}
                                    </li>
                                </Link>
                            );
                        })}
                    </ul>

                    <div className="flex gap-4 items-center w-max">
                        <Link href={"/login"}>
                        <p className="text-xs cursor-pointer hover:text-gray-300 text-white ">Iniciar sesión</p>
                        </Link>
                        <FacebookIcon className="text-white w-4 h-4" />
                        <TwitterIcon className="text-white w-4 h-4" />
                        <InstagramIcon className="text-white w-4 h-4" />
                    </div>
                </div> */}


            <div className="max-w-screen-lg bg-white w-full mx-auto inset-x-0 flex items-center justify-between gap-4 py-7 px-4">
                <span className="md:hidden cursor-pointer" onClick={() => setSidebar(!isVisible)}>
                    <MenuIcono className="text-gray-900 h-6 w-6" />
                </span>
                <ForecastComponent />
                <span className="w-60 md:absolute mx-auto inset-x-0 md:w-96 grid place-items-center overflow-visible">
                    <img src="/logo.png" className="w-full w-60 object-contain hover:scale-105 transition transform duration-800 cursor-pointer" onClick={() => router.push("/")} />
                </span>

                <div className="flex gap-4 items-center">
                    <Search />
                </div>
            </div>


            <div className="hidden w-full bg-blue-800 
            max-w-screen-lg mx-auto inset-x-0 text-white h-max md:grid md:place-items-center shadow relative ">
                <ul className="flex w-full xl:max-w-screen-lg font-body py-2 justify-between px-5">
                    {mainMenu.map(({ title, route, menu }, idx) => {
                        return (
                            <ItemNav key={idx} ref={hoverRef} title={title} menu={menu} route={route} />
                        );
                    })}
                </ul>

            </div>
        </header>
    )
}

export default Navigation


const ItemNav = ({ title, menu, ref, route }) => {
    const [hoverRef, isHovered] = useHover()
    return (
        <Link href={route} replace={true} >
            <li ref={hoverRef} className="h-full cursor-pointer">
                <h2 ref={ref} className="text-sm px-1 flex items-center gap-1 font-semibold subpixel-antialiased uppercase ">
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


const BlockNavbar = () => {
    return (
        <div className="w-full top-9 absolute left-0 h-max bg-gray-400 p-8 grid grid-cols-5 gap-4 ">
            <div className="col-span-1 bg-black h-40 w-full">

            </div>
            <div className="col-span-4 grid grid-cols-3 gap-4 h-40 w-full">
                <div className="bg-green-500">
                    Hola
                </div>
                <div className="bg-green-500">
                    Hola
                </div>
                <div className="bg-green-500">
                    Hola
                </div>
            </div>
        </div>
    )
}


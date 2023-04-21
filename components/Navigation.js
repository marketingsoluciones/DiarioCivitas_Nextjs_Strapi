import Link from "next/link";
import useHover from "../hooks/useHover.js";
import { FlechaIcon, MenuIcono } from "./icons.js";
import Search from "./Search.js";
import router from 'next/router'
import { useEffect } from "react";
import { LoadingContextProvider, SidebarContextProvider, AuthContextProvider } from "../context";

import { useAuthentication } from "../utils/Authentication.js";
import { UserConected } from "./userConected.js";

const Navigation = ({ show, setShow }) => {
    const { _signOut } = useAuthentication()
    const { user } = AuthContextProvider()

    const { setLoading } = LoadingContextProvider()
    //const router = useRouter()
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

    const { isVisible, setSidebar } = SidebarContextProvider()

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

    const handleClick = () => {
        if (!user) {
            router.push(`/login/?d=${router.asPath}`)
        } else {
            setLoading(true);
            _signOut()
        }
    }
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



            <div className="bg-white relative max-w-screen-lg w-full mx-auto inset-x-0 flex flex-col justify-start gap-8* pt-11* px-4">
                <div className=" flex items-center justify-between mt-4 ">

                    <div className="hidden md:block" >
                        <label className="text-redTextoEncabezado font-semibold mr-3" >Ultima hora</label>
                        <label className="font-semibold">El gobierno aprueba una ley Especial</label>
                    </div>

                    <div className="md:block flex gap-4 items-center w-max">
                        <Search />
                    </div>

                    {/* <ForecastComponent /> */}
                    <div
                        className="  hidden md:block  font-semibold text-sm items-center hover:text-gray-300 "
                        onClick={handleClick}
                    >
                        <div className="flex w-40 h-10 items-center cursor-pointer">
                            <UserConected />
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center ">
                    <span className="md:hidden cursor-pointer mb-2 " onClick={() => setSidebar(!isVisible)}>
                        <MenuIcono className="text-gray-900 h-8 w-10" />
                    </span>

                    <span className="overflow-visible w-3/4 mb-3 md:mb-0 ">
                        <img alt="Logo civitas.com" src="/logo.png" className="sm:w-1/2  *object-contain hover:scale-105 transition transform duration-800 cursor-pointer" onClick={() => router.push("/")} />
                    </span>

                    <div className="absolute* flex pt-2  ">
                        <button
                            className=" hover:underline bg-blue-800 text-white font-semibold text-sm pb-2 px-3 w-78* py-4 rounded-t-3xl hidden md:block"
                            onClick={() => {
                                setLoading(true)
                                router.push("/peticiones/nueva-peticion")
                            }}
                        >
                            Crea tu peticion
                        </button>
                        <button
                            onClick={() => {
                                setLoading(true)
                                router.push("/suscripcion/hazte-Socio")
                            }}
                            className="hover:underline bg-redBottomPeticion text-white font-semibold text-sm pb-1 px-3 py-4 rounded-t-3xl hidden md:block"
                        >
                            Hazte socio
                        </button>
                    </div>
                </div>
            </div>

            <div
                className="hidden w-full bg-blue-800 max-w-screen-lg mx-auto inset-x-0 text-white h-max md:grid md:place-items-center shadow relative ">
                <ul className="flex w-full xl:max-w-screen-lg font-body py-1 justify-start itemes-center px-5">
                    {mainMenu.map(({ title, route, menu }, idx) => {
                        return (
                            <ItemNav key={idx} refe={hoverRef} title={title} menu={menu} route={route} />
                        );
                    })}
                </ul>
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




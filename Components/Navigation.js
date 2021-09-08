import Link from "next/link";
import useHover from "../hooks/useHover.js";
import ForecastComponent from "./ForecastComponent.js";
import { FacebookIcon, FlechaIcon, InstagramIcon, MenuIcono, TwitterIcon } from "./icons.js";
import Search from "./Search.js";
import router from 'next/router'

const Navigation = ({ show, setShow }) => {
    const topMenu = [
        { title: "Noticias", route: "" },
        { title: "Vida", route: "" },
        { title: "Publicidad", route: "" },
        { title: "Contacto", route: "" },
    ];

    const mainMenu = [
        { title: "Inicio", route: "/", menu: false },
        { title: "Region Murcia", route: "/region-murcia", menu: true },
        // { title: "Murcia", route: "/murcia", menu: false },
        // { title: "Cartagena", route: "/cartagena", menu: false },
        // { title: "Lorca", route: "/lorca", menu: false },
        { title: "Deportes", route: "/deportes", menu: true },
        { title: "España", route: "/espana", menu: false },
        { title: "Mundo", route: "/mundo", menu: true },
        { title: "Economía", route: "/economia", menu: true },
        { title: "Cultura", route: "/cultura", menu: true },
        { title: "Opinión", route: "/opinion", menu: false },

    ];

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
                    <span className="md:hidden cursor-pointer" onClick={() => setShow(!show)}>
                        <MenuIcono className="text-gray-900 h-6 w-6" />
                    </span>
                    <ForecastComponent />
                    <span className="w-60 md:absolute mx-auto inset-x-0 md:w-96 grid place-items-center">
                        <img src="/logo.png" className="w-full w-60 object-contain hover:scale-105 transition transform duration-800 cursor-pointer" onClick={() => router.push("/")} />
                        
                    </span>

                    <div className="flex gap-4 items-center">
                        <Search />
                    </div>
                </div>
        

            <div className="hidden w-full bg-blue-800 
            max-w-screen-lg mx-auto inset-x-0 text-white h-max md:grid md:place-items-center shadow px-5">
                <ul className="flex w-full xl:max-w-screen-lg font-body py-2 justify-between">
                    {mainMenu.map(({ title, route, menu }, idx) => {
                        return (
                            <Link key={idx} href={route}>
                                <ItemNav title={title} menu={menu} />
                            </Link>
                        );
                    })}
                </ul>
            </div>
        </header>
    )
}

export default Navigation


const ItemNav = ({title, menu}) => {
    const [hoverRef, isHovered] = useHover()
    return (
        <li ref={hoverRef} className="h-full cursor-pointer">
            <h2 className="text-sm flex items-center gap-1 font-semibold subpixel-antialiased uppercase ">
                {title}
                {menu ? (
                    <FlechaIcon className="w-2 h-2" />
                ) : null}
            </h2>
            <div className={`h-0.5 bg-red-500 w-full transform ${isHovered ? "scale-115" : "scale-0" } transition`}/>
        </li>
    )
}

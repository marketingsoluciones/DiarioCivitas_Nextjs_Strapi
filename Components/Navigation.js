import Link from "next/link";
import ForecastComponent from "./ForecastComponent";
import { BuscadorIcon, FacebookIcon, FlechaIcon, InstagramIcon, MenuIcono, TwitterIcon } from "./icons";
import Search from "./Search";

const Navigation = () => {
    const topMenu = [
        { title: "Noticias", route: "" },
        { title: "Vida", route: "" },
        { title: "Publicidad", route: "" },
        { title: "Contacto", route: "" },
    ];

    const mainMenu = [
        { title: "Inicio", route: "/", menu: false },
        { title: "Local", route: "", menu: true },
        { title: "Actualidad", route: "", menu: true },
        { title: "Sucesos", route: "", menu: true },
        { title: "Emprendedores", route: "", menu: false },
        { title: "Economia", route: "", menu: true },
        { title: "Politica", route: "", menu: true },
        { title: "Cultura", route: "", menu: true },
        { title: "Opinion", route: "", menu: false },
        { title: "Deportes", route: "", menu: false },
    ];

    return (
        <header>
            <div className="w-full bg-primary shadow h-8 flex items-center ">
                <div className="max-w-screen-xl w-full mx-auto inset-x-0 text-white flex items-center justify-between">
                    <ul className="flex gap-4 w-max">
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

                    <div className="flex gap-4 w-max">
                        <FacebookIcon className="text-white w-4 h-4" />
                        <TwitterIcon className="text-white w-4 h-4" />
                        <InstagramIcon className="text-white w-4 h-4" />
                    </div>
                </div>
            </div>

            <div className="h-max py-6 relative bg-white shadow w-full">
                <div className="max-w-screen-xl w-full mx-auto inset-x-0 flex items-center justify-between gap-4">
                    <ForecastComponent />

                    <span className="w-60 md:absolute mx-auto inset-x-0 md:w-96 pr-6 pl-3 grid place-items-center">
                        <img src="/logo.png" className="w-full" />
                    </span>

                    <div className="flex gap-4 items-center">
                        <Search/>
                        <span className="md:hidden cursor-pointer" onClick={() => setShow(!show)}>
                            <MenuIcono className="text-gray-900 h-6 w-6" />
                        </span>

                    </div>
                </div>
            </div>

            <div className="hidden w-full bg-white h-max md:grid md:place-items-center shadow">
                <ul className="flex w-full max-w-screen-lg w-full justify-center">
                    {mainMenu.map(({ title, route, menu }, idx) => {
                        return (
                            <Link key={idx} href={route}>
                                <li className="h-full py-3 px-6 hover:bg-primary hover:text-white  cursor-pointer">
                                    <h2 className="font-display text-sm flex items-center gap-1 font-semibold subpixel-antialiased uppercase ">
                                        {title}
                                        {menu ? (
                                            <FlechaIcon className="w-2 h-2" />
                                        ) : null}
                                    </h2>
                                </li>
                            </Link>
                        );
                    })}
                </ul>
            </div>
        </header>
    )
}

export default Navigation

import{ useState } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  FacebookIcon,
  MenuIcono,
  TwitterIcon,
  InstagramIcon,
  FlechaIcon,
  BuscadorIcon,
} from "../Components/icons";
import SidebarMobile from "../Components/SidebarMobile";

const DefaultLayout = ({ children }) => {
  const [show, setShow] = useState(false)
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

  const categories = [
    "About",
    "News",
    "Advertise",
    "Support",
    "Features",
    "Contact",
  ];

  const FechaActual = () => {
    let date = new Date();
    let arr = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    let day = date.getDate();
    let month = arr.filter((mes, index) => {
      if (index == date.getMonth()) {
        return mes;
      }
    })[0];
    let year = date.getFullYear();

    return `${day} de ${month} del ${year}`;
  };
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <title>Diario Civitas</title>
      </Head>
      {show ? 
              <SidebarMobile menu={mainMenu} set={(signal) => setShow(signal)} state={show} />
              : null}
      <header>
        <div className="relative bg-primary shadow h-8 w-full grid place-items-center px-3">
          <div className="max-w-screen-xl w-full flex text-white items-center justify-between gap-4">
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
        <div className="h-max py-3 relative bg-white shadow w-full grid place-items-center">
          <div className="max-w-screen-xl w-full flex items-center justify-between gap-4">
            <div>
              <span className="flex gap-2">
                <p>Murcia</p>
                <p>26°C</p>
              </span>
              <p className="text-xs text-gray-600 font-display">
                {FechaActual()}
              </p>
            </div>

            <span className="w-60 md:absolute mx-auto inset-x-0 md:w-96 pr-6 pl-3 grid place-items-center">
              <img src="/logo.png" className="w-full" />
            </span>

            <div className="flex gap-4 items-center">
              <div className="hidden md:block relative">
              <input className="font-body text-sm border rounded-lg pl-2 py-1 focus:outline-none" placeholder="Buscar" />
              <BuscadorIcon className="absolute top-0 bottom-0 right-3 m-auto w-4 h-4" />
              </div>
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
                  <li className="h-full py-3 px-2 hover:bg-primary hover:text-white  cursor-pointer">
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
      <main className="bg-white w-full grid grid-cols-1 place-items-center">
        {children}
      </main>

      <footer className="relative bg-primary h-full py-8 w-full grid place-items-center">
        <div className="max-w-screen-xl w-full flex justify-between">
          <div>
            <h2 className="font-display text-white font-semibold text-4xl antialiased">
              Deus
            </h2>
            <p className="text-sm font-body text-white">
              © 2021 | Francisco Montilla.
            </p>
            <div className="flex gap-4 py-2 items-center">
              <div className="h-10 w-10 rounded-full bg-blue-700 grid place-items-center">
                <FacebookIcon className="text-white w-5 h-5" />
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-500 grid place-items-center">
                <TwitterIcon className="text-white w-5 h-5" />
              </div>
              <div className="h-10 w-10 rounded-full bg-pink-600 grid place-items-center">
                <InstagramIcon className="text-white w-5 h-5" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-display text-white uppercase text-lg font-bold">
              useful links
            </h3>
            <ul className="flex flex-col gap-1 pt-4">
              {categories.map((category, idx) => (
                <li key={idx} className="font-body text-white text-xs">{category}</li>
              ))}
            </ul>
          </div>

          <div className="">
            <h3 className="font-display text-white uppercase text-lg font-bold">
              Popular Posts
            </h3>
            <PopularPost title="Lose These 12 Bad Habits If You're Serious About Becoming a Millionaire" />
            <PopularPost title="Lose These 12 Bad Habits If You're Serious About Becoming a Millionaire" />
          </div>

          <div className="">
            <h3 className="font-display text-white uppercase text-lg font-bold">
              Suscribete
            </h3>
            
          </div>
        </div>
      </footer>
    </>
  );
};

export default DefaultLayout;

const PopularPost = (props) => {
  const { image, title } = props;
  return (
    <div className="flex w-full py-4">
      <div className="bg-gray-200 w-16 h-16 rounded-full">
        <img src={image} />
      </div>
      <div className="w-2/3 pl-2 h-full flex flex-col justify-center">
        <h3 className="text-xs text-white font-body">{title}</h3>
        <p className="text-xs pt-2 text-white">
          Francisco Montilla | 01 Marzo 2020
        </p>
      </div>
    </div>
  );
};

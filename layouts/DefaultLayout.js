import{ useState } from "react";
import Head from "next/head";
import SidebarMobile from "../components/SidebarMobile";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { useRouter } from "next/router";
import { Capitalize } from "../utils/Capitalize";

const DefaultLayout = ({ children }) => {
  const [show, setShow] = useState(false)

  
  const router = useRouter()
  const title = {
    "/[slug]" : Capitalize(router?.query?.slug?.replace(/-/g, " ")),
    "/" : "Diario Civitas"
  }
  return (
    <div className="banner">
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <title>{title[router.pathname]}</title>
      </Head>
      {show ? 
              <SidebarMobile menu={mainMenu} set={(signal) => setShow(signal)} state={show} />
              : null}
      <Navigation show={show} setShow={act => setShow(act)} />
      <main className="w-full ">
        {children}
      </main>

            <Footer />
      
      <style jsx>
        {`
        .banner {
          background-image: url('/newspaper2.png');
          background-size: 800px;
          background-repeat: repeat;
          background-attachment: fixed;
        }
        `}
      </style>
    </div>
  );
};

export default DefaultLayout;


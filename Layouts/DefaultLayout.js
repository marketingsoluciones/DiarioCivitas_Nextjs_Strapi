import{ useState } from "react";
import Head from "next/head";
import SidebarMobile from "../Components/SidebarMobile";
import Footer from "../Components/Footer";
import Navigation from "../Components/Navigation";

const DefaultLayout = ({ children }) => {
  const [show, setShow] = useState(false)

  

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
      <Navigation />
      <main className="bg-white w-full grid grid-cols-1 place-items-center">
        {children}
      </main>

            <Footer />
      
    </>
  );
};

export default DefaultLayout;


import{ useState } from "react";
import Head from "next/head";
import SidebarMobile from "../components/SidebarMobile";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { useRouter } from "next/router";
import { Capitalize } from "../utils/Capitalize";
import {SidebarContextProvider} from '../context/SidebarContext'

const DefaultLayout = ({ children }) => {
  
  
  const router = useRouter()
  const title = {
    "/[slug]" : Capitalize(router?.query?.slug?.replace(/-/g, " ")),
    "/" : "Diario Civitas"
  }
  return (
    <SidebarContextProvider>
    <div className="bg-gray-200">
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <title>{title[router.pathname]}</title>
      </Head>
              <SidebarMobile/>
      <Navigation />
      <main className="w-full ">
        {children}
      </main>

            <Footer />
      
      
    </div>
    </SidebarContextProvider>
  );
};

export default DefaultLayout;


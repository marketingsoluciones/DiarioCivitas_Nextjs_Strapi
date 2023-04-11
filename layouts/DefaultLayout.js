import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import SidebarMobile from "../components/SidebarMobile";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { useRouter } from "next/router";
import { Capitalize } from "../utils/Capitalize";
import { SidebarContextProvider } from "../context/SidebarContext";
import { LoadingContextProvider } from "../context/LoadingContext";
import LoadingComponent from "../components/LoadingComponent";
import ReactGA from 'react-ga';
import GoogleAnalytics from "../components/GoogleAnalytics";

const DynamicAuthProvider = dynamic(() =>
  import("../context/AuthContext").then((mod) => mod.AuthProvider)
);

const DefaultLayout = ({ children }) => {
  const router = useRouter();
  const title = {
    "/[slug]": Capitalize(router?.query?.slug?.replace(/-/g, " ")),
    "/": "Diario Civitas",
  };


  return (
    <DynamicAuthProvider>
      <LoadingContextProvider>
        <SidebarContextProvider>
          <GoogleAnalytics />
          <div className="bg-gray-200">
            <Head>
              <link rel="shortcut icon" href="/favicon.ico" />
              <link
                href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
                rel="stylesheet"
              />
              <title>{title[router.pathname]}</title>
            </Head>
            <SidebarMobile />
            <Navigation />
            <main className="w-full ">{children}</main>

            <Footer />
          </div>
          <LoadingComponent />
        </SidebarContextProvider>
      </LoadingContextProvider>
    </DynamicAuthProvider>
  );
};

export default DefaultLayout;

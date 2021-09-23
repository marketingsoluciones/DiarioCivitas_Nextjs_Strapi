import "../styles/globals.css";
import DefaultLayout from "../layouts/DefaultLayout.js";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (

      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
  );
}

export default MyApp;

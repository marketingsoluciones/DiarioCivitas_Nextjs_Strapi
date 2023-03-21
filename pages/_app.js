import "../styles/globals.css";
import DefaultLayout from "../layouts/DefaultLayout.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DefaultSeo } from "next-seo";
import SEO from '../next-seo.config';

function MyApp({ Component, pageProps }) {
  return (
    <DefaultLayout>
      <DefaultSeo {...SEO}/>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}

export default MyApp;

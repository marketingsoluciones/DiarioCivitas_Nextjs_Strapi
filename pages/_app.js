import "../styles/globals.css";
import DefaultLayout from "../layouts/DefaultLayout.js";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function MyApp({ Component, pageProps }) {
  return (
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
  );
}

export default MyApp;

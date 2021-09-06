import 'tailwindcss/tailwind.css'
import DefaultLayout from '../Layouts/DefaultLayout'
import "@fontsource/kaisei-harunoumi"

function MyApp({ Component, pageProps }) {
    return (
        <DefaultLayout>
        <Component {...pageProps} />
        </DefaultLayout>
    )
  }
  
  export default MyApp
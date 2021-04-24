import 'tailwindcss/tailwind.css'
import DefaultLayout from '../Layouts/DefaultLayout'

function MyApp({ Component, pageProps }) {
    return (
        <DefaultLayout>
        <Component {...pageProps} />
        </DefaultLayout>
    )
  }
  
  export default MyApp
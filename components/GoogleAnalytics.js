import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ReactGA from 'react-ga';

const GoogleAnalytics = () => {
    const router = useRouter()
    useEffect(() => {
        ReactGA.initialize('UA-158881217-3')
        console.log(router)
        ReactGA.pageview(router.asPath)
      }, [router.asPath])
    return (
        <>
        </>
    )
}

export default GoogleAnalytics

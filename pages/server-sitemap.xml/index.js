import {api} from '../../api'
import { getServerSideSitemap } from 'next-sitemap'

export const getServerSideProps = async (ctx) => {
    try {
        console.time("sitemap")
        const {data} = await api.FetchSiteMap()
        console.timeEnd("sitemap")
        const fields = data?.slugs?.map(item => (
            {
                loc: `https://diariocivitas.com/${item}`,
                changefreq : "daily",
                priority: 0.7,
                lastmod: new Date().toISOString(),
             }
        ))
        return getServerSideSitemap(ctx, fields)
        
    } catch (error) {
        console.log(error)
        return getServerSideSitemap(ctx, [])
    }
}

export default function Site () {}
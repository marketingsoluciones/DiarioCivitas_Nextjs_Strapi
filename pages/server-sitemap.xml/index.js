import {api} from '../../api'
import { getServerSideSitemap } from 'next-sitemap'

export const getServerSideProps = async (ctx) => {
    try {
        console.time("sitemap")
        const {data} = await api.FetchNews({_limit : 0})
        console.timeEnd("sitemap")
        console.log(data.length)
        const fields = data.map(item => (
            {
                loc: `https://diariocivitas.com/${item?.slug}`,
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
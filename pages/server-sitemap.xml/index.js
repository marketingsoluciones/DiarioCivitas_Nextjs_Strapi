import {api} from '../../api'
import { getServerSideSitemap } from 'next-sitemap'

export const getServerSideProps = async (ctx) => {
    try {
        const {data} = await api.FetchNewsSitemap()
        const fields = data.map(item => (
            {
                loc: item?.permaLink,
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
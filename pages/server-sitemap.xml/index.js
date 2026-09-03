import { fetchApi } from '../../utils/Fetching'
import { getServerSideSitemap } from 'next-sitemap'

export const getServerSideProps = async (ctx) => {
    try {
        console.time("sitemap")
        const resp = await fetchApi({
            query: `query($limit:Int, $development: String!) {
          getAllPost(limit:$limit, development:$development ){
            results{
              slug
            }
          }
        }`,
            variables: {
                //limit: 5,
                development: "diariocivitas"
            }
        })
        //        const { data } = await api.FetchSiteMap()
        console.timeEnd("sitemap")
        const results = Array.isArray(resp?.results) ? resp.results : []
        const fields = results
            .filter(item => item?.slug)
            .map(item => (
                {
                    loc: `https://diariocivitas.com/${item.slug}`,
                    changefreq: "daily",
                    priority: 0.7,
                    lastmod: new Date().toISOString(),
                }
            ))
        return await getServerSideSitemap(ctx, fields)

    } catch (error) {
        console.log(1009, error)
        return await getServerSideSitemap(ctx, [])
    }
}

export default function Site() { }
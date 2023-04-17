import axios from 'axios'
import Cookies from 'js-cookie';

let instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });
let instanceNew = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL_new });

const api = {
  graphql: async (data) => {
    const sessionCivitas = Cookies.get("sessionCivitas")
    let tokenFinal = undefined
    if (sessionCivitas) {
      tokenFinal = Cookies.get("idToken")
    }
    return await instanceNew.post("/graphql", data, {
      headers: {
        Authorization: `Bearer ${tokenFinal}`,
        Development: "diariocivitas"
      }
    })
  },

  FetchAllNews: async (params) => {
    return await instance.get('/posts', {
      params: params
    });
  },

  FetchNews: async (slug) => {
    return await instance.get(`/posts/slug/${slug}`);
  },

  FetchSiteMap: async () => {
    return await instance.get('/topslug')
  },

  FetchHome: async (params) => {
    return await instance.get('/toppost', {
      params: params
    })
  },

  FetchCategories: async () => {
    return await instance.get('/postcategorias')

  },
  FetchCategory: async (slug) => {
    return await instance.get(`/toppostcategories/slug/${slug}`)
  },

  Forecast: async (location) => {
    return await axios.get('https://api.m3o.com/v1/weather/Forecast', {
      params: {
        location: location
      },
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY_MICRO}`
      }
    })
  }
}

export { api };
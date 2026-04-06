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
    const headers = { Development: "diariocivitas" }
    if (tokenFinal) {
      headers.Authorization = `Bearer ${tokenFinal}`
    }
    return await instanceNew.post("/graphql", data, { headers })
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

  // Open-Meteo — gratuito, sin API key. Coordenadas fijas para Murcia.
  // Para otras ciudades: buscar lat/lon en https://open-meteo.com/en/docs
  Forecast: async () => {
    return await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: 37.9922,
        longitude: -1.1307,
        current_weather: true,
        timezone: 'Europe/Madrid',
      }
    })
  }
}

export { api };


import axios from 'axios'
import Cookies from 'js-cookie';

let instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });
let instanceNew = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL_new });

// Las respuestas del backend traen URLs de imágenes con el host interno
// `api3-mcp-graphql.eventosorganizador.com`, que NO resuelve públicamente (DNS) → las
// imágenes daban HTTP 000. El host público api-mcp.eventosorganizador.com sirve los MISMOS
// uploads (200). Reescribimos el host en todas las respuestas como workaround hasta que el
// backend devuelva las URLs con el host público.
// Hosts internos que el backend devuelve en las URLs de uploads pero que NO resuelven
// públicamente (api3-mcp-graphql, api3-bd). api-mcp.eventosorganizador.com sí sirve los
// mismos /uploads (200). Reescribimos cualquiera de ellos al host público.
const DEAD_IMG_HOSTS = /(api3-mcp-graphql|api3-bd)\.eventosorganizador\.com/g;
const rewriteImageHost = (res) => {
  try {
    if (res && res.data) {
      const raw = JSON.stringify(res.data);
      if (DEAD_IMG_HOSTS.test(raw)) {
        res.data = JSON.parse(raw.replace(DEAD_IMG_HOSTS, 'api-mcp.eventosorganizador.com'));
      }
    }
  } catch (_) { /* respuesta no JSON-serializable: dejar intacta */ }
  return res;
};
instance.interceptors.response.use(rewriteImageHost);
instanceNew.interceptors.response.use(rewriteImageHost);

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


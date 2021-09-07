import axios from 'axios'

let instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

const api = {
  FetchNews: async (params) => {
    return await instance.get('/posts', {
      params : params
    });
  },

  FetchCategories : async (params) => {
    return await instance.get('/postcategorias', {
      params: params
    })
  },

  Forecast: async (location) => {
    return await axios.get('https://api.m3o.com/v1/weather/Forecast', {
      params: {
        location: location
      },
      headers: {
        Authorization : `Bearer ${process.env.NEXT_PUBLIC_API_KEY_MICRO}` 
      }
    })
  }
}

export { api };
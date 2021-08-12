import axios from 'axios'

let wpInstance = axios.create({ baseURL: 'https://miprueb.herokuapp.com/' });

const api = {
  FetchNews: async () => {
    return await wpInstance.get('/noticias?_limit=20&_sort=createdAt:DESC');
  },
  DataPost: async (data) => {
    return await wpInstance.get(`/noticias/${data}`);
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
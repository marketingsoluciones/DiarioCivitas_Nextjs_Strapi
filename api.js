import axios from 'axios'

let wpInstance = axios.create({ baseURL: 'http://localhost:1337' });

const api = {
  FetchNews: async () => {
    return await wpInstance.get('/noticias?_limit=10');
  }
}

export { api };
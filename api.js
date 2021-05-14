import axios from 'axios'

let wpInstance = axios.create({ baseURL: 'http://localhost:1337' });

const api = {
  FetchNews: async () => {
    return await wpInstance.get('/noticias?_limit=20');
  },
  DataPost: async (data) => {
    return await wpInstance.get(`/noticias/${data}`);
  },
}

export { api };
import axios from 'axios'

let wpInstance = axios.create({ baseURL: 'https://diariocivitas.com/wp-json/' });

const api = {
  wpPosts: async () => {
    return await wpInstance.get('/wp/v2/posts');
  }
}

export { api };
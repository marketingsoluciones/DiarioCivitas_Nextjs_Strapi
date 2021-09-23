import axios from 'axios'

let instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

const queryCategories = {
  query: `query {
    getCategories {
      slug
    }
  }
  `,
  variables: {
  },
}




const api = {
  FetchNews: async (params) => {
    return await instance.get('/posts', {
      params: params
    });
  },

  FetchNewsSitemap: async () => {
    return await instance.get('/postsSitemap');
  },

  FetchNews2: async (params) => {
    const queryCategory = {
      query: `mutation {
        getNoticias{
            _id
            slug
            title
        }
      }
      `,
      variables: {
      },
    }
    return await axios.post('http://localhost:3000/api/api', queryCategory, {})
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
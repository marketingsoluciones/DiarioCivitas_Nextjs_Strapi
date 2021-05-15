'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
     // GET /hello
  async findPost(params) {
      const slug = params.request.url.slice(10)
      return strapi.query('noticias').findOne({rutaURL: slug});

  },
};


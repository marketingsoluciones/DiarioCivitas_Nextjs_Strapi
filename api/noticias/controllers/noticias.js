'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
     // GET /hello
  async findPost(ctx) {
      const slug = ctx.request.url.slice(10)
      const post = await strapi.query("noticias").find({limit: 1}, ctx)
      console.log(ctx)
      console.log(post.length)
    return 'Hello World!';
  },
};


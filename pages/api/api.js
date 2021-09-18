import { gql, ApolloServer } from "apollo-server-micro";
import { conectorDB } from "../../db/conector";
import { ModeloCategory, ModeloPost } from "../../db/PostSchema";
import { ModeloGallery } from "../../db/UploadSchema";

conectorDB()

const typeDefs = gql`

  type News {
    _id : ID
    title: String
    slug: String
    postcategorias: [Category]
    imgPrincipal : ID
  }


  type Category {
    _id : ID
    categorie : String
    slug : String
    
  }

  
  type Query {
    getNoticias: [News],
    getCategories : [Category],   
  }

  type Mutation {
    getCategory(categorie: String) : [News]
  }
  


`;

const resolvers = {
  Query: {
    getNoticias: async () => {
      const data = await ModeloPost.find()
      return data
    },
    getCategories : async () => {
      const data = await ModeloCategory.find()
      return data
    },
    
  },
  Mutation : {
    getCategory : async (_, input) => {
      const category = await ModeloCategory.findOne({slug : input?.categorie})
      const idCategory = category?.toObject()?._id
      const data = await ModeloPost.find({'postcategorias' : idCategory}, ['_id', 'title', 'slug', 'imgPrincipal'], {sort : {createdAt : -1}, limit: 30})
      // const arr = data.map((item,idx) => {
      //   let imgPrincipal
      //   const res = async (imgPrincipal) => {
      //     imgPrincipal = await ModeloGallery.findOne({_id : imgPrincipal})
      //   }
      //   res(item.toObject().imgPrincipal)
      //   console.log(imgPrincipal)
      //   return {...item.toObject(), imgPrincipal: imgPrincipal}
      // })
      return arr
    }
  }
  
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = apolloServer.start();

export default async function handler(req, res) {

  await startServer;
  await apolloServer.createHandler({
    path: "/api/api",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
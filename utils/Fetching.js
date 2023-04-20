import { api } from "../api";

export const fetchApi = async ({ query = ``, variables = {}, type = "json", token }) => {
  try {
    if (type === "json") {
      const {
        data: { data },
      } = await api.graphql({ query, variables });
      return Object.values(data)[0];
    } else if (type === "formData") {
      const formData = new FormData();
      const values = Object?.entries(variables);

      // Generar el map del Form Data para las imagenes
      const map = values?.reduce((acc, item) => {
        if (item[1] instanceof File) {
          acc[item[0]] = [`variables.${item[0]}`];
        }
        if (item[1] instanceof Object) {
          Object.entries(item[1]).forEach((el) => {
            if (el[1] instanceof File) {
              acc[el[0]] = [`variables.${item[0]}.${el[0]}`];
            }
            if (el[1] instanceof Object) {
              Object.entries(el[1]).forEach((elemento) => {
                if (elemento[1] instanceof File) {
                  acc[elemento[0]] = [
                    `variables.${item[0]}.${el[0]}.${elemento[0]}`,
                  ];
                }
              });
            }
          });
        }
        return acc;
      }, {});

      // Agregar filas al FORM DATA

      formData.append("operations", JSON.stringify({ query, variables }));
      formData.append("map", JSON.stringify(map));
      values.forEach((item) => {
        if (item[1] instanceof File) {
          formData.append(item[0], item[1]);
        }
        if (item[1] instanceof Object) {
          Object.entries(item[1]).forEach((el) => {
            if (el[1] instanceof File) {
              formData.append(el[0], el[1]);
            }
            if (el[1] instanceof Object) {
              Object.entries(el[1]).forEach((elemento) => {
                if (elemento[1] instanceof File) {
                  formData.append(elemento[0], elemento[1]);
                }
              });
            }
          });
        }
      });

      const { data } = await api.graphql(formData, token);

      if (data.errors) {
        throw new Error(JSON.stringify(data.errors));
      }

      return Object.values(data.data)[0];
    }
  } catch (error) {
    console.log(1010, error.message);
  }
};

export const queries = {
  signOut: `mutation ($sessionCookie :String){
    signOut(sessionCookie:$sessionCookie)
  }`,
  authStatus: `mutation ($session
    Cookie : String){
    status(sessionCookie: $sessionCookie){
      customToken
    }
  }`,
  getUser: `query ($uid: ID) {
    getUser(uid:$uid){
      phoneNumber
      role
      typeRole
      city
      country
      weddingDate
      signUpProgress
      status
      createdAt
      updatedAt
    }
  }`,
  createUser: `mutation  ($uid : ID, $city: String, $country : String, $weddingDate : String, $phoneNumber : String, $role : [String]) {
    createUser(uid: $uid, city : $city, country : $country, weddingDate : $weddingDate, phoneNumber : $phoneNumber, role: $role){
          city
          country
          weddingDate
          phoneNumber
          role
        }
      }`,
  auth: `mutation ($idToken : String){
    auth(idToken: $idToken){
      sessionCookie
    }
  }`,

  lastPost: `query($development: String!) {
    getHome(development:$development){
      post{
        _id
        title
        subTitle
        slug
        postFormat
        authorUsername
        createdAt
        imgMiniatura{
          i640
          i320
        }
      }     
    }
  }`,

  lastPostForCategorie: `query($development: String!) {
    getLastPostForCategorie(development:$development){
      _id
      title
      post{
        _id
        title
        subTitle
        slug
        postFormat
        authorUsername
        createdAt
        imgMiniatura{
          i640
          i320
        }
      }     
    }
  }`,

  createPost:
    `mutation (
      $title: String,
      $subTitle :String,
      $content: String,
      $slug : String,
      $seoDescription : String,
      $subCategories: [ID],
      $tags :[String],
      $authorUsername :String,
      $imgCarrusel : [Upload],
      $imgMiniatura : Upload,
      $development: String!
    ){
      createPost (args:{
        title: $title,
        subTitle:$subTitle,
        content: $content,
        slug:$slug,
        seoDescription: $seoDescription,
        subCategories :$subCategories,
        tags: $tags,
        authorUsername :$authorUsername,
        imgCarrusel: $imgCarrusel,
        imgMiniatura : $imgMiniatura,
      },
      development: $development){
        _id
      }
    }`,

  getOneSubCategoryPost:
    `query (
      $slug : String,
    ){
      getOneSubCategoryPost (
        slug:$slug
      ){
        _id
      }
    }`
};



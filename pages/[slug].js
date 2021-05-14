import React from 'react'
import { api } from '../api';
import BreadCumbs from '../Components/BreadCumbs';
import { useRouter } from 'next/router'


const Post = ({PostData}) => {
    console.log(PostData)
    let contenido = PostData.contenido.replace(/(<([^>]+)>)/gi, "");
    const router = useRouter()
    return (
        <div className="relative w-full max-w-screen-md py-10">
            <div className="flex">
                <BreadCumbs router={router}/>
            </div>
            <h1 className="text-3xl font-display font-bold text-center py-4 ">{PostData.titulo}</h1>
            <div className="w-full h-96 bg-gray-200"> IMAGEN </div>
            <p>{contenido}</p>
        </div>
    )
}

export default Post

export const getStaticProps = async ({ params }) => {
    const {data} = await api.DataPost(params.slug)
    return {
      props: {
        PostData: data
      }
    };
  };

export async function getStaticPaths() {

    const {data} = await api.FetchNews()
           
    
    return {
      paths: data.map(post => {
        return {
          params: {
            slug: post.rutaURL
          }
        };
      }),
      fallback: false
    };
  }


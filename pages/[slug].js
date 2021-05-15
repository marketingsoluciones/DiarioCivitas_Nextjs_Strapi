import React from 'react'
import { api } from '../api';
import BreadCumbs from '../Components/BreadCumbs';
import { useRouter } from 'next/router'
import  { Markup } from 'interweave';


const Post = ({PostData}) => {
  console.log(PostData)
    //let contenido = PostData?.contenido?.replace(/(<([^>]+)>)/gi, "");
    const router = useRouter()
    return (
      <div className="relative w-full grid place-items-center">
      <div className="w-full banner-imagen">
            {/* <img className="w-full bg-gray-200" src={PostData.imagen} alt={PostData.titulo}/> */}
            </div>
        <div className=" w-full max-w-screen-lg px-16 -top-56 py-10 relative bg-white">
            <div className="flex">
                <BreadCumbs router={router}/>
            </div>
            <h1 className="text-4xl font-display font-bold text-left py-4 ">{PostData.titulo}</h1>
            <h3 className="text-sm italic font-body text-left pb-4">{PostData?.subtitulo}</h3>
            <div className="flex gap-4">
            {PostData?.categorias?.map( (category, index) => {
              return (
                <p className="text-primary font-body w-max px-2 py-1 text-xs font-bold capitalize border-r border-l">{category}</p>
              )
            })}
            </div>
            <div className="font-body text-sm py-8 leading-relaxed">
            <Markup content={PostData.contenido} containerTagName="article"  allowAttributes={true} allowElements={true}   />
            </div>
        </div>
        <style jsx>
          {`
          .banner-imagen {
            background-image: url("${PostData.imagen}");
            background-position: center;
            background-size: cover;
            height: 40rem;
          }
          
          h2 {
            font-size:2rem;
          }
          `}
        </style>
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



 
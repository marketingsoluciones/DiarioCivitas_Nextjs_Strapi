import React, { useEffect, useState } from "react";
import { api } from "../../api";
import { useRouter } from "next/router";

// const Author = ({ author }) => {
const Author = () => {
  const router = useRouter();
  const author = router.query?.author;
  useEffect(() => {
    const getAuthorData = async () => {
      const { data } = await (await fetch('https://api.diariocivitas.com/posts/authors')).json();
      console.log(data);

    //   const resume = data.map((img) => {
    //     return {
    //       id: img.id,
    //       autorName: img.autorName,
    //       email: img.email,
    //       reseña: img.reseña,
    //       perfil: img.perfil,
    //       redesSociales: {
    //         instagram: "@diariocivitas",
    //         facebook:
    //           "https://www.facebook.com/DiarioCivitas-Murcia-Alicante-100198252008047/",
    //         twitter: "@DiarioCivitas",
    //       },
    //       fotoUrl:
    //         "https://st2.depositphotos.com/47577860/46774/v/450/depositphotos_467749108-stock-illustration-avatar-journalist-male-icon-filled.jpg",
    //     };
    //   });
      getAuthorData();

      console.log(data);
    };
  }, []);

  console.log(author);
  return <div>Soy {author}</div>;
};

export default Author;

// export const getStaticProps = async ({ params }) => {
//   console.log(params);
//   return {
//     props: { author: params },
//   };
// };

// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { author: "hola" } }],
//     fallback: false,
//   };
// }

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
      getAuthorData();
   };
  }, []);

  return <div>Soy {author}</div>;
};

export default Author;


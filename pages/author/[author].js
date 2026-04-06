import React, { useEffect, useState } from "react";
import { api } from "../../api";
import { useRouter } from "next/router";

const Author = () => {
  const router = useRouter();
  const author = router.query?.author;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!author) return;
    const getAuthorData = async () => {
      try {
        const { data } = await api.graphql({
          query: `query($development: String!, $limit: Int) {
            getAllPost(development: $development, limit: $limit) {
              total
              results {
                _id
                title
                slug
                authorUsername
                createdAt
                imgMiniatura { i320 i640 }
              }
            }
          }`,
          variables: { development: "diariocivitas", limit: 20 },
        });
        const results = data?.data?.getAllPost?.results ?? [];
        const byAuthor = results.filter(
          (p) => p.authorUsername?.toLowerCase() === author?.toLowerCase()
        );
        setPosts(byAuthor);
      } catch (err) {
        console.error("Error cargando posts del autor:", err);
      }
    };
    getAuthorData();
  }, [author]);

  return (
    <div>
      <h1>Autor: {author}</h1>
      {posts.map((p) => (
        <div key={p._id}>
          <a href={`/${p.slug}`}>{p.title}</a>
        </div>
      ))}
    </div>
  );
};

export default Author;


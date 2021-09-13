import React from 'react'
import Pagination from '../../components/Pagination';
import { NewsList } from '../category/[category]';

const Author = () => {
    return (
        <section className="xl:max-w-screen-lg mx-auto inset-x-0 py-10 font-display flex flex-col gap-10 bg-white p-5">
            <Pagination />
        </section>
    )
}

export default Author



export const getStaticProps = async ({ params }) => {
    return {
        props: {params}
    }

};

export async function getStaticPaths() {
    return {
        paths: [{params: {author: "hola"}}],
        fallback: false
    }


}
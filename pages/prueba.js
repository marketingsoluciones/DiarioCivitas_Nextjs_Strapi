import React, { useEffect } from 'react'
import { api } from '../api'

const prueba = () => {
    useEffect(() => {
        (async () => {
           const {data} = await api.FetchNews()
           
           data.map(post => console.log(post.rutaURL))
        })()
    }, [])
    return (
        <div>
            
        </div>
    )
}

export default prueba

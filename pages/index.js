import React, { useState } from 'react'
import { api } from '../api'
import HeaderNews from '../Components/HeaderNews'


const index = () => {
    const [noticias, setNoticias] = useState([])

    api.FetchNews().then(({data}) => setNoticias(data))
    
    return (
        <div className="py-8 w-full max-w-screen-xl flex flex-col items-center justify-center">
            <HeaderNews titulos={noticias.map(noticia => noticia.titulo)}/>
            <PanelPrimary/>
            
        </div>
    )
}

export default index


export const PanelPrimary = () => {
    return (
        <div className="rounded-xl w-full h-full my-6 shadow-lg bg-white overflow-hidden ">
            <ViewBig/>
            <ViewHorizontalMedium/>
            <ViewHorizontalMedium/>
        </div>
    )
}


export const ViewBig = (props) => {
    const {imagen} = props
    return (
        <div className="w-1/2 relative float-right">
            <div className="w-full">
                <div className="bg-gray-900 h-60 relative">
                    <div className="rounded bg-red-500 grid px-4 place-items-center h-6  absolute bottom-4 left-4">
                        <p className="text-white font-display text-xs">Tendencias</p>
                    </div>
                </div>
                <h2 className="py-2 text-2xl font-body font-semibold tracking-tighter text-primary">What Days and Hours are PH Online Shoppers Most Likely to Buy?</h2>
                <p className="text-xs font-display py-2">Francisco Montilla | 27 Marzo 2021</p>
            </div>
            
        </div>
    )
}

export const ViewHorizontalMedium = () => {
    return (
        <div className="w-1/2 relative flex gap-2 justify-between h-40">
            <div className="w-1/2 bg-primary h-full">
            </div>
            <div className="w-1/2">
            <h2 className="py-2 text-2xl font-body font-semibold tracking-tighter text-primary">What Days and Hours are PH Online Shoppers Most Likely to Buy?</h2>
                <p className="text-xs font-display py-2">Francisco Montilla | 27 Marzo 2021</p>
            </div>
            
        </div>
    )
}


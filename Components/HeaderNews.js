import React, { useEffect, useState } from 'react'
import { Barra, FlechaIcon, RayoIcon } from './icons'

const HeaderNews = (props) => {
    const {titulos} = props
    const [state, setState] = useState(0)

    return (
        <div className="hidden rounded-lg bg-white shadow w-full h-10 overflow-hidden md:flex relative">
            <div className="h-full px-4 sm:px-8 bg-blue-500 flex items-center justify-center"> 
                <RayoIcon className="text-white w-5 h-5"/>
                <h3 className="text-white font-display font-semibold">Ultima hora</h3>
            </div>
            {titulos.map((titulo, index) => (
            <div key={index} className={`${state == index ? "opacity-100" : "opacity-0"} transition duration-500 flex absolute top-0 bottom-0 mx-auto left-36 right-10 sm:left-56 items-center px-4`}>
                <p className="font-display text-xs sm:text-sm">{titulo}</p>
            </div>
            ))}
            <Switch state={state} set={accion => setState(accion)}/>
        </div>
    )
}

export default HeaderNews

const Switch = (props) => {
    const {state, set} = props

    const Decrement = () => {
        if(state > 0) {
            set(state - 1)
            return state - 1
        }
    }

    const Increment = () => {
        if(state < 9) {
            set(state + 1)
            return state + 1
        }
    }

     useEffect(() => {
         if(state <= 9) {
            setTimeout(() => {
                set(state + 1)
            }, 4000);
         } else set(0)
         
     }, [state])

    return (
        <div className="flex items-center gap-2 float-right absolute right-3 top-0 bottom-0 m-auto">
            <FlechaIcon onClick={() => Decrement()} className="cursor-pointer text-gray-700 w-3 h-3 transform rotate-90"/>
            <Barra/>
            <FlechaIcon onClick={() => Increment()} className="cursor-pointer text-primary w-3 h-3 transform -rotate-90"/>

        </div>
    )
}

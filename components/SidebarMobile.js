import Link from 'next/link'
import React, { useContext } from 'react'
import { SidebarContext } from '../context/SidebarContext.js';
import { ArrowNarrowIcon, FlechaIcon } from './icons.js'

const SidebarMobile = () => {
    const menu = [
        { title: "Inicio", route: "/", menu: false },
        { title: "Region Murcia", route: "/category/murcia", menu: true },
        // { title: "Murcia", route: "/murcia", menu: false },
        // { title: "Cartagena", route: "/cartagena", menu: false },
        // { title: "Lorca", route: "/lorca", menu: false },
        { title: "Deportes", route: "/category/deportes", menu: true },
        { title: "Economía", route: "/category/economia", menu: true },
        { title: "Cultura", route: "/category/cultura", menu: true },
        { title: "Opinión", route: "/category/opinion", menu: false },

    ];

    const {isVisible, setSidebar} = useContext(SidebarContext)
    return (
        <div className={`${isVisible ? "translate-x-0" : " -translate-x-full"} transition fixed bg-gradient-to-r transform duration-700 from-gray-50 via-gray-100 to-gray-200 w-full h-screen z-50 top-0 left-0`}>
            <div className="cursor-pointer flex gap-2 items-center justify-start w-full py-4 text-gray-400 px-5" onClick={() => setSidebar(!isVisible)}>
                <ArrowNarrowIcon className="w-4 h-4 transform "/>
                <p className="font-body text-sm uppercase">Vover a atras</p>
            </div>
            <ul className="list-none">
            {menu?.map((item, idx) => {
                return (
                    <Link key={idx} href={item?.route}>
                    <li className="font-body cursor-pointer pl-3 border-b hover:bg-gray-400 hover:text-white py-2 w-full text-primary flex justify-between items-center" onClick={() => setSidebar(false)} >
                        {item?.title}
                        <FlechaIcon className="w-3 h-3 transform -rotate-90 mr-3"/>
                            </li>
                    </Link>
                )
            })}
            </ul>
           
        </div>
    )
}

export default SidebarMobile

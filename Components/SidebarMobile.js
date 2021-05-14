import Link from 'next/link'
import React from 'react'
import { FlechaIcon } from './icons'

const SidebarMobile = (props) => {
    const {menu, set,state} = props
    return (
        <div className="sticky bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 w-full h-screen z-50 top-0 left-0">
            <div className="cursor-pointer flex gap-2 items-center justify-center w-full py-4" onClick={() => set(!state)}>
                <FlechaIcon className="w-3 h-3 transform rotate-90"/>
                Vover a atras
            </div>
            <ul className="list-none">
            {menu.map((item, idx) => {
                return (
                    <Link key={idx} href={item.route}>
                    <li className="font-body cursor-pointer pl-3 border-b hover:bg-gray-400 hover:text-white py-2 w-full text-primary flex justify-between">
                        {item.title}
                        <FlechaIcon className="w-3 h-3 transform -rotate-90"/>
                            </li>
                    </Link>
                )
            })}
            </ul>
            <p className="font-display font-bold text-xs text-center">Diariocivitas.com</p>
        </div>
    )
}

export default SidebarMobile

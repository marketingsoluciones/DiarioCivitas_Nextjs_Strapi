import Link from "next/link"

const { FlechaIcon } = require("./icons")

const BreadCumbs = ({router}) => {
    return (
        <div className="flex items-center justify-start gap-1 font-body">
           <Link href="/">
           <p className="text-xs cursor-pointer hover:text-white text-gray-700 hover:bg-gray-700 px-2 rounded-lg py-0.5 transition">Inicio</p>
           </Link>
           <FlechaIcon className="w-3 h-3 transform -rotate-90"/>
           {router?.query?.category && (
               <>
               <Link href={`/${router?.query?.category}`}>
               <p className="text-xs cursor-pointer hover:text-white text-gray-700 hover:bg-gray-700 px-2 rounded-lg py-0.5 transition">{router?.query?.category}</p>
               </Link>
               <FlechaIcon className="w-3 h-3 transform -rotate-90"/>
               </>
           )}
           <p className="text-xs capitalize truncate">{router.asPath.replace(/-/gi, " ").slice(1)}</p>
        </div>
    )
}

export default BreadCumbs

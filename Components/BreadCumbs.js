import Link from "next/link"

const { FlechaIcon } = require("./icons")

const BreadCumbs = ({router}) => {
    return (
        <div className="flex items-center justify-center gap-1">
           <Link href="/">
           <p className="font-body text-xs">Inicio</p>
           </Link>
           <FlechaIcon className="w-3 h-3 transform -rotate-90"/>
           <p className="font-body text-xs capitalize">{router.asPath.replace(/-/gi, " ").slice(1)}</p>
        </div>
    )
}

export default BreadCumbs

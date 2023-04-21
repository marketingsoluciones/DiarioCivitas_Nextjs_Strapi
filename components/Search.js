import { BuscadorIcon } from './icons.js'

const Search = () => {
    return (
        <div className="hidden md:block relative">
        <input className=" border-2  rounded-xl font-body text-sm border rounded pl-4 pr-8 py-1 focus:outline-none transition" placeholder="Buscar" />
        <BuscadorIcon className="absolute top-0 bottom-0 right-3 text-gray-300 m-auto w-4 h-4 hover:text-gray-700 transition cursor-pointer" />
    </div>
    )
}

export default Search

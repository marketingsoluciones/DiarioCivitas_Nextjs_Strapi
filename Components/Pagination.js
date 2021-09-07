import { ArrowNarrowIcon } from "./icons"

const Pagination = () => {
    return (
        <div className="w-full border-t flex justify-between text-gray-400 font-body text-sm p-3">
            <button className="focus:outline-none flex items-center gap-3 hover:scale-105 transition hover:text-gray-600 transform "><ArrowNarrowIcon className="w-5 h-auto" /> Anterior </button>
            <div>
                
            </div>
            <button className="focus:outline-none flex items-center gap-3 hover:scale-105 transition hover:text-gray-600 transform "><ArrowNarrowIcon className="w-5 h-auto transform rotate-180" /> Siguiente </button>
        </div>
    )
}

export default Pagination

import { useState } from "react"
import { ArrowNarrowIcon } from "./icons.js"

export const Pagination = () => {
    const [state, setState] = useState(0)
    const pages = [0, 1, 2, 3, 4, 5]

    const PrevAndNext = (direction) => {
        if (direction == "next" && state >= 0 && state < pages.length - 1) {
            setState(state + 1)
        } else if (direction == "prev" && state <= pages.length && state > 0) {
            setState(state - 1)
        }
    }
    return (
        <div className="w-full border-t flex justify-between text-gray-400 font-body text-sm p-3">
            <button onClick={() => PrevAndNext("prev")} className="focus:outline-none flex items-center gap-3 hover:scale-105 transition hover:text-gray-600 transform "><ArrowNarrowIcon className="w-5 h-auto" /> Anterior </button>
            <div className="flex flex-col items-center justify-center gap-1">
                <div className="flex items-center gap-1">
                    {pages?.map((item, idx) => (
                        <Page key={idx} number={idx} selected={state == idx} onClick={() => setState(idx)} />
                    ))}
                </div>
                <p className="text-xs text-gray-400">Pagina {state}</p>
            </div>
            <button onClick={() => PrevAndNext("next")} className="focus:outline-none flex items-center gap-3 hover:scale-105 transition hover:text-gray-600 transform "><ArrowNarrowIcon className="w-5 h-auto transform rotate-180" /> Siguiente </button>
        </div>
    )
}

export default Pagination

const Page = ({ number, selected, onClick }) => {
    return (
        <button onClick={onClick} className={`rounded border border-gray-200 flex items-center justify-center focus:outline-none w-8 h-8 ${selected ? "bg-blue-500 text-white" : ""}`}>
            {number}
        </button>
    )
}



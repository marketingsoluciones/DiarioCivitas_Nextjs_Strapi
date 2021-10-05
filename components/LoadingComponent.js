import { useContext } from "react"
import { LoadingContext } from "../context/LoadingContext"

const LoadingComponent = () => {
    const {isLoading} = useContext(LoadingContext)
    return (
        <>
        {isLoading && (
            <>
            <div className="fixed top-0 left-0 bg-white w-full h-full z-50 grid place-items-center">
                    <div className="flex flex-col items-center justify-center">
                        <img src="/logo.png" className="h-8 sm:h-8 2xl:h-10 object-contain w-auto" />
                        <p className="text-xs text-gray-400 w-full text-center py-2 font-body">Cargando, espere un momento</p>
                    </div>
            </div>
            <style jsx>
                {`
                @keyframes logoAnimation {
                    0% {transform: scale(1)}
                    50% {transform: scale(1.2)}
                    100% {transform: scale(1)}
    
                }
                img {
                    animation-name: logoAnimation;
                    animation-duration: 7s;
                    animation-iteration-count: infinite;
                }
            
                `}
            </style>
            </>
        )}
        </>
    )
}

export default LoadingComponent

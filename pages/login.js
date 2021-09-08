import FormLogin from "../components/forms/FormLogin.js"
import { ArrowIcon, FacebookIcon, GoogleIcon, InstagramIcon } from "../components/icons.js"
import router from "next/router"

const login = () => {
    const date = new Date
    return (
        <>
            <div className="font-display absolute top-0 left-0 z-20 w-full h-full flex flex-col items-center justify-center imagen bg-blue-500">
                <p className="text-sm text-white z-20 w-3/4 md:w-1/2 xl:w-1/4 flex gap-2 items-center pb-3 cursor-pointer" onClick={() => router.back()}> <ArrowIcon className="w-3 h-3 transform rotate-90" /> Volver a atrás</p>
                <div className="bg-white p-8 rounded-2xl flex flex-col gap-4 justify-center items-center w-3/4 md:w-1/2 xl:w-1/4 z-20">
                    <img src="/logo.png" className="object-contain h-7" />
                    <Providers />
                    <FormLogin />
                    <h3 className="text-sm text-gray-500">¿No tienes una cuenta? <span className="font-semibold text-blue-500 cursor-pointer">Regístrate</span></h3>
                </div>

                <p className="text-white text-xs z-20 pt-10">Todos los derechos reservados © {date.getFullYear()} </p>
            </div>
            <style jsx>
                {`
            .imagen {
                background-image: url("/newspaper.png");
                background-size: contain;
            }
            .imagen::before {
                content: "";
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: #3b82f6;
                top: 0;
                left: 0;
                opacity: 0.8;
                background-blend-mode: multiply;
                z-index: 10
            }
            `}
            </style>
        </>
    )
}

export default login

const Providers = () => {

    const Provider = ({ provider }) => {
        const providers = {
            facebook: {
                color: "blue", icon: <FacebookIcon className="text-white w-6 h-6" />
            },
            google: {
                color: "red", icon: <GoogleIcon className="text-white w-6 h-6" />
            },
            instagram: {
                color: "gray", icon: <InstagramIcon className="text-white w-6 h-6" />
            }
        }
        return (
            <div className={`border rounded-full w-12 h-12 grid place-items-center bg-${providers[provider]?.color}-500 hover:opacity-95 transition hover:scale-105 transform cursor-pointer`}>
                {providers[provider]?.icon}
            </div>
        )
    }
    return (
        <div>
            <h2 className="text-sm text-gray-400 w-full text-center pb-2">Accede con</h2>
            <div className="flex gap-4 items-center justify-center">
                <Provider provider={"facebook"} />
                <Provider provider={"google"} />
                <Provider provider={"instagram"} />
            </div>
        </div>
    )
}


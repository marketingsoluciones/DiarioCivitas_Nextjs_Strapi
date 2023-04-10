import { ButtonProvider } from "./ButtonProvider"
import { GoogleIconLogin, FacebookIcon2 } from "../icons"

export const LoginComponent = () => {
    return (
        <>
            <div className=" gap-2 bg-white h-max w-2/5 py-4 rounded-md flex flex-col items-center">

                <h1 className="font-bold text-3xl my-4 w-1/2 text-center"> Accede a tu cuenta </h1>

                <div className={`text-center flex flex-col gap-2 w-full items-center `}>
                    <div className="">
                        <ButtonProvider provider="Google" handle={/* GoogleProvider() */ "hola"} icon={<GoogleIconLogin className="ml-15px w-[20px] h-20px text-gray-500" />} />
                        <ButtonProvider provider="Facebook" handle={/* FacebookProvider */ "hola"} icon={<FacebookIcon2 className="ml-15px w-[20px] h-20px text-gray-500" />} />
                        {/* <ButtonProvider provider="Apple" handle={AppleProvidor()} icon={<AppleIcon className="ml-[15px] w-[20px] h-[20px] text-gray-500" />} /> */}
                    </div>
                </div>

                <div>
                    <span>o accede con tu email</span>
                </div>

                <input
                    type="email"
                    placeholder="Ingresa tu email"
                    className="w-1/2 focus:outline-none border-2 rounded-md pl-3 py-2"
                />

                <input
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    className="w-1/2 focus:outline-none border-2 rounded-md pl-3 py-2"
                />

                {/* <div className=" gap-2">
                    <input
                        type="checkbox"

                    />
                    <label className="ml-3">Estoy de acuerdo con las condiciones de uso</label>
                </div> */}

                <button className="bg-blueFull py-3 px-5 rounded-md text-white font-bold">Iniciar sesión</button>

                <span>si no estas registrado, registrate    <span className="text-blueFull cursor-pointer"> aqui </span>  </span>
            </div>
            <style jsx>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,600;1,400;1,600&display=swap');
                `}
            </style>
        </>
    )
}
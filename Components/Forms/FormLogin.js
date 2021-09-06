import { Form, Formik } from "formik"
import { useState } from "react"
import { EyeOutlineIcon, EyeSolidIcon } from "../icons"
import InputField from "../InputField"

const FormLogin = () => {
    const [showPassw, setShowPassw] = useState(false)
    const initialValues = {
        identifier: "",
        password: ""
    }
    return (
        <Formik initialValues={initialValues} >
            <Form className="w-full flex flex-col gap-4 items-center justify-center">
                <InputField name="identifier" label={"Correo electrónico"} type="email" />
                <span className="relative w-full">
                    <InputField name="password" label={"Contraseña"} type={showPassw ? "text" : "password"} >
                        <span className="absolute inset-y-0 my-auto right-5 h-5 text-gray-500 cursor-pointer" onClick={() => setShowPassw(!showPassw)}>
                            {showPassw ? <EyeSolidIcon className="w-5 h-5" /> : <EyeOutlineIcon className="w-5 h-5" />}
                        </span>
                    </InputField>
                </span>
                <button className="font-display py-2 px-5 bg-blue-500 text-white font-medium w-full focus:outline-none hover:bg-opacity-80 transition">Iniciar Sesión</button>
            </Form>
        </Formik>
    )
}

export default FormLogin

import { Formik, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { EmailIcon, EmailIcon as PasswordIcon, Eye, EyeSlash, LockClosed } from "../../icons";
import { InputField, ButtonComponent } from "../../Inputs";
import { useToast } from '../../../hooks/useToast';
import { LoadingContextProvider } from "../../../context";
import { useAuthentication } from '../../../utils/Authentication';


const FormLogin = ({ setStage }) => {
  const [passwordView, setPasswordView] = useState(false)
  const { signIn } = useAuthentication();
  const { setLoading } = LoadingContextProvider()
  const toast = useToast()
  const initialValues = {
    identifier: "",
    password: "",
    wrong: "",
  };

  const errorsCode = {
    "auth/wrong-password": "Correo o contraseña invalida",
    "auth/too-many-requests":
      "Demasiados intentos fallidos. Intenta de nuevo más tarde",
  };

  const handleSubmit = async (values, actions) => {
    try {
      signIn("credentials", values)
    } catch (error) {
      setLoading(false)
      console.error(JSON.stringify(error));
      toast("error", JSON.stringify(errorsCode[error.code]))
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className=" text-gray-200 flex flex-col gap-2 py-3 w-full *md:w-3/4 ">
        <span className="w-full relative ">
          <InputField
            label={"Correo electronico"}
            name="identifier"
            // placeholder="ingrese correo electrónico"
            icon={<EmailIcon className="absolute w-4 h-4 inset-y-0 left-4 m-auto text-gray-500" />}
            type="email"
          />
        </span>

        <span className="w-full relative">

          <InputField
            name="password"
            type={!passwordView ? "password" : "text"}
            autoComplete="off"
            icon={<LockClosed className="absolute w-4 h-4 inset-y-0 left-4 m-auto  text-gray-500" />}
            label={"Contraseña"}
          />
          <div onClick={() => { setPasswordView(!passwordView) }} className="absolute cursor-pointer inset-y-0 top-5 right-4 m-auto w-4 h-4 text-gray-500" >
            {!passwordView ? <Eye /> : <EyeSlash />}
          </div>
        </span>
        <span className="text-sm text-red">
          <ErrorMessage name="wrong" />
        </span>

        <div onClick={() => setStage("resetPassword")} className="text-sm text-primary w-full text-left hover:text-gray-300 transition cursor-pointer">
          Olvidé mi contraseña
        </div>
        <ButtonComponent
          onClick={() => { }}
          type="submit"
          tabIndex={0}
        >
          Iniciar sesión
        </ButtonComponent>
      </Form>
    </Formik>
  );
};

export default FormLogin;

import { Formik, Form } from "formik";
import { Children, memo, useState } from "react";
import { InputField, } from "../../../Inputs";
import { EmailIcon, UserForm, Eye, EyeSlash, LockClosed, PhoneMobile, } from "../../../icons";
import { createUserWithEmailAndPassword, updateProfile, } from "@firebase/auth";
import * as yup from "yup";
import { AuthContextProvider, LoadingContextProvider, } from "../../../../context";
import router from "next/router";
import { ValidationSchemaRegister } from "./ValidationRegister";
import { fetchApi, queries } from "../../../../utils/Fetching";
//import SelectFieldCoutries from "../../../Inputs/SelectFieldCoutries";
import { auth } from "../../../../firebase";
//import InputCity from "../../../Inputs/InputCity";
import { useAuthentication } from '../../../../utils/Authentication';
import { useToast } from '../../../../hooks/useToast';



// Set de mensajes de error
yup.setLocale({
  mixed: {
    required: "Campo requerido",
  },
});


const FormRegister = ({ whoYouAre = ["reader", "author"] }) => {
  const { setUser, user, setUserTemp, userTemp, redirect } = AuthContextProvider();
  const { setLoading } = LoadingContextProvider();
  const { getSessionCookie } = useAuthentication();
  const toast = useToast()


  const userInitialValuesTotal = {
    // Envio a firebase
    fullName: "",
    email: "",
    password: "",
    //Envio a la api
    phoneNumber: "",
    role: whoYouAre || "",
  };

  const userInitialValuesPartial = {
    fullName: "",
    email: "",
    //Envio a la api
    phoneNumber: "",
    role: whoYouAre || "",

  };

  // Funcion a ejecutar para el submit del formulario
  const handleSubmit = async (values, actions) => {
    try {
      setLoading(true);
      let UserFirebase = user ?? {};

      if (!user?.uid && !userTemp?.uid) {
        // Autenticacion con firebase
        const res = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        UserFirebase = res.user;
        // Almacenamiento en values del UID de firebase
        values.uid = res.user.uid;
      } else {
        // Si existe usuario firebase pero faltan datos de ciudad, etc.
        values.uid = userTemp?.uid;
      }

      // Actualizar displayName
      auth?.onAuthStateChanged(async (usuario) => {
        if (usuario) {
          updateProfile(usuario, { displayName: values.fullName });
          // Almacenar token en localStorage
          getSessionCookie((await usuario?.getIdTokenResult())?.token)
        }
      });

      // Crear usuario en MongoDB
      const moreInfo = await fetchApi({
        query: queries.createUser, variables: {
          ...values,
          phoneNumber: JSON.stringify(values.phoneNumber),
        }
      });

      // Almacenar en contexto USER con toda la info
      setUser({ ...UserFirebase, ...moreInfo });


      /////// REDIRECIONES ///////
      await router.push(`/`)

      toast("success", "Registro realizado con exito")
    } catch (error) {
      console.log(error);
      toast("error", "Ups... hubo un error al realizar el registro")
      setLoading(false);
    }
  };

  return (
    <>
      <FormikStepper handleSubmit={handleSubmit}>
        <Form className="w-full text-gray-200 md:grid md:grid-cols-2 md:gap-6 space-y-5 md:space-y-0 flex flex-col">
          {(() => {
            if (!user?.uid && !userTemp?.uid) {
              return (
                <UserWithEmailAndPassword
                  initialValues={userInitialValuesTotal}
                  validationSchema={
                    ValidationSchemaRegister.userValidationTotal
                  }
                />
              )
            } else {
              {
                userInitialValuesPartial.fullName = !userTemp?.displayName ? "" : userTemp.displayName
                userInitialValuesPartial.email = !userTemp?.email ? "" : userTemp.email
              }
              return (
                <UserDataAPI
                  initialValues={userInitialValuesPartial}
                  validationSchema={
                    ValidationSchemaRegister.userValidationPartial
                  }
                />
              );
            }
          })()}
          <div className="flex items-center w-fit col-span-2 gap-6 mx-auto inset-x-0 ">
            <button
              type={"submit"}
              className=" col-span-2 bg-primary rounded-full px-10 py-2 text-white font-medium mx-auto inset-x-0 hover:bg-tertiary transition"
            >
              Registrar
            </button>
          </div>
        </Form>
      </FormikStepper>
      <style jsx>
        {`
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        `}
      </style>
    </>
  );
};

export default FormRegister;


export const FormikStepper = memo(
  ({ handleSubmit, children }) => {
    const childrenArray = Children.toArray(children);
    const currentChildren = childrenArray[0]?.props.children[0];
    return (
      <Formik
        initialValues={currentChildren?.props?.initialValues ?? {}}
        validationSchema={currentChildren?.props?.validationSchema ?? {}}
        onSubmit={handleSubmit}
      >
        {children}
      </Formik>
    );
  }
);




const UserWithEmailAndPassword = () => {
  const { userTemp } = AuthContextProvider();
  const [passwordView, setPasswordView] = useState(false)
  return (
    <>
      <div className="w-full col-span-2">
        <InputField
          name="fullName"
          //placeholder="Jhon Doe"
          type="text"
          autoComplete="off"
          icon={<UserForm className="absolute w-4 h-4 inset-y-0 left-4 m-auto  text-gray-500" />}
          label={"Nombre y apellidos"}
        />
      </div>

      <div className="w-full relative ">
        <InputField
          name="email"
          label="Correo electronico"
          type="email"
          autoComplete="off"
          icon={<EmailIcon className="absolute w-4 h-4 inset-y-0 m-auto left-4 text-gray-500" />}
        />

      </div>

      {!userTemp && <div className="w-full relative ">
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
      </div>}

      <div className="w-full relative ">
        <InputField
          name="phoneNumber"
          type="number"
          autoComplete="off"
          icon={<PhoneMobile className="absolute w-4 h-4 inset-y-0 left-4 m-auto  text-gray-500" />}
          label={"Número de telefono"}
        />
      </div>
    </>
  );
};

const UserDataAPI = () => {
  return (
    <>
      <div className="w-full col-span-2">
        <InputField
          name="fullName"
          placeholder="Jhon Doe"
          type="text"
          autoComplete="off"
          icon={<UserForm className="absolute w-4 h-4 inset-y-0 left-4 m-auto" />}
          label={"Nombre y apellidos"}
          disabled
        />
      </div>

      <div className="w-full col-span-2">
        <InputField
          name="email"
          placeholder="jhondoe@gmail.com"
          type="email"
          autoComplete="off"
          icon={<EmailIcon className="absolute w-4 h-4 inset-y-0 left-4 m-auto  text-gray-500" />}
          label={"Correo electronico"}
          disabled
        />
      </div>

      <div className="w-full relative ">
        <InputField
          name="phoneNumber"
          type="number"
          autoComplete="off"
          label={"Número de telefono"}
        />
      </div>
    </>
  );
};



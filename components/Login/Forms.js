import { useState } from "react";
import { LogoFullColor } from "../icons";
import { Providers, RegisterQuestion, ResetPassword } from "./Components";
import FormLogin from "./Forms/FormLogin";
import FormResetPassword from "./Forms/FormResetPassword";
import { FirstStep, SecondStep } from "./Forms/Register/Steps";
import router from 'next/router'
import FormRegister from "./Forms/Register/FormRegister";



export const Login = ({ setStage }) => {

  return (
    <>
      <div className=" h-full">
        <div className="flex flex-col items-center justify-center w-full mb-4">
          <img alt="Logo civitas.com" src="/logo.png" className="w-80 object-contain hover:scale-105 transition transform duration-800 cursor-pointer" onClick={() => router.push("/")} />
        </div>
        <h2 className={`font-light text-tertiary flex items-center text-md `}>
          Accede a tu cuenta
        </h2>
        <Providers setStage={setStage} />
        <h2 className={`font-light text-tertiary flex gap-2 items-center text-md `}>
          O accede con tu email
        </h2>
        <FormLogin setStage={setStage} />
        <RegisterQuestion onClick={() => setStage("register")} />
      </div>
    </>
  );
};

export const Register = ({ setStage }) => {
  return (
    <div className="gap-4 flex flex-col justify-center items-center w-full mb-4">
      <img alt="Logo civitas.com" src="/logo.png" className="w-80 object-contain hover:scale-105 transition transform duration-800 cursor-pointer" onClick={() => router.push("/")} />

      <FormRegister setStage={setStage} />
      <h2 className={`font-light text-tertiary flex gap-2 items-center text-md mt-2`}>
        Ó
      </h2>
      <Providers setStage={setStage} />
      <h2
        className={`font-light text-tertiary flex gap-2 items-center text-sm `}
      >
        ¿Dispones de una cuenta?
        <span
          className="text-sm text-primary font-semibold cursor-pointer hover:text-tertiary transition"
          onClick={() => setStage("login")}
        >
          Inicia Sesión
        </span>
      </h2>
    </div>
  );
};

export const ResetPass = ({ setStage }) => {
  return (
    <>
      <div className="flex flex-col gap-2 items-center justify-center w-full mb-4">
        <img alt="Logo civitas.com" src="/logo.png" className="w-80 object-contain hover:scale-105 transition transform duration-800 cursor-pointer" onClick={() => router.push("/")} />
      </div>
      <FormResetPassword setStage={setStage} />
      <h2
        className={`font-light text-tertiary flex gap-2 items-center text-sm `}
      >
        ¿Dispones de una cuenta?
        <span
          className="text-sm text-primary font-semibold cursor-pointer hover:text-tertiary transition"
          onClick={() => setStage("login")}
        >
          Inicia Sesión
        </span>
      </h2>
    </>
  );
};
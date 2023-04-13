import { GoogleProvider, FacebookProvider } from "../../firebase";
import { AppleIcon, FacebookIcon2, GoogleIcon } from "../icons";
import { ButtonProvider } from "./Forms/ButtonProvider";

export const RegisterQuestion = ({ onClick }) => {
  return (
    <h2 className={`font-light text-tertiary flex gap-2 items-center text-sm `}>
      ¿No dispones de una cuenta?
      <span
        className="text-primary font-semibold cursor-pointer hover:text-tertiary transition"
        onClick={onClick}
      >
        Regístrate
      </span>
    </h2>
  );
};

export const ResetPassword = ({ onClick }) => {
  return (
    <span
      className="text-sm text-primary w-full text-left font-semibold cursor-pointer hover:text-tertiary transition"
      onClick={onClick}
    >
      Olvidé mi contraseña
    </span>

  );
};


export const Providers = () => {

  return (
    <>
      <div className={`text-center flex flex-col gap-2 w-full items-center `}>
        <div className="">
          <ButtonProvider provider="Google" handle={GoogleProvider()} icon={<GoogleIcon className="ml-[15px] w-[20px] h-[20px] text-gray-500" />} />
          <ButtonProvider provider="Facebook" handle={FacebookProvider} icon={<FacebookIcon2 className="ml-[15px] w-[20px] h-[20px] text-gray-500" />} />
          {/* <ButtonProvider provider="Apple" handle={AppleProvidor()} icon={<AppleIcon className="ml-[15px] w-[20px] h-[20px] text-gray-500" />} /> */}
        </div>
      </div>
      <style jsx>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,600;1,400;1,600&display=swap');
        `}
      </style>
    </>
  );
};

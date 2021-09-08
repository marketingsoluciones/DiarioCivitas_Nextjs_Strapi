import { EmailIcon } from "../icons.js";

const Suscribed = () => {
    return (
      <div className="bg-white shadow-md p-8">
        <h4 className="font-body font-semibold uppercase text-md">
          Suscripciones
        </h4>
        <span className="flex gap-1 py-3">
          <EmailIcon className="text-gray-500 h-5 w-5" />
          <p className="text-sm text-gray-500 ">
            Suscribete a las noticias del día
          </p>
        </span>
        <span className="flex">
          <input placeholder="Correo Electronico" className="w-full border border-gray-200 transition focus:border-blue-500 focus:border-2 outline-none pl-3" />
          <button type="submit" className="focus:outline-none bg-blue-500 text-white px-2 py-1">Enviar</button>
        </span>
      </div>
    );
  };

  export default Suscribed
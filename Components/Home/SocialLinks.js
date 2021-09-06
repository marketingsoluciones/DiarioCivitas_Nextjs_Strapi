import { FacebookIcon, InstagramIcon, TwitterIcon } from "../icons"

 const SocialLinks = () => {
    const arrRedes = [
      { titulo: "Twitter", icono: <TwitterIcon className="h-6 w-6 text-white"/>, color: "bg-blue-500" },
      { titulo: "Facebook", icono: <FacebookIcon className="h-6 w-6 text-white" />, color: "bg-blue-900" },
      { titulo: "Instagram", icono: <InstagramIcon className="h-6 w-6 text-white" />, color: "bg-pink-600" },
    ]
    return (
      <div className="bg-white shadow-md p-8">
        <h3 className="font-body font-semibold uppercase text-md pb-4">¡Hagamoslo viral!</h3>
        <div className=" grid grid-cols-2 gap-4">
        {arrRedes.map((red, idx) => (
          <button key={idx} className={`${red.color} focus:outline-none hover:opacity-80 rounded justify-center py-2 flex gap-2 items-center w-full`}>
            {red.icono} <p className="text-white font-body text-xs">{red.titulo}</p>
          </button>
        ))}
        </div>
  
      </div>
    )
  }

  export default SocialLinks
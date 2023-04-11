import { useState } from "react";

export const Firmas = () => {

    const [checkedd, setChecked] = useState([])

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        /*  try {
           let res = await fetch("https://httpbin.org/post", {
             method: "POST",
             body: JSON.stringify({
               name: name,
               email: email,
               mobileNumber: mobileNumber,
             }),
           });
           let resJson = await res.json();
           if (res.status === 200) {
             setName("");
             setEmail("");
             setMessage("User created successfully");
           } else {
             setMessage("Some error occured");
           }
         } catch (err) {
           console.log(err);
         } */
    };

    const handleChange = (event) => {
        const { value, checked } = event.target
        if (checked) {
            setChecked([...checkedd, value])
        }else{
            setChecked(checkedd.filter(o=>o !== value))
        }
    }
    console.log(checkedd)

    return (
        <>
            <div className=" flex flex-col items-center" >

                <h3 className="mb-3 font-bold">Firma Esta Peticion</h3>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        className="focus:outline-none border-1 rounded-md border-gray-400 py-1 px-2"
                        type="text"
                        placeholder="Nombre"
                    //={(e) => setName(e.target.value)}
                    />
                    <input
                        className="focus:outline-none border-1 rounded-md border-gray-400 py-1 px-2"
                        type="text"
                        placeholder="Apellido"
                    //onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="focus:outline-none border-1 rounded-md border-gray-400 py-1 px-2"
                        type="email"
                        placeholder="Correo electronico"
                    //onChange={(e) => setMobileNumber(e.target.value)}
                    />
                    <div className=" gap-2">
                        <input
                            type="checkbox"
                            value={"consentimiento"}
                            onChange={handleChange}
                        />
                        <label className="ml-3 text-sm">Doy mi consentimiento para compartir
                            mi nombre y dirección de correo electrónico
                            con España Ciudadana, a fin de mantenerme
                            informado/a sobre esta campaña y otras.</label>
                    </div>
                    <div className=" gap-2">
                        <input
                            value={"firma"}
                            type="checkbox"
                            //onChange={handleChange}
                        />
                        <label className="ml-3 text-sm">Publicar mi firma y mi comentario
                            sobre esta petición.</label>
                    </div>
                    <button className={`${checkedd.length >= 1 ? "bg-blueFull cursor-pointer hover:bg-blue-400":"bg-blue-200 cursor-none" }    py-2 rounded-lg mt-2  text-center text-white w-full items-end justify-self-end font-bold`} type="submit">Firmar peticion</button>
                </form>

                <label className="text-xs text-gray-500 mt-3">Al firmar, aceptas las condiciones de servicio  y la política de privacidad de Change.org y  también aceptas recibir mensajes de correo  electrónico ocasionalmente sobre campañas  abiertas en Change.org. Puedes darte de baja en cualquier momento.</label>
            </div>
        </>
    )
}
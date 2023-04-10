import { Markup } from "interweave";

export const ResumenPeticion = ({ title, destinatario, problema, imagen }) => {
    return (
        <>
            <div className="flex flex-col items-center">
                <h3 className="font-bold text-4xl">
                    {title}
                </h3>

                <div className="px-20 mt-5 col-span-4 w-full grid grid-cols-4 gap-9">
                    <div className="col-span-3 ">
                        

                        {imagen}
                       <Markup content={problema} />

                    </div>
                    <div className="col-span-1">
g
                    </div>
                </div>
                {destinatario}
                <button>Guardar</button>
            </div>

        </>
    )
}
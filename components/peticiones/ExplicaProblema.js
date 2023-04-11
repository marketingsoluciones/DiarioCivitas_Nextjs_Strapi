import { CuadroAyudaBig } from "./CuadrosAyudas"
import { useEffect, useState } from "react";
import CKeditor from "../forms/inputs/CKEditor";


export const ExplicaProblema = ({ onClick, problema, setProblema, dataa }) => {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState("");
    useEffect(() => {
        setEditorLoaded(true);
    }, []);
    return (
        <>

            <h3 className="text-2xl font-bold ">
                Explica el problema que quieres resolver
            </h3>

            <p className="w-3/4 mt-2 ">
                Más gente apoyará tu petición si está claro por qué es importante para ti.
                Explica cómo este cambio impactará a tu familia o a tu comunidad.
            </p>

            <div className="w-3/4 my-4 grid justify-items-stretch ">
               
                <div className="max-w-3xl ">
                    <CKeditor
                        name="description"
                        onChange={(data) => {
                            setProblema(data);
                        }}
                        editorLoaded={editorLoaded}
                    />
            
                </div>
                <span className={`${dataa?"ml-4 text-red-500 block":"hidden"} `} >*Explica el Problema de tu peticion*</span>

                <button onClick={() => onClick()} className="bg-blueFull py-2 rounded-lg mt-2 text-center text-white w-1/4 items-end justify-self-end font-bold">Continuar</button>
            </div>

            <CuadroAyudaBig
                titulo1={"Describe a las personas involucradas y el problema al que se están enfrentando"}
                info1={'Es más fácil que los lectores actúen cuando entiendan quién está siendo afectado.'}

                titulo2={"Describe la solución"}
                info2={'Explica qué tiene que cambiar y quién puede hacer ese cambio posible. Deja claro qué pasaría si ganas o pierdes.'}

                titulo3={"Hazlo personal"}
                info3={'Es más fácil que los lectores firmen y apoyen tu petición si entienden por qué te importa.'}

                titulo4={"Respeta a los demás"}
                info4={'No insultes, no uses lenguaje que promueva el odio, no amenaces con violencia o inventes cosas que no son ciertas.'}

                titulo5={"Asegúrate de que tu información sea precisa"}
                info5={'¡La exactitud importa! Firmar una petición es un acto de confianza y asegurarte de que tu campaña contenga información precisa es un requerimiento para el uso de esta plataforma. Haz clic aquí para ver consejos sobre cómo verificar información.'}

            />

        </>
    )
}
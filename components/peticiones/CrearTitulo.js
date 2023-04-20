import { CuadroAyudaSmall } from "./CuadrosAyudas"
import { InputFieldTitle } from "../forms/inputs/InputFieldTitle"
import { InputField } from "../forms/inputs/InputField"
import { useState } from "react"
export const CrearTitulo = ({ slug, setSlug, onClick }) => {

    return (
        <>
            <h3 className="text-2xl font-bold ">
                Escribe el título de la petición
            </h3>
            <p className="w-3/4 mt-2 ">
                Esto es lo primero que la gente verá de tu petición. Atrapa su atención con un título corto que se centre en el cambio que quieres que apoyen.
            </p>
            <div
                className="w-3/4 my-4 grid justify-items-stretch ">
                <InputField
                    name="title"
                    className="focus:outline-none w-full border-2 border-gray-300 rounded-md py-2 px-3"
                />
                <button type="submit" onClick={() => onClick()} className="bg-blueFull py-2 rounded-lg mt-2  text-center text-white w-1/4 items-end justify-self-end font-bold">Continuar</button>
            </div>
            <CuadroAyudaSmall
                titulo1={"Que sea corto y directo"}
                ejm1={'Por ejemplo: "Compren huevos orgánicos para sus restaurantes"'}
                no1={'No: "Detengan el trato inhumano a las gallinas alimentadas por la fuerza en fábricas industriales..."'}

                titulo2={"Céntrate en la solución"}
                ejm2={'Por ejemplo: "Suban el salario mínimo en Manchester a £15 la hora"'}
                no2={'No: "Detengan la creciente desigualdad de ingresos en Manchester"'}

                titulo3={"Comunica urgencia"}
                ejm3={'Ejemplo: "Aprueben la medicina que podría salvar la vida de mi hija antes de que sea demasiado tarde"'}
            />

        </>
    )
}
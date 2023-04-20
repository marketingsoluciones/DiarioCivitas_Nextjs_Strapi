import { MultiImagen } from "../../components/forms/inputs/MultiImages"
import { UploadImage } from "../../components/forms/inputs/UploadImage"
import { FieldArrayField } from "../../components/forms/inputs/FieldArrayField"


export const CargarImg = ({ onClick, imagen, setImagen, ...props }) => {


  return (
    <>
      <div className="w-full mt-4">

        <div className="flex flex-row gap-10 mb-3 ">

          <div className="basis-1/2">
            <h3 className="text-xl font-bold mb-3 ">
              Escoge la imagen para tu tarjeta de portada
            </h3>
            <UploadImage
              name="imgMiniatura"
            />
          </div>

          {/* <div className="basis-1/2 w-44">
            <h3 className="text-xl font-bold mb-3 ">
              Coloca etiquetas que describan tu peticion
            </h3>
            <FieldArrayField
              
              className="focus:outline-none w-full border-2 border-gray-300 rounded-md py-2 px-3"
              name="tags"
              schema={"string"}
            />

          </div> */}

        </div>



        <div className="w-full">
          <h3 className="text-2xl font-bold ">
            Imagenes que describan tu petición
          </h3>
          <div className=" mb-4 grid  justify-items-stretch space-y-6">
            <MultiImagen
              name="imgCarrusel"
              imagen={imagen}
              setImagen={setImagen}
            />
            <button type="submit" className="bg-blueFull py-2 rounded-lg  text-center text-white w-2/4 items-end justify-self-end font-bold">Guardar</button>
          </div>

        </div>


      </div>



    </>
  )
}
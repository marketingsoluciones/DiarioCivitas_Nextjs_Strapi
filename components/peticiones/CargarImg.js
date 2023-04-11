import { useEffect } from "react";
import { IDGenerator } from "../../utils/IDGenerator";
import Image from "next/dist/client/image";
import { DeleteIcon } from "../icons";

export const CargarImg = ({ onClick, imagen, setImagen,data }) => {

  useEffect(() => {
    const files = imagen.reduce((acc, item) => {
      item.file && acc.push(item.file)
      item.i640 && acc.push(item._id)
      return acc
    }, [])
    // helpers.setValue(files);
  }, [imagen]);

  const handleChange = async (e) => {
    try {
      let file = e.target.files;
      const arrayOfFiles = Object.values(file);
      arrayOfFiles?.forEach((item) => {
        let reader = new FileReader();
        reader.onloadend = async () => {
          if (reader.result) {
            const nuevaImagen = {
              _id: IDGenerator(),
              file: item,
              imagen: reader.result,
            };
            setImagen((old) => [...old, nuevaImagen]);
          }
        };
        reader.readAsDataURL(item);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = (id) => {
    setImagen((old) => old.filter((item) => item._id !== id));
  };

  return (
    <>
      <h3 className="text-2xl font-bold ">
        Imagenes que describan tu petición
      </h3>
      <div className="w-3/4 my-4 grid  justify-items-stretch space-y-6 ">
        <div className="h-full w-full rounded-md border-dashed border-2  border-gray-400 mt-4 grid grid-cols-4 gap-4" >

          <label htmlFor="photo" className="m-5 h-max bg-white p-14 rounded-md shadow-md cursor-pointer flex justify-center">
            +
          </label>

          <input
            type="file"
            id="photo"
            name="photo"
            className="hidden"
            onChange={handleChange}
          />
          {imagen?.map((item, idx) => {
            if (item.imagen) {
              return (
                <div className="mt-5 ml-5 relative" key={idx}>
                  <Image
                    alt={item._id}
                    src={item.imagen}
                    height="140px"
                    width="140px"
                  />
                  <button className="absolute right-6 bottom-9 bg-gray-200 rounded p-0.5" onClick={()=> handleRemove(item._id)}>
                    <DeleteIcon/>
                  </button>
                </div>
              )
            }
          })}

        </div>
        <span className={`${data?"ml-4 text-red-500 block":"hidden"} `} >*Sube al menos una imagen referente a tu peticion*</span>

        <button onClick={() => onClick()} className="bg-blueFull py-2 rounded-lg  text-center text-white w-2/4 items-end justify-self-end font-bold">Guardar y ver una versión preliminar</button>

      </div>

    </>
  )
}
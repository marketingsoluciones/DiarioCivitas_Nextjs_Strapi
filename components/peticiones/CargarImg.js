import { UploadPhoto } from "../icons";
import { useField } from "formik";
import { useEffect } from "react";

export const CargarImg = ({ onClick, imagen, setImagen }) => {

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
            //helpers?.setValue([...field?.value, item])
            setImagen((old) => [...old, nuevaImagen]);
          }
        };

        reader.readAsDataURL(item);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h3 className="text-2xl font-bold ">
        Imagenes que describan tu petición
      </h3>
      <div className="w-3/4 my-4 grid  justify-items-stretch ">
        <div className="h-max w-full rounded-md border-dashed border-2  border-gray-400 mt-4 grid grid-cols-4 gap-4" >

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

        </div>

        <button onClick={() => onClick()} className="bg-blueFull py-2 rounded-lg mt-2 text-center text-white w-2/4 items-end justify-self-end font-bold">Guardar y ver una versión preliminar</button>

      </div>

    </>
  )
}
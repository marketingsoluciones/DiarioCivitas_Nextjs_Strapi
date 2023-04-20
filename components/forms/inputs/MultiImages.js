import {memo, useEffect, useState } from "react";
import { IDGenerator } from "../../../utils/IDGenerator"
import Image from "next/dist/client/image";
import { DeleteIcon } from "../../icons";
import { useField } from "formik";


export const MultiImagen = memo( ({ imagen, setImagen ,  label, ...props }) => {
    const [field, meta, helpers] = useField(props);
   

  useEffect(() => {
    const files = imagen?.reduce((acc, item) => {
      item.file && acc.push(item.file)
      item.i640 && acc.push(item._id)
      return acc
    }, [])
    helpers.setValue(files);
  }, [imagen]);

  useEffect(() => {
    field.value && setImagen(field.value)
  }, []);

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
        {label}
      </h3>
      
      <div className="">
        <div className="h-full w-full rounded-md border-dashed border-2  border-gray-400 grid grid-cols-4 gap-4" >

          <label htmlFor="imgCarrusel" className="m-5 h-max bg-white p-14 rounded-md shadow-md cursor-pointer flex justify-center">
            +
          </label>

          <input
            type="file"
            id="imgCarrusel"
      
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
                    className="rounded-md"
                  />
                  <button className="absolute right-6 bottom-9 bg-gray-200 rounded p-0.5" onClick={()=> handleRemove(item._id)}>
                    <DeleteIcon/>
                  </button>
                </div>
              )
            } if(item.i800){
                return (
                    <div className="mt-5 ml-5 relative" key={idx}>
                    <Image
                      alt={item._id}
                      src={item?.i640}
                      height="140px"
                      width="140px"
                      className="rounded-md"
                    />
                    <button className="absolute right-6 bottom-9 bg-gray-200 rounded p-0.5" onClick={()=> handleRemove(item._id)}>
                      <DeleteIcon/>
                    </button>
                  </div>
                )
              }
          })}

        </div>


      </div>

    </>
  )
})
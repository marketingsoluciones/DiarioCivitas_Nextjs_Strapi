import { useField } from "formik";
import Image from "next/image";
import { ImageIcon } from "../../icons"
import { useEffect, useState } from "react";

export const UploadImage = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [image, setImage] = useState(null)


  const handleChange = async (e) => {
    try {
      let file = e.target.files[0];
      let reader = new FileReader();

      reader.onloadend = async () => {
        if (reader.result) {

          helpers.setValue(file)
          setImage(reader.result)
        }
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div>


          {(() => {
            if (!image) {
              return (
                <>
                  <label htmlFor="imgMiniatura" className="m-5 h-max bg-white  py-16 rounded-md shadow-md cursor-pointer flex justify-center">
                    +
                  </label>
                </>
              )

            } else {
              return (
                <>
                  <div className="ml-5">
                    {field?.value?.i640 && <Image alt="imgMiniatura" layout="fill" src={`${process.env.NEXT_PUBLIC_BASE_URL}${field.value.i640}`} />}
                    {image && <Image alt="imgMiniatura" height="185px"
                      width="190px" className="rounded-md" src={image} />}
                  </div>
                </>
              )

            }
          })()}



      <input
        type="file"
        id="imgMiniatura"
       
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
};

import { FieldArray, useField } from "formik";
import { memo } from "react";
import { useState } from "react";
import { CloseIcon } from "../../icons";

export const FieldArrayField = memo(({ className, label, schema, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [value, setValue] = useState("");

  const schemas = {
    string: value,
    object: { title: value }
  }

  return (
    <div>
      <FieldArray
        name={props.name}
        render={(arrayHelpers) => (
          <>
            <div >
              <button
                onClick={() => arrayHelpers.push(schemas[schema])}
                className="bg-gray-200 py-1 px-2 rounded-md"
              >
                Crear
              </button>

              <input
                className="focus:outline-none ml-2 py-1 px-2 border-2 rounded-md "
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />

            </div>
            <div className="grid  gird-cols-4" >
              {field.value &&
                field?.value?.map((item, idx) => {

                  if (typeof item === "string") {
                    return (
                      item && (
                        <div
                          key={idx}
                          className="flex flex-row gap-2 mt-2 ml-4"
                        >
                          {item}
                          <button
                            className="bg-gray-200 rounded-md"
                            onClick={() => {
                              const indice = arrayHelpers.form.values[props.name].findIndex(ele => item === ele)
                              arrayHelpers.remove(indice)
                            }}
                          >
                            <CloseIcon />
                          </button>
                        </div>
                      )
                    )
                  }

                  /* if(item instanceof Object){
                    return (
                      <>
                        {item.title && (
                          <ListItem
                           
                          >
                            <ListIcon  />
                            {item.title}
                            <IconButton size={"xs"} onClick={() => {
                                const indice = arrayHelpers.form.values[props.name].findIndex(ele => item === ele)
                                arrayHelpers.remove(indice)
                            }}><CloseIcon/></IconButton>
                          </ListItem>
                        )}
                      </>
                    )
                  } */


                })}
            </div>
            {meta.touched && meta.error && (
              <label color={"red"} fontSize={"xs"}>
                {meta.error}
              </label>
            )}
          </>
        )}
      />
    </div>
  );
})

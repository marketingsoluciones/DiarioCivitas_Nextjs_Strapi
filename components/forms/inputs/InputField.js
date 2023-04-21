import { useField } from "formik";
import { memo } from "react";

export const InputField = memo(({ className, ...props }) => {

  const [field, meta, helpers] = useField(props);

  return (
    <div>
        <input  className={className} {...field} {...props} />
    </div>
  );
});

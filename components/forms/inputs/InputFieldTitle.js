import { useField } from "formik";
import { memo } from "react";

export const InputFieldTitle = memo(({setSlug, className, ...props }) => {
  const [field, meta, helpers] = useField(props);

  return (
    <div>
      <input onChange={setSlug(field.value)} className={className} {...field} {...props} />
    </div>
  );
});

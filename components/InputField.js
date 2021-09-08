import { useField } from "formik"

const InputField = ({ label, children, ...props }) => {
    const [field, meta, helpers] = useField({ ...props })
    return (
        <div className="w-full">
            <label className="text-xs text-gray-900 pl-1 py-1">{label}</label>
            <div className="relative ">
                <input className="focus:outline-none text-sm py-1 pl-3 rounded focus:ring bg-gray-100 w-full" {...field} {...props} />
                {children}
            </div>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    )
}

export default InputField

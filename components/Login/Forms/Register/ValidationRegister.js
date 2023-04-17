import * as yup from "yup";

export const ValidationSchemaRegister = {
  // ########### USER #############

  // Schema de validacion user con todos los valores
  userValidationTotal: yup.object().shape({
    fullName: yup.string().required("Campo requerido"),
    email: yup.string().email().required("Campo requerido"),
    password: yup.string().required("Campo requerido").min(8),
    phoneNumber: yup.number().required("Campo requerido"),
  }),

  // Schema de validacion user con valores parciales
  userValidationPartial: yup.object().shape({
    phoneNumber: yup.number().required("Campo requerido"),
  }),

};

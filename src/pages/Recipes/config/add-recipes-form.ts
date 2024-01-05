import * as yup from "yup";

const { required } = {
  required: "Este campo es obligatorio",
};

export const addRecipeValidationSchema = yup.object({
  name: yup.string().required(required),
});

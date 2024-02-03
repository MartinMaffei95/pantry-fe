import * as yup from "yup";

const { required } = {
  required: "Este campo es obligatorio",
};

export const addRecipeValidationSchema = yup.object().shape({
  name: yup.string().required(required),
  ingredients: yup.array().min(1),

  result: yup.object().shape({
    portion: yup.object().shape({
      weight: yup.number().min(1).required(),
      quantity: yup.number().min(1).required(required),
    }),
    yield: yup.object().shape({
      quantity: yup.number().min(1).required(required),
    }),
    product: yup.string().required(required),
  }),
});

import { FC, useState } from "react";
import Title from "../../components/Generics/Title/Title";
import Paper from "../../components/Generics/Paper/Paper";
import ChakraControled from "../../components/InputComponents/ChakraControled";
import { AddProductForm } from "../../interfaces";
import { addProductValidationSchema } from "./config/add-product-form";
import { useFormik } from "formik";
import ChakraControlledSelect from "../../components/InputComponents/ChakraControlledSelect";
import { Button } from "@chakra-ui/react";
import ProductService from "../../services/Product.service";
import Loader from "../../components/Loader/Loader";
import { sendSnackbar } from "../../services/snackbar-manager.service";

type Props = {};
const AddProduct: FC<Props> = ({}) => {
  const productsService = new ProductService();
  const [loading, setLoading] = useState<boolean>(false);
  const initValues: AddProductForm = {
    name: "",
    type: "BASIC",
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const response = await productsService.addProduct(values);
      if (response === "SUCCESS") {
        resetForm();
      }
      sendSnackbar.success("Su producto fue creado");

      setLoading(false);
    } catch (err) {
      setLoading(false);
      sendSnackbar.error("Ocurrio un error");
    }
  };
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    values,
    touched,
    resetForm,
  } = useFormik<AddProductForm>({
    initialValues: initValues,
    onSubmit,
    validationSchema: addProductValidationSchema,
  });
  return (
    <>
      <Title>Agregar Producto</Title>
      <Paper className={loading ? "relative overflow-hidden" : ""}>
        {loading ? (
          <div className="w-full h-full top-0 left-0 flex justify-center items-center absolute bg-neutral-500 bg-opacity-50 backdrop-blur-sm z-50">
            <Loader />
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="">
          <ChakraControled
            label="Nombre del próducto: "
            name="name"
            value={values.name}
            error={errors.name}
            touched={touched.name}
            handleBlur={handleBlur}
            handleChange={handleChange}
            variant="outline"
            borderColor={"black"}
            background={"whiteAlpha.900"}
          />

          <ChakraControlledSelect
            name="type"
            label="Tipo de oroducto:"
            value={values.type}
            touched={touched.type}
            error={errors.type}
            options={[
              { label: "Producto básico", value: "BASIC" },
              { label: "Producto elaborado", value: "ELABORATED" },
            ]}
            handleChange={handleChange}
            handleBlur={handleBlur}
            firstOption="Tipo de producto"
          />
          <div className="flex w-full justify-center items-center mt-6">
            <Button type="submit" className="w-full" colorScheme="orange">
              Guardar
            </Button>
          </div>
        </form>
      </Paper>
    </>
  );
};

export default AddProduct;

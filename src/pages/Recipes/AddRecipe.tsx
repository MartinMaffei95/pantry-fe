import { FC, useState } from "react";
import Title from "../../components/Generics/Title/Title";
import Paper from "../../components/Generics/Paper/Paper";
import ChakraControled from "../../components/InputComponents/ChakraControled";
import { AddProductForm, Product, RecipeMeasurement } from "../../interfaces";
import { useFormik } from "formik";
import ProductService from "../../services/Product.service";
import Loader from "../../components/Loader/Loader";
import { sendSnackbar } from "../../services/snackbar-manager.service";
import { addRecipeValidationSchema } from "./config/add-recipes-form";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useApiRequest } from "../../hooks/useApiRequest";
import SearchListItemProduct from "./components/ListItem/SearchListItem";
import {
  Button,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FaCheck, FaRegTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import ChakraControlledSelect from "../../components/InputComponents/ChakraControlledSelect";
import ChakraControledTextArea from "../../components/InputComponents/ChakraControledTextArea";
type Props = {};
const AddRecipe: FC<Props> = ({}) => {
  const productsService = new ProductService();

  const { status, response, executeRequest } = useApiRequest(
    (querySearch: string, extraQueries?: string) =>
      productsService.searchProducts(querySearch, extraQueries)
  );

  const [loading, setLoading] = useState<boolean>(false);
  type RecipeIngredientsForm = {
    product: string;
    productName: string;
    measurement: RecipeMeasurement;
  };
  const [partialIngredient, setPartialIngredient] =
    useState<RecipeIngredientsForm>({
      measurement: { meassurement: "", quantity: 0 },
      product: "",
      productName: "",
    });
  const [ingredients, setIngredients] = useState<RecipeIngredientsForm[]>([]);

  const addIngredient = (
    productId: string,
    productName: string,
    meassurement: string,
    quantity: number
  ) => {
    const ingredient: RecipeIngredientsForm = {
      product: productId,
      productName: productName,
      measurement: {
        meassurement: meassurement,
        quantity: quantity,
      },
    };
    setIngredients((state) => [...state, ingredient]);
  };
  const deleteIngredient = (id: string) => {
    const filteredIngredients = ingredients.filter(
      (ingredient) => ingredient.product !== id
    );

    if (!filteredIngredients) return;

    setIngredients(() => filteredIngredients);
  };

  const preparePartialCharge = (product: Product) => {
    const ingredient: RecipeIngredientsForm = {
      product: product.id,
      productName: product.name,
      measurement: {
        meassurement: "",
        quantity: 0,
      },
    };
    setPartialIngredient(ingredient);
  };

  const initValues: AddProductForm = {
    name: "",
    type: "BASIC",
    newStep: "",
  };
  const selectResult: <Product>(res: Product) => void = (res) => {
    console.log(res);
    preparePartialCharge(res);
  };º
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
    validationSchema: addRecipeValidationSchema,
  });

  const options = [
    { label: "gr.", value: "gr" },
    { label: "ml.", value: "ml" },
    { label: "unid.", value: "un" },
  ];
  return (
    <>
      <Title>Nueva receta</Title>
      <Paper className={loading ? "relative overflow-hidden" : ""}>
        {loading ? (
          <div className="w-full h-full top-0 left-0 flex justify-center items-center absolute bg-neutral-500 bg-opacity-50 backdrop-blur-sm z-50">
            <Loader />
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="">
          <ChakraControled
            label="Nombre de  la receta: "
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
          <Title>Ingredientes:</Title>

          <TableContainer>
            <Table className="bg-neutral-200">
              <Thead>
                <Tr>
                  <Th>Ingrediente</Th>
                  <Th align="right" className="">
                    Cantidad
                  </Th>
                  <Th>Medida.</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {ingredients?.map((ingredient) => (
                  <Tr>
                    <Td>{ingredient.productName} </Td>
                    <Td>{ingredient.measurement.quantity}</Td>
                    <Td>{ingredient.measurement.meassurement}</Td>
                  </Tr>
                ))}

                <Tr>
                  <Td>
                    <SearchBar
                      onSelectResult={selectResult}
                      status={status}
                      response={response}
                      executeRequest={executeRequest}
                      ListItem={SearchListItemProduct}
                    />
                  </Td>
                  <Td>
                    <Input
                      onChange={(e) =>
                        setPartialIngredient((state) => ({
                          ...state,
                          measurement: {
                            ...state.measurement,
                            quantity: +e.target.value,
                          },
                        }))
                      }
                      value={partialIngredient.measurement.quantity}
                      type="number"
                    />
                  </Td>

                  <Td>
                    <Select
                      onChange={(e) =>
                        setPartialIngredient((state) => ({
                          ...state,
                          measurement: {
                            ...state.measurement,
                            meassurement: e.target.value,
                          },
                        }))
                      }
                      value={partialIngredient.measurement.meassurement}
                    >
                      {options.map((opt) => (
                        <option value={opt.value}>{opt.label}</option>
                      ))}
                    </Select>
                  </Td>
                  <Td>
                    <Button
                      colorScheme="green"
                      onClick={() =>
                        addIngredient(
                          partialIngredient.product,
                          partialIngredient.productName,
                          partialIngredient.measurement.meassurement,
                          partialIngredient.measurement.quantity
                        )
                      }
                    >
                      <FaCheck />
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Ingrediente</Th>
                  <Th className="">Cantidad</Th>
                  <Th>Medida.</Th>
                  <Th></Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          <div>
            <ChakraControledTextArea
              label="Paso"
              name="name"
              value={values.newStep}
              error={errors.newStep}
              touched={touched.newStep}
              handleBlur={handleBlur}
              handleChange={handleChange}
              variant="outline"
              borderColor={"black"}
              background={"whiteAlpha.900"}
            />
          </div>
          {/*   <div>
            <div className="flex gap-2"></div>

            <h1>Nuevos ingredietnes</h1>

            <div>
              <h1>AGREGAR</h1>
              <div>
                {partialIngredient ? (
                  <>{partialIngredient.productName}</>
                ) : null}
              </div>
            </div>
          </div> */}
          {/* <div className="flex w-full justify-center items-center mt-6">
            <Button type="submit" className="w-full" colorScheme="orange">
              Guardar
            </Button>
          </div> */}
        </form>
      </Paper>
    </>
  );
};

export default AddRecipe;

import { FC, FocusEvent, useRef, useState } from "react";
import Title from "../../components/Generics/Title/Title";
import Paper from "../../components/Generics/Paper/Paper";
import ChakraControled from "../../components/InputComponents/ChakraControled";
import {
  AddProductForm,
  AddRecipeForm,
  Product,
  RecipeMeasurement,
} from "../../interfaces";
import { useFormik } from "formik";
import ProductService from "../../services/Product.service";
import Loader from "../../components/Loader/Loader";
import { sendSnackbar } from "../../services/snackbar-manager.service";
import { addRecipeValidationSchema } from "./config/add-recipes-form";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useApiRequest } from "../../hooks/useApiRequest";
import SearchListItemProduct from "./components/ListItem/SearchListItem";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
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
import { FaCheck } from "react-icons/fa";
import ChakraControledTextArea from "../../components/InputComponents/ChakraControledTextArea";
import RecipeService from "../../services/Recipe.service";
import ChakraControledNumber from "../../components/InputComponents/ChakraControledNumber";
import ChakraControlledSelect from "../../components/InputComponents/ChakraControlledSelect";
type Props = {};
const AddRecipe: FC<Props> = ({}) => {
  const productsService = new ProductService();

  const searchNewIngredientRef = useRef<any>(null);

  const { status, response, executeRequest } = useApiRequest(
    (querySearch: string, extraQueries?: string) =>
      productsService.searchProducts(querySearch, extraQueries)
  );

  const recipeService = new RecipeService();

  const recipeApi = useApiRequest((newrecipe: AddRecipeForm) =>
    recipeService.createRecipe(newrecipe)
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [steps, setSteps] = useState<string[]>([]);
  const [newStep, setNewStep] = useState<string>("");

  type RecipeIngredientsForm = {
    product: string;
    productName: string;
    measurement: RecipeMeasurement;
  };
  const [partialIngredient, setPartialIngredient] =
    useState<RecipeIngredientsForm>({
      measurement: { meassurement: "gr", quantity: 0 },
      product: "",
      productName: "",
    });
  const [ingredients, setIngredients] = useState<RecipeIngredientsForm[]>([]);
  const [finalProduct, setFinalProduct] = useState<Product>({});

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
        meassurement: "gr",
        quantity: 0,
      },
    };
    setPartialIngredient(ingredient);
    setFieldValue("ingredients", ingredients);
  };

  const initValues: AddRecipeForm = {
    name: "",
    ingredients: [],
    steps: [],
    result: {
      product: "",
      yield: {
        meassurement: "gr",
        quantity: 0,
      },
      portion: {
        weight: 0,
        meassurement: "gr",
        quantity: 0,
      },
    },
  };
  const selectResult: <Product>(res: Product) => void = (res) => {
    console.log(res);
    preparePartialCharge(res);
  };

  const selectFinalProduct: (res: Product) => void = (res) => {
    console.log(res.id);
    setFinalProduct(res);
    setFieldValue("result.product", res.id);
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const response = await recipeService.createRecipe(values);
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
    setFieldValue,
  } = useFormik<AddRecipeForm>({
    initialValues: initValues,
    onSubmit,
    validationSchema: addRecipeValidationSchema,
  });

  const options = [
    { label: "gr.", value: "gr" },
    { label: "ml.", value: "ml" },
    { label: "unid.", value: "un" },
  ];
  const addStep = () => {
    const step = newStep;
    setSteps((state) => [...state, step]);
    setFieldValue("steps", [...values?.steps, step]);

    setNewStep("");
  };

  const addIngredient = (
    productId: string,
    productName: string,
    meassurement: string,
    quantity: number
  ) => {
    if (quantity <= 0 || !productId) return;
    const ingredient: RecipeIngredientsForm = {
      product: productId,
      productName: productName,
      measurement: {
        meassurement: meassurement,
        quantity: quantity,
      },
    };
    setIngredients((state) => [...state, ingredient]);

    setFieldValue("ingredients", [
      ...values.ingredients,
      {
        product: productId,
        measurement: {
          meassurement: meassurement,
          quantity: quantity,
        },
      },
    ]);
    searchNewIngredientRef?.current?.clearSearch();
    setPartialIngredient({
      measurement: { meassurement: "gr", quantity: 0 },
      product: "",
      productName: "",
    });
  };
  return (
    <>
      <Title>Nueva receta</Title>
      <Paper className={loading ? "relative overflow-hidden" : ""}>
        {loading ? (
          <div className="w-full h-full top-0 left-0 flex justify-center items-center absolute bg-neutral-500 bg-opacity-50 backdrop-blur-sm z-50">
            <Loader />
          </div>
        ) : null}
        <button onClick={() => console.log(errors)}>VER ERR</button>
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

          <div className="flex flex-col gap-2 my-4 p-2  rounded-md border-2">
            <Title as="h4">Agregar ingrediente:</Title>
            <div>
              <SearchBar
                onSelectResult={selectResult}
                status={status}
                response={response}
                executeRequest={executeRequest}
                ListItem={SearchListItemProduct}
                ref={searchNewIngredientRef}
              />
            </div>
            <div className="flex gap-4">
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
            </div>
            <div>
              <div className="flex w-full justify-end">
                <Button
                  colorScheme="green"
                  className=""
                  size={"sm"}
                  leftIcon={<FaCheck />}
                  onClick={() =>
                    addIngredient(
                      partialIngredient.product,
                      partialIngredient.productName,
                      partialIngredient.measurement.meassurement,
                      partialIngredient.measurement.quantity
                    )
                  }
                >
                  Agregar
                </Button>
              </div>
            </div>
          </div>
          {ingredients.length > 0 ? (
            <TableContainer overflow={"initial"} className="overflow-[initial]">
              <Table>
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
                </Tbody>
                {ingredients.length > 5 ? (
                  <Tfoot>
                    <Tr>
                      <Th>Ingrediente</Th>
                      <Th className="">Cantidad</Th>
                      <Th>Medida.</Th>
                      <Th></Th>
                    </Tr>
                  </Tfoot>
                ) : null}
              </Table>
            </TableContainer>
          ) : null}

          <div className="flex flex-col gap-4">
            <Title>Pasos:</Title>

            <Accordion allowMultiple>
              {steps.map((step, index) => (
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        Paso {index + 1}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>{step}</AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>

            <ChakraControledTextArea
              label={`Paso ${steps?.length + 1}`}
              name="name"
              value={newStep}
              handleChange={(e) => setNewStep(e.currentTarget.value)}
              handleBlur={(e) => setNewStep(e.currentTarget.value)}
              variant="outline"
              borderColor={"black"}
              background={"whiteAlpha.900"}
              isInvalid={false}
            />
            <Button onClick={addStep} colorScheme="green">
              Agregar
            </Button>
          </div>

          <div>
            <Title>Resultado final:</Title>

            <div>Producto resultante</div>
            <div>
              {/* <SearchBar
                onSelectResult={selectFinalProduct}
                status={status}
                response={response}
                executeRequest={executeRequest}
                ListItem={SearchListItemProduct}
                extraQuery="type=ELABORATED"
              /> */}
              <ChakraControled
                label="Nombre del producto: "
                name="result.product"
                value={values?.result?.product}
                error={errors?.result?.product}
                touched={touched?.result?.product}
                handleBlur={handleBlur}
                handleChange={handleChange}
                variant="outline"
                borderColor={"black"}
              />
            </div>
            <Title as="h3">Cantidad final por receta:</Title>
            <div className="flex gap-2 flex-col">
              <ChakraControledNumber
                label="Peso por porcion "
                name="result.yield.quantity"
                value={values?.result?.yield?.quantity}
                error={errors?.result?.yield?.quantity}
                touched={touched?.result?.yield?.quantity}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                containerStyle={{ classNameStyle: "flex" }}
                inputStyle={{ classNameStyle: "[&_input]:!h-full" }}
                min={1}
              />
              <ChakraControlledSelect
                name="result.yield.meassurement"
                label="Unidad de medida:"
                value={values?.result?.yield?.meassurement}
                error={errors?.result?.yield?.meassurement}
                touched={touched?.result?.yield?.meassurement}
                options={options}
                handleChange={handleChange}
                handleBlur={handleBlur}
                containerStyle={{ classNameStyle: "flex" }}
              />
            </div>
            <Title as="h3">Información sobre pórcion:</Title>
            <div>
              <ChakraControledNumber
                label="Peso por porcion "
                name="result.portion.weight"
                value={values?.result?.portion?.weight}
                error={errors?.result?.portion?.weight}
                touched={touched?.result?.portion?.weight}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                containerStyle={{ classNameStyle: "flex" }}
                inputStyle={{ classNameStyle: "[&_input]:!h-full" }}
                min={1}
              />
              <ChakraControledNumber
                label="Cantidad de pórciones "
                name="result.portion.quantity"
                value={values?.result?.portion?.quantity}
                error={errors?.result?.portion?.quantity}
                touched={touched?.result?.portion?.quantity}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                containerStyle={{ classNameStyle: "flex" }}
                inputStyle={{ classNameStyle: "[&_input]:!h-full" }}
                min={1}
              />
              <ChakraControlledSelect
                name="result.portion.meassurement"
                label="Unidad de medida:"
                value={values?.result?.portion?.meassurement}
                error={errors?.result?.portion?.meassurement}
                touched={touched?.result?.portion?.meassurement}
                options={options}
                handleChange={handleChange}
                handleBlur={handleBlur}
                containerStyle={{ classNameStyle: "flex" }}
              />
            </div>
          </div>

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

export default AddRecipe;

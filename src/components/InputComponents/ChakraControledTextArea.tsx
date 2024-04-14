import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputProps,
  Textarea,
} from "@chakra-ui/react";
import { ChangeEventHandler, FC, FocusEventHandler } from "react";

interface Props extends InputProps {
  label: string;
  name: string;
  value: string;
  handleChange: ChangeEventHandler<HTMLTextAreaElement>;
  handleBlur:FocusEventHandler<HTMLTextAreaElement>;
  touched?: boolean | undefined;
  error?: string | undefined;
  extraCss?: string;
}
const ChakraControledTextArea: FC<Props> = ({
  label,
  name,
  value,
  handleChange,
  handleBlur,
  touched,
  error,
  extraCss = "",
}) => {
  return (
    <FormControl
      className={extraCss}
      isInvalid={touched && error ? true : false}
    >
      <FormLabel fontWeight={"semibold"} htmlFor={name}>
        {label}
      </FormLabel>
      <Textarea
        value={value}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default ChakraControledTextArea;

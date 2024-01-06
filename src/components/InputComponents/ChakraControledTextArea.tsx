import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  Textarea,
} from "@chakra-ui/react";
import { FC, FocusEventHandler, ReactEventHandler } from "react";

interface Props extends InputProps {
  label: string;
  name: string;
  value: string;
  handleChange: ReactEventHandler<HTMLTextAreaElement>;
  handleBlur: FocusEventHandler<HTMLTextAreaElement>;
  touched: boolean | undefined;
  error: string | undefined;
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
  ...props
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
        isInvalid
        value={value}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        {...props}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default ChakraControledTextArea;

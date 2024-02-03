import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { FC, FocusEventHandler } from "react";
import { twMerge } from "tailwind-merge";
import { StyleConfig } from "../../interfaces";

type Props = {
  label?: string;
  name: string;
  value: number;
  handleBlur: FocusEventHandler<HTMLInputElement>;

  setFieldValue: any;
  touched: boolean | undefined;
  error: string | undefined;
  enabled?: boolean;
  max?: number;
  min?: number;
  step?: number;
  containerStyle?: StyleConfig;
  labelStyle?: StyleConfig;
  inputStyle?: StyleConfig;
};
const ChakraControledNumber: FC<Props> = ({
  label,
  name,
  value,
  handleBlur,
  setFieldValue,
  touched,
  error,
  enabled = true,
  max,
  min,
  step,
  containerStyle,
  labelStyle,
  inputStyle,
}) => {
  return (
    <FormControl
      isDisabled={!enabled}
      isInvalid={touched && error ? true : false}
    >
      <div className={twMerge("", containerStyle?.classNameStyle)}>
        {label ? (
          <FormLabel
            className={twMerge("", labelStyle?.classNameStyle)}
            fontWeight={"semibold"}
            htmlFor={name}
          >
            {label}
          </FormLabel>
        ) : null}
        <NumberInput
          name={name}
          onBlur={handleBlur}
          onChange={(val) => setFieldValue(name, val)}
          value={value}
          max={max}
          min={min}
          step={step}
          className={twMerge("", inputStyle?.classNameStyle)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </div>

      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default ChakraControledNumber;

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react'
import { FC, FocusEventHandler } from 'react'

type Props = {
  label?: string
  name: string
  value: number
  handleBlur: FocusEventHandler<HTMLInputElement>
  setFieldValue: any
  touched: boolean | undefined
  error: string | undefined
  enabled?: boolean
  max?: number
  min?: number
  step?: number
}
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
}) => {
  return (
    <FormControl
      isDisabled={!enabled}
      isInvalid={touched && error ? true : false}
    >
      {label ? (
        <FormLabel fontWeight={'semibold'} htmlFor={name}>
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
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}

export default ChakraControledNumber

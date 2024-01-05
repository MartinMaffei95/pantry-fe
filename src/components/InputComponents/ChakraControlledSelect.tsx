import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { FocusEventHandler, ReactEventHandler, FC } from 'react';
import { Option } from '../../interface';

type Props = {
  label?: string;
  name: string;
  value: string;
  handleBlur: FocusEventHandler<HTMLSelectElement>;
  handleChange: ReactEventHandler<HTMLSelectElement>;
  touched: boolean | undefined;
  error: string | undefined;
  enabled?: boolean;
  options: Option[];
  firstOption?: string;
};

const ChakraControlledSelect: FC<Props> = ({
  label,
  name,
  value,
  touched,
  error,
  enabled = true,
  options,
  handleBlur,
  handleChange,
  firstOption,
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
      <Select
        value={value}
        onChange={handleChange}
        name={name}
        onBlur={handleBlur}
      >
        {firstOption ? <option value="">{firstOption}</option> : null}
        {options.map((opt) => (
          <option value={opt.value}>{opt.label}</option>
        ))}
      </Select>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default ChakraControlledSelect;

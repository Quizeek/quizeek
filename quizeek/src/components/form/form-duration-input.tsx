import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  InputAttributes,
  NumericFormatProps,
  PatternFormat,
} from 'react-number-format';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

type FormDurationInputProps = {
  name: string;
  label: string;
} & Omit<
  NumericFormatProps<InputAttributes>,
  'placeholder' | 'format' | 'customInput' | 'getInputRef' | 'isAllowed'
>;

const FormDurationInput = ({
  name,
  label,
  ...props
}: FormDurationInputProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { ref, ...rest } }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <PatternFormat
              format="#h ##m ##s"
              placeholder="#h ##m ##s"
              customInput={Input}
              getInputRef={ref}
              isAllowed={(value) => {
                if (!value.formattedValue) {
                  return true;
                }

                return /^[0-9]?h [0-5\s][0-9\s]m [0-5\s][0-9\s]s$/.test(
                  value.formattedValue
                );
              }}
              {...rest}
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormDurationInput;

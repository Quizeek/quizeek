import React, { ButtonHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Switch } from '../ui/switch';

type FormSwitchProps = {
  name: string;
  labelOn: string;
  labelOff: string;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'checked' | 'onCheckedChange'
>;

const FormSwitch = ({ name, labelOn, labelOff, ...props }: FormSwitchProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <div className="flex gap-3 items-center">
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                {...props}
              />
            </FormControl>
            <FormLabel>
              {(field.value as boolean) ? labelOn : labelOff}
            </FormLabel>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSwitch;

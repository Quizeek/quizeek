import { Loader } from 'lucide-react';
import React from 'react';

import { Button, ButtonProps } from '../ui/button';

type SubmitButtonProps = {
  isLoading: boolean;
} & ButtonProps;

const SubmitButton = (props: SubmitButtonProps) => {
  const { isLoading, children, ...rest } = props;

  return (
    <Button type="submit" {...rest} disabled={isLoading}>
      {isLoading ? <Loader className="animate-spin w-5 h-5" /> : children}
    </Button>
  );
};

export default SubmitButton;

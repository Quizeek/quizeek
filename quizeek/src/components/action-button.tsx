import { Loader } from 'lucide-react';
import React from 'react';

import { Button, ButtonProps } from './ui/button';

type ActionButtonProps = {
  isLoading: boolean;
} & ButtonProps;

const ActionButton = (props: ActionButtonProps) => {
  const { isLoading, type, children, ...rest } = props;

  return (
    <Button type={type ?? 'button'} {...rest} disabled={isLoading}>
      {isLoading ? <Loader className="animate-spin w-5 h-5" /> : children}
    </Button>
  );
};

export default ActionButton;

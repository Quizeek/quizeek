import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

export type ChoiceProps = {
  enableHiglighting: boolean;
  isCorrect: boolean;
  wasSelected: boolean;
} & PropsWithChildren;

export const Choice = ({
  enableHiglighting,
  isCorrect,
  wasSelected,
  children,
  ...props
}: ChoiceProps) => {
  return (
    <Card
      className={cn(
        'w-full py-0 px-3 rounded-md hover:bg-secondary flex items-center gap-2 mb-2 last:mb-0',
        enableHiglighting &&
          wasSelected &&
          isCorrect &&
          'border-2 dark:border-green-600 border-green-400',
        enableHiglighting &&
          wasSelected &&
          !isCorrect &&
          'border-2 dark:border-red-600 border-red-400',
        enableHiglighting &&
          !wasSelected &&
          isCorrect &&
          'border-2 dark:border-yellow-600 border-yellow-400'
      )}
      {...props}
    >
      {children}
    </Card>
  );
};

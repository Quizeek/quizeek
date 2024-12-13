import { Card } from '@/components/ui/card';
import { PropsWithChildren } from 'react';

export type ChoiceProps = PropsWithChildren;

export const Choice = ({ children }: ChoiceProps) => {
  return (
    <Card className="w-full py-0 px-3 rounded-md hover:bg-secondary flex items-center gap-2 mb-2 last:mb-0">
      {children}
    </Card>
  );
};

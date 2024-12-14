import { Label } from '@/components/ui/label';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { Choice as ChoiceType } from '@/db/schema/choice';

import { Choice } from './choice';

export type SingleChoiceProps = {
  choice: ChoiceType;
};

export const SingleChoice = ({ choice }: SingleChoiceProps) => {
  return (
    <Choice>
      <RadioGroupItem value={choice.id} id={choice.id} />
      <Label htmlFor={choice.id} className="block w-full h-full p-3 leading-4">
        {choice.text}
      </Label>
    </Choice>
  );
};

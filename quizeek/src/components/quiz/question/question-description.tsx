import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PropsWithChildren } from 'react';

export type QuestionDescriptionProps = PropsWithChildren & {
  title: string;
};

export const QuestionDescription = ({
  title,
  children,
}: QuestionDescriptionProps) => {
  return (
    <Accordion type="multiple" defaultValue={['question']}>
      <AccordionItem value="question">
        <AccordionTrigger className="font-bold text-xl">
          {title}
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

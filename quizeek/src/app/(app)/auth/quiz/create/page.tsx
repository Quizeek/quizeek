import { QuestionList } from '@/components/quiz/question/question-list';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const Page = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value="general"
        className="border px-4 py-2 rounded-xl mb-4"
      >
        <AccordionTrigger className="hover:no-underline text-xl font-semibold">
          Quiz info
        </AccordionTrigger>
        <AccordionContent>Something</AccordionContent>
      </AccordionItem>
      <AccordionItem value="questions" className="border px-4 py-2 rounded-xl">
        <AccordionTrigger className="hover:no-underline text-xl font-semibold">
          Questions
        </AccordionTrigger>
        <AccordionContent>
          <QuestionList />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Page;

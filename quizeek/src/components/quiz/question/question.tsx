import { Card, CardContent } from '@/components/ui/card';
import { type QuestionWithChoices } from '@/db/schema/question';

import { MultiChoiceList } from './choice/multi-choice-list';
import { SingleChoiceList } from './choice/single-choice-list';
import { QuestionDescription } from './question-description';

type QuestionProps = {
  question: QuestionWithChoices;
};

export const Question = ({ question }: QuestionProps) => {
  return (
    <div className="p-1">
      <Card>
        <CardContent className="p-4 w-full max-h-[70vh]">
          <QuestionDescription title={`#${question.number}`}>
            {question.text}
          </QuestionDescription>
          {question.type === 'multiple_choice' && (
            <MultiChoiceList choices={question.choices} />
          )}
          {question.type === 'single_choice' && (
            <SingleChoiceList choices={question.choices} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

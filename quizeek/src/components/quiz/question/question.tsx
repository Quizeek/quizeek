import { Card, CardContent } from '@/components/ui/card';
import {
  QuestionWithChoices,
  type QuestionWithPublicChoices,
} from '@/db/schema/question';
import {
  type QuizAttempt as QuizAttemptType,
  QuizAttemptWithAnswers,
} from '@/db/schema/quiz-attempt';

import { MultiChoiceList } from './choice/multi-choice-list';
import { SingleChoiceList } from './choice/single-choice-list';
import { QuestionDescription } from './question-description';
type QuestionProps = {
  question: QuestionWithPublicChoices | QuestionWithChoices;
  attempt: QuizAttemptType | QuizAttemptWithAnswers;
};

export const Question = ({ question, attempt }: QuestionProps) => {
  return (
    <div className="p-1 h-full">
      <Card className="h-full">
        <CardContent className="p-4 w-full max-h-[70vh]">
          <QuestionDescription title={`#${question.number}`}>
            {question.text}
          </QuestionDescription>
          {question.type === 'multiple_choice' && (
            <MultiChoiceList
              questionId={question.id}
              choices={question.choices}
              attempt={attempt}
            />
          )}
          {question.type === 'single_choice' && (
            <SingleChoiceList
              questionId={question.id}
              choices={question.choices}
              attempt={attempt}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

import { Card, CardContent } from '@/components/ui/card';
import { type Question as QuestionType } from '@/db/schema/question';

type QuestionProps = {
  question: QuestionType;
};

export const Question = ({ question }: QuestionProps) => (
  <div className="p-1">
    <Card>
      <CardContent className="flex aspect-square sm:aspect-[4/2] items-center justify-center p-6 max-h-[70vh]">
        <span className="text-4xl font-semibold">{question.text}</span>
      </CardContent>
    </Card>
  </div>
);

import { auth } from '@/auth';
import { QuizWithUser } from '@/db/schema/quiz';

import { SignInButton } from '../sign-in-button';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import QuizAuthorBadge from './quiz-author-badge';
import { QuizImage } from './quiz-image';
import QuizTimeBadge from './quiz-time-badge';

type QuizDetailProps = {
  quiz: QuizWithUser;
};

export const QuizDetail = async ({ quiz }: QuizDetailProps) => {
  const session = await auth();
  const user = session?.user;
  const isOwner = user && quiz.createdBy === user.id;
  const isNotOwner = user && quiz.createdBy !== user.id;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex md:flex-row gap-4 flex-col">
        <QuizImage
          quiz={quiz}
          width={500}
          height={500}
          className="rounded-lg w-60 h-60"
        />

        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-xl font-bold text-foreground">{quiz.title}</h2>
          <p className="text-foreground">{quiz.description}</p>
          <div className="mt-auto flex">
            <div className="self-end flex flex-col gap-2">
              <QuizAuthorBadge quiz={quiz} />
              <QuizTimeBadge quiz={quiz} />
            </div>

            {!user && <SignInButton className="self-end ml-auto" />}

            {!quiz.isActive && isOwner && (
              <div className="self-end ml-auto flex flex-col md:flex-row gap-2">
                <Button>Edit</Button>
                <Button>Activate</Button>
              </div>
            )}

            {quiz.isActive && isNotOwner && (
              <Button className="self-end ml-auto">Take quiz</Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {!(!quiz.isActive && isOwner) && (
          <>
            {!(quiz.isActive && isOwner) && (
              <Card className="p-4 h-80 text-center w-full border-foreground">
                <h3>My attempts</h3>
              </Card>
            )}
            <Card className="p-4 h-80 text-center w-full border-foreground">
              <h3>Others&apos; attempts</h3>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};
